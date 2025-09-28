'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SparklesIcon,
  PaperAirplaneIcon,
  UserIcon,
  CpuChipIcon,
  PhotoIcon,
  VideoCameraIcon,
  SwipeIcon,
  DocumentTextIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  contentType?: 'text' | 'image' | 'video' | 'swipe';
}

interface AIAgentProps {
  onContentGenerated: (content: string, type: string) => void;
  onClose: () => void;
}

const contentTypes = [
  { id: 'post', name: 'Social Media Post', icon: DocumentTextIcon, description: 'LinkedIn, X, Facebook' },
  { id: 'story', name: 'Swipeable Story', icon: SwipeIcon, description: 'Instagram Stories, TikTok' },
  { id: 'video', name: 'Video Script', icon: VideoCameraIcon, description: 'YouTube, Instagram Reels' },
  { id: 'carousel', name: 'Carousel Post', icon: PhotoIcon, description: 'LinkedIn, Instagram' },
  { id: 'thread', name: 'X Thread', icon: DocumentTextIcon, description: 'Multi-post thread' },
];

const aiPersonalities = {
  professional: {
    name: 'Professional Marketer',
    avatar: '👔',
    style: 'Formal, data-driven, focuses on ROI and business benefits'
  },
  creative: {
    name: 'Creative Director',
    avatar: '🎨',
    style: 'Artistic, trend-focused, emphasizes visual appeal and engagement'
  },
  casual: {
    name: 'Social Media Expert',
    avatar: '😊',
    style: 'Friendly, conversational, focuses on authenticity and community'
  }
};

