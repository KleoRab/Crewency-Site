# 🤖 AI Agent Setup Guide

## 🚀 **MAKE YOUR AI AGENT WORK WITH REAL CONVERSATIONS!**

This guide shows you exactly how to integrate real AI into your Crewency AI Agent for back-and-forth conversations.

## 📋 **STEP 1: Choose Your AI Provider**

### **Option A: OpenAI GPT-4 (Recommended)**
- **Best for**: Most natural conversations, creative content
- **Cost**: ~$0.03 per 1K tokens
- **Setup**: Get API key from https://platform.openai.com

### **Option B: Anthropic Claude**
- **Best for**: Professional, business-focused content
- **Cost**: ~$0.015 per 1K tokens
- **Setup**: Get API key from https://console.anthropic.com

### **Option C: Google Gemini**
- **Best for**: Cost-effective option
- **Cost**: Free tier available
- **Setup**: Get API key from https://makersuite.google.com

## 🔧 **STEP 2: Environment Setup**

1. **Copy the environment file:**
   ```bash
   cp env.example .env.local
   ```

2. **Add your AI API key to `.env.local`:**
   ```env
   # For OpenAI (recommended)
   OPENAI_API_KEY=sk-your-openai-api-key-here
   
   # OR for Anthropic
   ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
   
   # OR for Google Gemini
   GOOGLE_AI_API_KEY=your-google-ai-key-here
   ```

## 🧠 **STEP 3: How It Works**

### **Real AI Conversation Flow:**
```
User: "I want to create a post about our new product"
AI: "Great! What's the product name and what problem does it solve?"
User: "Crewency AI - it automates social media management"
AI: "Perfect! Who is your target audience for this post?"
User: "Small business owners who struggle with social media"
AI: "Excellent! What's the main benefit they'll get?"
User: "Saves 10+ hours per week on social media tasks"
AI: "Perfect! Here's your custom post:

🚀 Introducing Crewency AI - the social media game-changer!

Tired of spending 10+ hours weekly on social media? Our AI assistant:
✅ Creates engaging content in minutes
✅ Schedules posts across all platforms  
✅ Analyzes performance automatically

Perfect for busy small business owners who want results without the hassle.

Ready to reclaim your time? Start your free trial today!

#SmallBusiness #AI #SocialMedia #Productivity #TimeSaving"
```

## 🔌 **STEP 4: API Integration Details**

### **OpenAI Integration (Already Implemented):**
```typescript
// The AI service is already set up in src/lib/ai/openai.ts
const aiService = new OpenAIService(process.env.OPENAI_API_KEY);

// Real conversation
const response = await aiService.generateResponse(
  userMessage,
  conversationContext,
  currentStep
);
```

### **Key Features:**
- **Context-aware**: Remembers entire conversation
- **Industry-specific**: Adapts to your business type
- **Brand voice**: Matches your tone and style
- **Smart suggestions**: Provides relevant next steps
- **Fallback system**: Works even if API is down

## 💰 **STEP 5: Cost Estimation**

### **Typical Usage Costs:**
- **Small business**: $5-15/month
- **Agency**: $20-50/month  
- **Enterprise**: $100+/month

### **Token Usage:**
- **1 conversation**: ~500-1000 tokens
- **1 content generation**: ~300-500 tokens
- **Monthly estimate**: 10K-50K tokens

## 🚀 **STEP 6: Deploy to Production**

1. **Add environment variables to Vercel:**
   ```bash
   vercel env add OPENAI_API_KEY
   ```

2. **Or add to Vercel dashboard:**
   - Go to your project settings
   - Add `OPENAI_API_KEY` with your API key
   - Redeploy your project

## 🎯 **STEP 7: Test Your AI Agent**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open the AI Agent:**
   - Go to `/ai-agent` page
   - Click "Start AI Conversation"
   - Try asking: "I want to create a LinkedIn post about our new feature"

3. **Watch the magic happen:**
   - AI asks follow-up questions
   - Learns about your business
   - Generates custom content
   - Provides smart suggestions

## 🔧 **STEP 8: Customization Options**

### **Modify AI Personality:**
Edit `src/lib/ai/openai.ts`:
```typescript
const systemPrompt = `You are a ${brandVoice} social media expert...`;
```

### **Add Industry-Specific Logic:**
```typescript
if (context.industry === 'saas') {
  // SaaS-specific questions and responses
} else if (context.industry === 'ecommerce') {
  // E-commerce specific logic
}
```

### **Custom Content Templates:**
```typescript
const templates = {
  'linkedin': 'Professional LinkedIn post template...',
  'instagram': 'Visual Instagram post template...',
  'x': 'Concise X post template...'
};
```

## 🎉 **YOU'RE READY!**

Your AI Agent now has **real back-and-forth conversations** powered by advanced AI! 

The AI will:
- ✅ Ask intelligent follow-up questions
- ✅ Remember your business context
- ✅ Generate custom content for your industry
- ✅ Adapt to your brand voice
- ✅ Provide smart suggestions
- ✅ Learn from each conversation

**This is exactly like Cursor for programming - but for social media management!** 🚀
