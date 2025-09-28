// OpenAI Integration for Real AI Conversations
// This is where the magic happens - real AI back-and-forth conversations!

interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIConversationContext {
  industry: string;
  brandVoice: string;
  contentGoals: string[];
  targetAudience: string;
  businessSize: string;
  previousMessages: AIMessage[];
}

class OpenAIService {
  private apiKey: string;
  private baseURL: string = 'https://api.openai.com/v1';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
  }

  // Main conversation method - this is where the real AI magic happens!
  async generateResponse(
    userMessage: string, 
    context: AIConversationContext,
    conversationStep: number
  ): Promise<{
    response: string;
    suggestions: string[];
    shouldContinue: boolean;
    nextStep?: number;
  }> {
    
    // Build the system prompt based on context
    const systemPrompt = this.buildSystemPrompt(context);
    
    // Build conversation history
    const messages: AIMessage[] = [
      { role: 'system', content: systemPrompt },
      ...context.previousMessages,
      { role: 'user', content: userMessage }
    ];

    try {
      // Call OpenAI API
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Parse AI response and generate suggestions
      const parsedResponse = this.parseAIResponse(aiResponse, conversationStep, context);
      
      return parsedResponse;

    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // Fallback to simulated response if API fails
      return this.getFallbackResponse(userMessage, context, conversationStep);
    }
  }

  private buildSystemPrompt(context: AIConversationContext): string {
    return `You are an expert social media AI assistant for Crewency, a social media management platform.

CONTEXT:
- Industry: ${context.industry}
- Brand Voice: ${context.brandVoice}
- Content Goals: ${context.contentGoals.join(', ')}
- Target Audience: ${context.targetAudience}
- Business Size: ${context.businessSize}

PERSONALITY:
- Be conversational and engaging
- Ask follow-up questions to understand needs better
- Provide specific, actionable advice
- Use emojis appropriately
- Be encouraging and supportive

CONVERSATION FLOW:
1. First, understand their business and goals
2. Ask about specific content they want to create
3. Gather details about target audience and messaging
4. Provide tailored content suggestions
5. Offer optimization and scheduling advice

RESPONSE FORMAT:
- Keep responses concise but helpful
- Always end with 2-3 specific suggestions
- Use a friendly, professional tone
- Ask one focused question at a time

Remember: You're helping them create amazing social media content that drives real business results!`;
  }

  private parseAIResponse(response: string, step: number, context: AIConversationContext): {
    response: string;
    suggestions: string[];
    shouldContinue: boolean;
    nextStep?: number;
  } {
    // Extract suggestions from AI response (look for bullet points or numbered lists)
    const suggestions = this.extractSuggestions(response);
    
    // Determine if conversation should continue
    const shouldContinue = this.shouldContinueConversation(response, step);
    
    // Determine next step
    const nextStep = this.determineNextStep(response, step, context);

    return {
      response: response.trim(),
      suggestions: suggestions.length > 0 ? suggestions : this.getDefaultSuggestions(step),
      shouldContinue,
      nextStep
    };
  }

  private extractSuggestions(response: string): string[] {
    // Look for bullet points, numbered lists, or suggestions in the response
    const bulletMatches = response.match(/[•\-\*]\s*([^\n]+)/g);
    const numberMatches = response.match(/\d+\.\s*([^\n]+)/g);
    
    let suggestions: string[] = [];
    
    if (bulletMatches) {
      suggestions = bulletMatches.map(match => match.replace(/[•\-\*]\s*/, '').trim());
    } else if (numberMatches) {
      suggestions = numberMatches.map(match => match.replace(/\d+\.\s*/, '').trim());
    }
    
    return suggestions.slice(0, 3); // Limit to 3 suggestions
  }

  private shouldContinueConversation(response: string, step: number): boolean {
    // Check if AI is asking a question or needs more information
    const questionIndicators = ['?', 'what', 'how', 'when', 'where', 'who', 'which', 'tell me'];
    const hasQuestion = questionIndicators.some(indicator => 
      response.toLowerCase().includes(indicator)
    );
    
    return hasQuestion || step < 5; // Continue for first 5 steps or if asking questions
  }

  private determineNextStep(response: string, currentStep: number, context: AIConversationContext): number {
    // Determine what the next conversation step should be
    if (currentStep === 0) return 1; // Industry → Audience
    if (currentStep === 1) return 2; // Audience → Goals
    if (currentStep === 2) return 3; // Goals → Content Type
    if (currentStep === 3) return 4; // Content Type → Details
    if (currentStep === 4) return 5; // Details → Generate Content
    return 5; // Content generation
  }

  private getDefaultSuggestions(step: number): string[] {
    const suggestionsByStep = {
      0: ['SaaS/Tech', 'E-commerce', 'Healthcare', 'Consulting', 'Education'],
      1: ['Small business owners', 'Marketing professionals', 'Tech enthusiasts', 'General audience'],
      2: ['Increase brand awareness', 'Generate leads', 'Drive website traffic', 'Build community'],
      3: ['Social Media Post', 'Instagram Story', 'Video Script', 'LinkedIn Article'],
      4: ['Product launch', 'Company update', 'Industry insight', 'Behind the scenes'],
      5: ['Regenerate', 'Edit', 'Use this content', 'Create another']
    };
    
    return suggestionsByStep[step as keyof typeof suggestionsByStep] || [];
  }

  private getFallbackResponse(userMessage: string, context: AIConversationContext, step: number): {
    response: string;
    suggestions: string[];
    shouldContinue: boolean;
    nextStep?: number;
  } {
    // Fallback responses when API is not available
    const fallbackResponses = {
      0: "Great! I'd love to help you create amazing social media content. What industry are you in?",
      1: "Perfect! Who is your target audience for this content?",
      2: "Excellent! What are your main content goals?",
      3: "Awesome! What type of content would you like to create today?",
      4: "Perfect! Let me create some amazing content for you...",
      5: "Here's your custom content! Would you like me to make any adjustments?"
    };

    return {
      response: fallbackResponses[step as keyof typeof fallbackResponses] || "I'm here to help! What would you like to create?",
      suggestions: this.getDefaultSuggestions(step),
      shouldContinue: step < 5,
      nextStep: step + 1
    };
  }

  // Generate content based on conversation context
  async generateContent(context: AIConversationContext, contentType: string): Promise<string> {
    const prompt = `Create a ${contentType} for a ${context.industry} business with ${context.brandVoice} brand voice.

Target Audience: ${context.targetAudience}
Goals: ${context.contentGoals.join(', ')}

Make it engaging, professional, and optimized for social media. Include relevant hashtags and a clear call-to-action.`;

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a professional social media content creator. Create engaging, platform-optimized content.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.8,
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      console.error('Content generation error:', error);
      return this.getFallbackContent(context, contentType);
    }
  }

  private getFallbackContent(context: AIConversationContext, contentType: string): string {
    // Fallback content when API is not available
    const templates = {
      'post': `🚀 Exciting news from our ${context.industry} business! 

We're thrilled to share something amazing that will help ${context.targetAudience} achieve their goals.

✨ Key benefits:
• Professional results
• Time-saving solutions  
• Proven success

Ready to get started? Let's connect!

#${context.industry} #${context.brandVoice} #BusinessGrowth`,

      'story': `Slide 1: 🎯 Ready for something amazing?
Slide 2: We've got exciting news for ${context.targetAudience}!
Slide 3: Introducing our latest ${context.industry} solution
Slide 4: ✨ Professional results guaranteed
Slide 5: ⏰ Save time and boost productivity
Slide 6: 🚀 Join thousands of satisfied customers
Slide 7: Ready to transform your business?
Slide 8: Swipe up to learn more! 👆`,

      'video': `[VIDEO SCRIPT]

[0-3s] Hook: "What if I told you there's a better way to handle ${context.industry} challenges?"

[3-8s] Problem: "Most ${context.targetAudience} struggle with outdated methods and inefficient processes."

[8-15s] Solution: "Meet our revolutionary ${context.industry} solution that changes everything."

[15-25s] Benefits: "Save time, increase efficiency, and achieve better results than ever before."

[25-30s] CTA: "Ready to transform your approach? Link in bio for more info!"

[30s] End screen: "Follow for more ${context.industry} insights!"`
    };

    return templates[contentType as keyof typeof templates] || templates['post'];
  }
}

export default OpenAIService;