export default function AIAgent({ onContentGenerated, onClose }: AIAgentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const [selectedPersonality, setSelectedPersonality] = useState('professional');
  const [conversationStep, setConversationStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize conversation
    if (messages.length === 0) {
      addAIMessage("Hello! I'm your AI Content Agent. I'll help you create amazing social media content through a quick conversation. What type of content would you like to create?");
    }
  }, []);

  const addMessage = (content: string, type: 'user' | 'ai', suggestions?: string[], contentType?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      suggestions,
      contentType: contentType as any,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addAIMessage = (content: string, suggestions?: string[], contentType?: string) => {
    addMessage(content, 'ai', suggestions, contentType);
  };

  const simulateAITyping = async (response: string, suggestions?: string[], contentType?: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    addAIMessage(response, suggestions, contentType);
    setIsTyping(false);
  };

  const handleContentTypeSelect = (type: string) => {
    setSelectedContentType(type);
    const typeInfo = contentTypes.find(t => t.id === type);
    addMessage(`I want to create a ${typeInfo?.name}`, 'user');
    
    setTimeout(() => {
      simulateAITyping(
        `Excellent choice! ${typeInfo?.name} for ${typeInfo?.description}. Let's make it amazing! 

What's the main topic or message you want to share?`,
        ['Product launch', 'Company update', 'Industry insight', 'Behind the scenes', 'Customer success']
      );
    }, 500);
  };

  const handlePersonalitySelect = (personality: string) => {
    setSelectedPersonality(personality);
    const personalityInfo = aiPersonalities[personality as keyof typeof aiPersonalities];
    addMessage(`I want ${personalityInfo.name} style`, 'user');
    
    setTimeout(() => {
      simulateAITyping(
        `Perfect! I'll create content in a ${personalityInfo.style.toLowerCase()} style. 

Now, what's the main topic or message you want to share?`,
        ['Product launch', 'Company update', 'Industry insight', 'Behind the scenes', 'Customer success']
      );
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, 'user');
    const userMessage = inputMessage.toLowerCase();
    setInputMessage('');

    // AI Response Logic
    let aiResponse = '';
    let suggestions: string[] = [];
    let contentType = selectedContentType;

    if (conversationStep === 0) {
      // Topic selection
      aiResponse = `Great topic! "${inputMessage}" sounds engaging. 

Who is your target audience for this content?`;
      suggestions = ['Small business owners', 'Marketing professionals', 'Tech enthusiasts', 'General audience', 'Industry experts'];
      setConversationStep(1);
    } else if (conversationStep === 1) {
      // Audience selection
      aiResponse = `Perfect! Targeting "${inputMessage}" is a smart choice.

What's the main benefit or value proposition you want to highlight?`;
      suggestions = ['Saves time', 'Increases engagement', 'Boosts sales', 'Builds brand awareness', 'Improves efficiency'];
      setConversationStep(2);
    } else if (conversationStep === 2) {
      // Value proposition
      aiResponse = `Excellent! "${inputMessage}" is a compelling benefit.

What's your call-to-action? What do you want people to do after seeing this content?`;
      suggestions = ['Sign up for free trial', 'Visit our website', 'Download our app', 'Follow us', 'Share this post'];
      setConversationStep(3);
    } else if (conversationStep === 3) {
      // Call-to-action
      aiResponse = `Perfect! Now I have everything I need to create amazing content for you.

Let me generate some options...`;
      setConversationStep(4);
      
      // Generate content
      setTimeout(() => {
        generateContent();
      }, 2000);
    }

    if (aiResponse) {
      await simulateAITyping(aiResponse, suggestions, contentType);
    }
  };

  const generateContent = async () => {
    setIsTyping(true);
    
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const contentType = selectedContentType;
    const personality = selectedPersonality;
    
    let generatedContent = '';
    
    if (contentType === 'post') {
      generatedContent = `🚀 Exciting news! We just launched our revolutionary AI-powered social media management platform that will transform how you engage with your audience.

✨ Key benefits:
• Automate your content creation
• Schedule posts across all platforms
• Get detailed analytics insights
• Save 10+ hours per week

Perfect for small business owners who want to grow their social presence without the hassle.

Ready to transform your social media strategy? Sign up for our free trial today! 👇

#SocialMedia #AI #Marketing #SmallBusiness #Automation`;
    } else if (contentType === 'story') {
      generatedContent = `Slide 1: 🎯 Tired of spending hours on social media?
Slide 2: What if I told you there's a better way?
Slide 3: Meet Crewency AI - your new social media assistant
Slide 4: ✨ Automate content creation
Slide 5: 📊 Get detailed analytics
Slide 6: ⏰ Schedule posts in advance
Slide 7: 🚀 Save 10+ hours per week
Slide 8: Ready to transform your strategy?
Slide 9: Swipe up to start your free trial! 👆`;
    } else if (contentType === 'video') {
      generatedContent = `[VIDEO SCRIPT]

[0-3s] Hook: "What if I told you there's a way to automate your entire social media strategy?"

[3-8s] Problem: "Most small business owners spend 2-3 hours daily on social media, but struggle to see real results."

[8-15s] Solution: "Meet Crewency AI - the platform that creates, schedules, and optimizes your content automatically."

[15-25s] Benefits: "Save time, increase engagement, and grow your audience with AI-powered content that actually converts."

[25-30s] CTA: "Ready to transform your social media? Link in bio for your free trial!"

[30s] End screen: "Follow for more marketing tips!"`;
    }
    
    setGeneratedContent(generatedContent);
    addAIMessage(
      `🎉 Here's your custom ${contentTypes.find(t => t.id === contentType)?.name}!\n\n${generatedContent}`,
      ['Regenerate', 'Edit', 'Use this content', 'Create another'],
      contentType
    );
    
    setIsTyping(false);
  };

  const handleAction = (action: string) => {
    if (action === 'Use this content') {
      onContentGenerated(generatedContent || '', selectedContentType || 'post');
      onClose();
    } else if (action === 'Regenerate') {
      generateContent();
    } else if (action === 'Edit') {
      // Allow user to edit the content
      setInputMessage(generatedContent || '');
    } else if (action === 'Create another') {
      setMessages([]);
      setConversationStep(0);
      setSelectedContentType(null);
      setGeneratedContent(null);
      addAIMessage("Great! Let's create another piece of content. What type would you like to create?");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <CpuChipIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Content Agent</h2>
              <p className="text-sm text-gray-500">Conversational content creation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content Type Selection */}
        {!selectedContentType && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Content Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleContentTypeSelect(type.id)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <type.icon className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900">{type.name}</h4>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Personality Selection */}
        {selectedContentType && !selectedPersonality && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose AI Personality</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(aiPersonalities).map(([key, personality]) => (
                <button
                  key={key}
                  onClick={() => handlePersonalitySelect(key)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
                >
                  <div className="text-2xl mb-2">{personality.avatar}</div>
                  <h4 className="font-medium text-gray-900">{personality.name}</h4>
                  <p className="text-sm text-gray-500">{personality.style}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Interface */}
        {selectedContentType && selectedPersonality && (
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-br from-purple-500 to-blue-600'
                    }`}>
                      {message.type === 'user' ? (
                        <UserIcon className="h-5 w-5 text-white" />
                      ) : (
                        <CpuChipIcon className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <CpuChipIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-lg bg-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Generated Content Actions */}
            {generatedContent && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  {['Regenerate', 'Edit', 'Use this content', 'Create another'].map((action) => (
                    <button
                      key={action}
                      onClick={() => handleAction(action)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        action === 'Use this content'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            {!generatedContent && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your response..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
