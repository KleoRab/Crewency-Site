'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CpuChipIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  LightBulbIcon,
  SparklesIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';

interface FloatingAIAssistantProps {
  onOpenFullAgent: () => void;
}

export default function FloatingAIAssistant({ onOpenFullAgent }: FloatingAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    'Create a post about our new feature',
    'Generate content ideas for this week',
    'Write a LinkedIn article',
    'Create Instagram story ideas',
    'Analyze our competitor content',
    'Suggest trending hashtags',
  ];

  const handleQuickAction = (action: string) => {
    setQuickMessage(action);
    setIsTyping(true);
    
    // Simulate quick AI response
    setTimeout(() => {
      setIsTyping(false);
      // In a real app, this would show a quick response
      // For now, we'll just open the full agent
      onOpenFullAgent();
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!quickMessage.trim()) return;
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      onOpenFullAgent();
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
      >
        <CpuChipIcon className="h-7 w-7 text-white" />
      </motion.button>

      {/* Quick Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <CpuChipIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                  <p className="text-xs text-gray-500">Quick help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!quickMessage.trim() || isTyping}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isTyping ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <PaperAirplaneIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Open Full Agent Button */}
              <button
                onClick={onOpenFullAgent}
                className="w-full mt-3 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                Open Full AI Agent
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
