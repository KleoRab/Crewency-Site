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
  CommandLineIcon,
  LightBulbIcon,
  ChartBarIcon,
  GlobeAltIcon,
  MicrophoneIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import OpenAIService from '@/lib/ai/openai';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  contentType?: 'text' | 'image' | 'video' | 'swipe' | 'strategy';
  context?: any;
}

interface UserProfile {
  industry: string;
  niche: string;
  targetAudience: string;
  brandVoice: string;
  contentGoals: string[];
  competitors: string[];
  brandPersonality: string;
  contentFrequency: string;
  preferredPlatforms: string[];
  businessSize: string;
}

interface AIAgentProps {
  onContentGenerated: (content: string, type: string, context?: any) => void;
  onClose: () => void;
  userProfile?: Partial<UserProfile>;
}

const industries = [
  { id: 'saas', name: 'SaaS/Tech', icon: '💻', questions: ['What problem does your software solve?', 'Who are your main competitors?', 'What makes you different?'] },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒', questions: ['What products do you sell?', 'What\'s your unique value proposition?', 'Who is your target customer?'] },
  { id: 'consulting', name: 'Consulting', icon: '💼', questions: ['What services do you offer?', 'What industries do you serve?', 'What results do you deliver?'] },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', questions: ['What medical services do you provide?', 'Who is your patient demographic?', 'What makes your care special?'] },
  { id: 'education', name: 'Education', icon: '🎓', questions: ['What do you teach?', 'Who are your students?', 'What learning outcomes do you provide?'] },
  { id: 'realestate', name: 'Real Estate', icon: '🏠', questions: ['What type of properties do you sell?', 'What areas do you serve?', 'What makes you the best choice?'] },
  { id: 'fitness', name: 'Fitness/Wellness', icon: '💪', questions: ['What fitness services do you offer?', 'Who is your target client?', 'What results can people expect?'] },
  { id: 'finance', name: 'Finance', icon: '💰', questions: ['What financial services do you provide?', 'Who is your ideal client?', 'What makes you trustworthy?'] },
  { id: 'other', name: 'Other', icon: '🔧', questions: ['What does your business do?', 'Who do you serve?', 'What makes you unique?'] },
];

const brandVoices = [
  { id: 'professional', name: 'Professional', description: 'Formal, authoritative, data-driven', emoji: '👔' },
  { id: 'friendly', name: 'Friendly', description: 'Warm, approachable, conversational', emoji: '😊' },
  { id: 'edgy', name: 'Edgy', description: 'Bold, provocative, attention-grabbing', emoji: '🔥' },
  { id: 'educational', name: 'Educational', description: 'Informative, helpful, teaching-focused', emoji: '📚' },
  { id: 'humorous', name: 'Humorous', description: 'Funny, witty, entertaining', emoji: '😄' },
  { id: 'inspirational', name: 'Inspirational', description: 'Motivational, uplifting, empowering', emoji: '✨' },
];

const contentGoals = [
  'Increase brand awareness',
  'Generate leads',
  'Drive website traffic',
  'Build community',
  'Showcase expertise',
  'Promote products/services',
  'Engage existing customers',
  'Attract new customers',
  'Build thought leadership',
  'Increase sales',
];

