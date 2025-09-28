# 🧠 CREWENCY AI RESOURCE SETUP
# Give your AI access to real-world data and intelligence

## 🎯 **WHY RESOURCES MATTER**

Your AI needs real data to be truly intelligent:
- **Trending topics** for viral content
- **News articles** for timely insights
- **Competitor analysis** for strategic advantage
- **Audience data** for targeted content
- **Performance metrics** for optimization

## 🔑 **REQUIRED API KEYS**

### **1. OpenAI API (Primary AI)**
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```
- **Get it:** https://platform.openai.com/api-keys
- **Cost:** ~$0.03 per 1K tokens
- **Purpose:** Main AI intelligence and content generation

### **2. Twitter/X API (Trending Topics)**
```env
TWITTER_API_KEY=your-twitter-bearer-token
```
- **Get it:** https://developer.twitter.com/en/portal/dashboard
- **Cost:** Free tier available
- **Purpose:** Real-time trending topics and hashtags

### **3. News API (Industry News)**
```env
NEWS_API_KEY=your-news-api-key
```
- **Get it:** https://newsapi.org/register
- **Cost:** Free tier: 1000 requests/day
- **Purpose:** Industry news and trending topics

### **4. Reddit API (Community Insights)**
```env
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-client-secret
REDDIT_ACCESS_TOKEN=your-reddit-access-token
```
- **Get it:** https://www.reddit.com/prefs/apps
- **Cost:** Free
- **Purpose:** Community discussions and trending topics

### **5. YouTube API (Video Trends)**
```env
YOUTUBE_API_KEY=your-youtube-api-key
```
- **Get it:** https://console.developers.google.com/
- **Cost:** Free tier: 10,000 requests/day
- **Purpose:** Video trends and popular content

## 🚀 **QUICK SETUP**

### **Step 1: Create .env.local**
```bash
# Copy the example file
cp .env.example .env.local
```

### **Step 2: Add Your API Keys**
```env
# AI Intelligence
OPENAI_API_KEY=sk-your-openai-api-key-here

# Social Media APIs
TWITTER_API_KEY=your-twitter-bearer-token
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-client-secret
REDDIT_ACCESS_TOKEN=your-reddit-access-token
YOUTUBE_API_KEY=your-youtube-api-key

# News & Trends
NEWS_API_KEY=your-news-api-key
GOOGLE_TRENDS_API_KEY=your-google-trends-key
```

### **Step 3: Test the AI**
1. Go to `/ai-agent` page
2. Ask: "What's trending in social media?"
3. Watch the AI use real data!

## 📊 **WHAT EACH API PROVIDES**

### **OpenAI API**
- **Content generation** with real intelligence
- **Creative writing** and brainstorming
- **Sentiment analysis** and emotional intelligence
- **Language understanding** and context

### **Twitter/X API**
- **Trending hashtags** and topics
- **Real-time conversations** and discussions
- **Viral content** analysis
- **Audience sentiment** tracking

### **News API**
- **Industry news** and updates
- **Breaking stories** relevant to your niche
- **Competitor mentions** and coverage
- **Market trends** and insights

### **Reddit API**
- **Community discussions** and opinions
- **Niche insights** and expertise
- **User-generated content** ideas
- **Authentic voice** and tone

### **YouTube API**
- **Video trends** and popular content
- **Creator insights** and strategies
- **Engagement patterns** and best practices
- **Visual content** inspiration

## 🎯 **AI INTELLIGENCE FEATURES**

### **Real-Time Intelligence**
- ✅ **Trending topics** from multiple platforms
- ✅ **News articles** relevant to your industry
- ✅ **Competitor analysis** and benchmarking
- ✅ **Audience insights** and demographics
- ✅ **Performance metrics** and optimization

### **Creative Intelligence**
- ✅ **Viral content** identification
- ✅ **Trend analysis** and prediction
- ✅ **Audience psychology** understanding
- ✅ **Content strategy** optimization
- ✅ **Engagement maximization**

### **Learning Intelligence**
- ✅ **Pattern recognition** from data
- ✅ **Success prediction** based on trends
- ✅ **Content optimization** suggestions
- ✅ **Strategy recommendations** based on data
- ✅ **Performance improvement** insights

## 🔧 **ADVANCED CONFIGURATION**

### **Rate Limiting**
The AI automatically handles rate limits:
- **Twitter:** 300 requests per 15 minutes
- **Reddit:** 100 requests per minute
- **News API:** 1000 requests per day
- **YouTube:** 10,000 requests per day

### **Caching**
Intelligent caching system:
- **Trends:** 5-minute cache
- **News:** 10-minute cache
- **Posts:** 5-minute cache
- **Analytics:** 1-hour cache

### **Fallback System**
If APIs are unavailable:
- **Mock data** for development
- **Cached data** for reliability
- **Graceful degradation** for user experience

## 🚀 **TESTING YOUR SETUP**

### **Test 1: Basic AI Intelligence**
```bash
# Ask the AI: "What's trending in AI and social media?"
# Should return real trending topics and insights
```

### **Test 2: News Integration**
```bash
# Ask the AI: "What's the latest news in marketing?"
# Should return recent news articles and analysis
```

### **Test 3: Trend Analysis**
```bash
# Ask the AI: "What content should I create for my SaaS business?"
# Should return trend-based recommendations
```

## 💡 **PRO TIPS**

### **1. Start with OpenAI**
- Essential for AI intelligence
- Other APIs enhance the experience
- Can work with just OpenAI initially

### **2. Add APIs Gradually**
- Start with News API (free tier)
- Add Twitter for trending topics
- Add Reddit for community insights
- Add YouTube for video trends

### **3. Monitor Usage**
- Check API usage in dashboards
- Set up alerts for rate limits
- Optimize caching for efficiency

### **4. Test Regularly**
- Verify APIs are working
- Check data freshness
- Monitor AI responses

## 🎉 **YOU'RE READY!**

With these resources, your AI will have:
- **Real-time intelligence** from multiple sources
- **Trending topic** awareness
- **News and industry** insights
- **Competitor analysis** capabilities
- **Audience understanding** from data
- **Performance optimization** suggestions

**Your AI is now truly intelligent with access to real-world data!** 🧠✨

## 🔗 **USEFUL LINKS**

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Twitter API Documentation](https://developer.twitter.com/en/docs)
- [News API Documentation](https://newsapi.org/docs)
- [Reddit API Documentation](https://www.reddit.com/dev/api/)
- [YouTube API Documentation](https://developers.google.com/youtube/v3)
