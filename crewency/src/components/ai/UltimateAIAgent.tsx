'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RealAIBrain from '@/lib/ai/RealAIBrain';
import {
  CpuChipIcon,
  PaperAirplaneIcon,
  UserIcon,
  XMarkIcon,
  LightBulbIcon,
  SparklesIcon,
  BrainIcon,
  EyeIcon,
  HeartIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'thinking';
  content: string;
  timestamp: Date;
  contentType?: 'post' | 'video' | 'story' | 'carousel';
  creativeProcess?: string[];
  emotionalResponse?: string;
  nextThoughts?: string[];
}

interface UltimateAIAgentProps {
  onContentGenerated: (content: string, type: string, context?: any) => void;
  onClose: () => void;
  userProfile?: any;
}

export default function UltimateAIAgent({ onContentGenerated, onClose, userProfile }: UltimateAIAgentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [aiBrain] = useState(() => new RealAIBrain());
  const [brainState, setBrainState] = useState(aiBrain.getBrainState());
  const [thoughtStream, setThoughtStream] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with a welcoming message
    if (messages.length === 0) {
      addMessage(
        "Hello! I'm Crewency's AI Brain. I don't just follow scripts - I think, learn, and create like a real social media expert. What would you like to create today?",
        'ai',
        undefined,
        undefined,
        undefined,
        "I'm excited to help you create something amazing! 🧠✨"
      );
    }
  }, []);

  const addMessage = (
    content: string, 
    type: 'user' | 'ai' | 'thinking', 
    contentType?: 'post' | 'video' | 'story' | 'carousel',
    creativeProcess?: string[],
    nextThoughts?: string[],
    emotionalResponse?: string
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      contentType,
      creativeProcess,
      nextThoughts,
      emotionalResponse
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage(userMessage, 'user');
    setInputMessage('');

    // Start thinking process
    setIsThinking(true);
    setIsGenerating(true);

    // Add thinking message
    addMessage("Let me think about this...", 'thinking');

    try {
      // Use the Real AI Brain to think and create
      const context = {
        industry: userProfile?.industry || 'general',
        brandVoice: userProfile?.brandVoice || 'professional',
        targetAudience: userProfile?.targetAudience || 'general audience',
        businessGoals: userProfile?.contentGoals || ['increase engagement'],
        currentTrends: ['AI', 'sustainability', 'personalization', 'authenticity'],
        competitorAnalysis: {},
        userPersonality: {
          creativity: 80,
          professionalism: 70,
          humor: 60,
          empathy: 85,
          trendiness: 90,
          businessFocus: 75
        },
        previousContent: [],
        performanceData: {}
      };

      const aiResponse = await aiBrain.think(userMessage, context);

      // Remove thinking message
      setMessages(prev => prev.filter(msg => msg.type !== 'thinking'));

      // Add AI response
      addMessage(
        aiResponse.response,
        'ai',
        aiResponse.contentType,
        aiResponse.creativeProcess,
        aiResponse.nextThoughts,
        aiResponse.emotionalResponse
      );

      // Add the generated content
      addMessage(
        aiResponse.content,
        'ai',
        aiResponse.contentType,
        aiResponse.creativeProcess,
        aiResponse.nextThoughts,
        aiResponse.emotionalResponse
      );

      // Update brain state
      setBrainState(aiBrain.getBrainState());
      setThoughtStream(aiBrain.getThoughtStream());

    } catch (error) {
      console.error('AI Brain Error:', error);
      
      // Fallback response
      setMessages(prev => prev.filter(msg => msg.type !== 'thinking'));
      addMessage(
        "I apologize, but I'm having trouble processing that right now. Let me try a different approach...",
        'ai'
      );
    } finally {
      setIsThinking(false);
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  const handleAction = (action: string, messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    if (action === 'Use this content') {
      onContentGenerated(message.content, message.contentType || 'post', {
        creativeProcess: message.creativeProcess,
        emotionalResponse: message.emotionalResponse
      });
      onClose();
    } else if (action === 'Regenerate') {
      // Regenerate content
      setInputMessage("Please regenerate this content with a different approach");
      handleSendMessage();
    } else if (action === 'Edit') {
      setInputMessage(message.content);
    } else if (action === 'Create another') {
      setInputMessage("Create another piece of content with a different angle");
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <BrainIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Crewency AI Brain</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${brainState.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span>{brainState.isActive ? 'Thinking...' : 'Ready'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FireIcon className="h-4 w-4" />
                  <span>{brainState.activeNeurons} neurons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <HeartIcon className="h-4 w-4" />
                  <span className="capitalize">{brainState.emotionalState}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : message.type === 'thinking'
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-gradient-to-br from-purple-500 to-blue-600'
                }`}>
                  {message.type === 'user' ? (
                    <UserIcon className="h-6 w-6 text-white" />
                  ) : message.type === 'thinking' ? (
                    <BrainIcon className="h-6 w-6 text-white" />
                  ) : (
                    <CpuChipIcon className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className={`px-6 py-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.type === 'thinking'
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="whitespace-pre-wrap text-lg leading-relaxed">{message.content}</p>
                  
                  {/* Creative Process */}
                  {message.creativeProcess && message.creativeProcess.length > 0 && (
                    <div className="mt-4 p-3 bg-white bg-opacity-20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <LightBulbIcon className="h-4 w-4 mr-2" />
                        Creative Process:
                      </h4>
                      <ul className="text-sm space-y-1">
                        {message.creativeProcess.map((step, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Emotional Response */}
                  {message.emotionalResponse && (
                    <div className="mt-3 text-sm italic text-blue-200">
                      {message.emotionalResponse}
                    </div>
                  )}

                  {/* Next Thoughts */}
                  {message.nextThoughts && message.nextThoughts.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <SparklesIcon className="h-4 w-4 mr-2" />
                        What I'm thinking next:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {message.nextThoughts.slice(0, 3).map((thought, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(thought)}
                            className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-colors"
                          >
                            {thought}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {message.type === 'ai' && message.contentType && (
                    <div className="mt-4 flex space-x-2">
                      {['Use this content', 'Regenerate', 'Edit', 'Create another'].map((action) => (
                        <button
                          key={action}
                          onClick={() => handleAction(action, message.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            action === 'Use this content'
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                          }`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Thinking Indicator */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center animate-pulse">
                  <BrainIcon className="h-6 w-6 text-white" />
                </div>
                <div className="px-6 py-4 rounded-2xl bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="ml-2 text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleSendMessage()}
              placeholder="What would you like to create? I'm here to think and create with you..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              disabled={isGenerating}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <BrainIcon className="h-5 w-5 animate-pulse" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