export default function EnhancedAIAgent({ onContentGenerated, onClose, userProfile }: AIAgentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>(userProfile || {});
  const [isMinimized, setIsMinimized] = useState(false);
  const [quickActions, setQuickActions] = useState<string[]>([]);
  const [aiService] = useState(() => new OpenAIService());
  const [conversationContext, setConversationContext] = useState<AIConversationContext>({
    industry: userProfile?.industry || '',
    brandVoice: userProfile?.brandVoice || '',
    contentGoals: userProfile?.contentGoals || [],
    targetAudience: userProfile?.targetAudience || '',
    businessSize: userProfile?.businessSize || '',
    previousMessages: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize conversation based on existing profile
    if (Object.keys(profile).length === 0) {
      addAIMessage("Hello! I'm your AI Social Media Assistant. Let me get to know your business better so I can create the perfect content for you. What industry are you in?");
      setQuickActions(industries.map(i => i.name));
    } else {
      addAIMessage("Welcome back! I remember your business details. What would you like to create today?");
      setQuickActions(['Create a post', 'Plan content strategy', 'Analyze competitors', 'Generate ideas']);
    }
  }, []);

  const addMessage = (content: string, type: 'user' | 'ai' | 'system', suggestions?: string[], contentType?: string, context?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      suggestions,
      contentType: contentType as any,
      context,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addAIMessage = (content: string, suggestions?: string[], contentType?: string, context?: any) => {
    addMessage(content, 'ai', suggestions, contentType, context);
  };

  const simulateAITyping = async (response: string, suggestions?: string[], contentType?: string, context?: any) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    addAIMessage(response, suggestions, contentType, context);
    setIsTyping(false);
  };

  const handleIndustrySelect = (industry: string) => {
    const industryData = industries.find(i => i.name === industry);
    if (industryData) {
      setProfile(prev => ({ ...prev, industry: industryData.id }));
      addMessage(`I'm in ${industry}`, 'user');
      
      setTimeout(() => {
        simulateAITyping(
          `Perfect! ${industryData.icon} ${industry} is a great industry. ${industryData.questions[0]}`,
          industryData.questions.slice(1),
          'strategy'
        );
        setCurrentStep(1);
      }, 500);
    }
  };

  const handleBrandVoiceSelect = (voice: string) => {
    const voiceData = brandVoices.find(v => v.name === voice);
    if (voiceData) {
      setProfile(prev => ({ ...prev, brandVoice: voiceData.id }));
      addMessage(`I want a ${voice} brand voice`, 'user');
      
      setTimeout(() => {
        simulateAITyping(
          `Excellent choice! ${voiceData.emoji} ${voiceData.description} will help you connect with your audience. What are your main content goals?`,
          contentGoals.slice(0, 5),
          'strategy'
        );
        setCurrentStep(2);
      }, 500);
    }
  };

  const handleContentGoalSelect = (goals: string[]) => {
    setProfile(prev => ({ ...prev, contentGoals: goals }));
    addMessage(`My goals are: ${goals.join(', ')}`, 'user');
    
    setTimeout(() => {
      simulateAITyping(
        `Great goals! Now I understand your business better. What type of content would you like to create today?`,
        ['Social Media Post', 'Instagram Story', 'Video Script', 'LinkedIn Article', 'X Thread', 'Content Strategy'],
        'content'
      );
      setCurrentStep(3);
    }, 500);
  };

  const handleContentTypeSelect = (type: string) => {
    addMessage(`I want to create a ${type}`, 'user');
    
    setTimeout(() => {
      const industryQuestions = industries.find(i => i.id === profile.industry)?.questions || [];
      const voiceInfo = brandVoices.find(v => v.id === profile.brandVoice);
      
      simulateAITyping(
        `Perfect! Let's create an amazing ${type} for your ${profile.industry} business. 

Based on your ${voiceInfo?.name} brand voice and goals, I'll ask a few targeted questions to create the perfect content.

What's the main topic or message you want to share?`,
        ['Product launch', 'Company update', 'Industry insight', 'Behind the scenes', 'Customer success', 'Educational content'],
        type.toLowerCase().replace(' ', '-')
      );
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage(userMessage, 'user');
    setInputMessage('');

    // Update conversation context
    const updatedContext = {
      ...conversationContext,
      previousMessages: [
        ...conversationContext.previousMessages,
        { role: 'user' as const, content: userMessage }
      ]
    };
    setConversationContext(updatedContext);

    setIsTyping(true);

    try {
      // Call real AI service
      const aiResponse = await aiService.generateResponse(
        userMessage,
        updatedContext,
        currentStep
      );

      // Add AI response to messages
      addMessage(aiResponse.response, 'ai', aiResponse.suggestions);
      
      // Update conversation context with AI response
      setConversationContext(prev => ({
        ...prev,
        previousMessages: [
          ...prev.previousMessages,
          { role: 'assistant' as const, content: aiResponse.response }
        ]
      }));

      // Update step if provided
      if (aiResponse.nextStep !== undefined) {
        setCurrentStep(aiResponse.nextStep);
      } else if (aiResponse.shouldContinue) {
        setCurrentStep(prev => prev + 1);
      }

      // If this is the content generation step, generate actual content
      if (currentStep >= 5 || !aiResponse.shouldContinue) {
        setTimeout(() => {
          generateContextualContent();
        }, 1000);
      }

    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Fallback to simulated response
      const fallbackResponse = getFallbackResponse(userMessage, currentStep);
      addMessage(fallbackResponse.response, 'ai', fallbackResponse.suggestions);
      setCurrentStep(prev => prev + 1);
    } finally {
      setIsTyping(false);
    }
  };

  const generateContextualContent = async () => {
    setIsTyping(true);
    
    try {
      // Use real AI to generate content
      const contentType = 'post'; // You can make this dynamic based on user selection
      const generatedContent = await aiService.generateContent(conversationContext, contentType);
      
      addAIMessage(
        `🎉 Here's your custom content, perfectly tailored for your ${conversationContext.industry} business!\n\n${generatedContent}`,
        ['Regenerate', 'Edit', 'Use this content', 'Create another', 'Save to templates'],
        contentType
      );
      
    } catch (error) {
      console.error('Content generation error:', error);
      
      // Fallback content
      const fallbackContent = getFallbackContent(conversationContext);
      addAIMessage(
        `🎉 Here's your custom content!\n\n${fallbackContent}`,
        ['Regenerate', 'Edit', 'Use this content', 'Create another', 'Save to templates'],
        'post'
      );
    } finally {
      setIsTyping(false);
    }
  };

  // Helper functions
  const getFallbackResponse = (userMessage: string, step: number) => {
    const fallbackResponses = {
      0: { response: "Great! I'd love to help you create amazing social media content. What industry are you in?", suggestions: industries.map(i => i.name) },
      1: { response: "Perfect! Who is your target audience for this content?", suggestions: ['Small business owners', 'Marketing professionals', 'Tech enthusiasts', 'General audience'] },
      2: { response: "Excellent! What are your main content goals?", suggestions: contentGoals.slice(0, 5) },
      3: { response: "Awesome! What type of content would you like to create today?", suggestions: ['Social Media Post', 'Instagram Story', 'Video Script', 'LinkedIn Article'] },
      4: { response: "Perfect! Let me create some amazing content for you...", suggestions: ['Regenerate', 'Edit', 'Use this content'] },
      5: { response: "Here's your custom content! Would you like me to make any adjustments?", suggestions: ['Regenerate', 'Edit', 'Use this content', 'Create another'] }
    };
    
    return fallbackResponses[step as keyof typeof fallbackResponses] || fallbackResponses[0];
  };

  const getFallbackContent = (context: AIConversationContext): string => {
    return `🚀 Exciting news from our ${context.industry} business! 

We're thrilled to share something amazing that will help ${context.targetAudience} achieve their goals.

✨ Key benefits:
• Professional results
• Time-saving solutions  
• Proven success

Ready to get started? Let's connect!

#${context.industry} #${context.brandVoice} #BusinessGrowth`;
  };

  const handleAction = (action: string) => {
    if (action === 'Use this content') {
      onContentGenerated(messages[messages.length - 1].content, 'post', profile);
      onClose();
    } else if (action === 'Regenerate') {
      generateContextualContent();
    } else if (action === 'Edit') {
      setInputMessage(messages[messages.length - 1].content);
    } else if (action === 'Create another') {
      setCurrentStep(3);
      addAIMessage("Great! What type of content would you like to create next?");
    } else if (action === 'Save to templates') {
      addAIMessage("Content saved to your templates! What would you like to do next?");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white rounded-xl shadow-2xl flex flex-col transition-all duration-300 ${
          isMinimized ? 'w-96 h-16' : 'w-full max-w-6xl h-[85vh]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <CpuChipIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Crewency AI Assistant</h2>
              <p className="text-sm text-gray-500">
                {Object.keys(profile).length > 0 ? 'Context-aware content creation' : 'Getting to know your business'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <CommandLineIcon className="h-5 w-5 text-gray-500" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            {quickActions.length > 0 && (
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(action)}
                      className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                        : message.type === 'system'
                        ? 'bg-green-600'
                        : 'bg-gradient-to-br from-purple-500 to-blue-600'
                    }`}>
                      {message.type === 'user' ? (
                        <UserIcon className="h-5 w-5 text-white" />
                      ) : message.type === 'system' ? (
                        <LightBulbIcon className="h-5 w-5 text-white" />
                      ) : (
                        <CpuChipIcon className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.type === 'system'
                        ? 'bg-green-100 text-green-900 border border-green-200'
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

            {/* Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your response... (Press Enter to send)"
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
          </>
        )}
      </motion.div>
    </div>
  );
}
