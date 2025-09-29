// 🎭 BRAND PERSONALITY ENGINE
// AI that learns and adapts to specific brand voices and personality traits

interface BrandPersonality {
  id: string;
  name: string;
  description: string;
  traits: {
    tone: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'playful' | 'serious';
    voice: 'conversational' | 'formal' | 'technical' | 'inspirational' | 'humorous' | 'educational';
    style: 'minimalist' | 'detailed' | 'visual' | 'text-heavy' | 'interactive' | 'storytelling';
    values: string[];
    characteristics: {
      humor: number; // 0-100
      formality: number; // 0-100
      enthusiasm: number; // 0-100
      expertise: number; // 0-100
      empathy: number; // 0-100
      innovation: number; // 0-100
    };
  };
  language: {
    vocabulary: string[];
    phrases: string[];
    avoidWords: string[];
    preferredLength: 'short' | 'medium' | 'long';
    punctuationStyle: 'minimal' | 'standard' | 'expressive';
  };
  content: {
    topics: string[];
    themes: string[];
    hashtags: string[];
    callToActions: string[];
    questions: string[];
  };
  learning: {
    examples: BrandExample[];
    patterns: BrandPattern[];
    adaptations: BrandAdaptation[];
    lastUpdated: Date;
    confidence: number;
  };
}

interface BrandExample {
  id: string;
  content: string;
  platform: string;
  performance: {
    engagement: number;
    reach: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  };
  traits: {
    tone: string;
    voice: string;
    style: string;
  };
  timestamp: Date;
}

interface BrandPattern {
  pattern: string;
  frequency: number;
  successRate: number;
  contexts: string[];
  examples: string[];
}

interface BrandAdaptation {
  context: string;
  platform: string;
  adaptations: {
    tone: string;
    length: string;
    style: string;
  };
  effectiveness: number;
}

interface BrandAnalysis {
  brandId: string;
  analysis: {
    consistency: number;
    authenticity: number;
    engagement: number;
    growth: number;
  };
  insights: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    recommendations: string[];
  };
  trends: {
    emergingTraits: string[];
    decliningTraits: string[];
    stableTraits: string[];
  };
}

class BrandPersonalityEngine {
  private brandPersonalities: Map<string, BrandPersonality>;
  private brandAnalyses: Map<string, BrandAnalysis>;
  private learningEnabled: boolean;
  private minExamplesForLearning: number;

  constructor() {
    this.brandPersonalities = new Map();
    this.brandAnalyses = new Map();
    this.learningEnabled = true;
    this.minExamplesForLearning = 10;
    
    this.initializeDefaultBrands();
  }

  private initializeDefaultBrands() {
    // Professional Brand
    const professionalBrand: BrandPersonality = {
      id: 'professional_brand',
      name: 'Professional Brand',
      description: 'Corporate, authoritative, and trustworthy brand voice',
      traits: {
        tone: 'professional',
        voice: 'formal',
        style: 'detailed',
        values: ['trust', 'expertise', 'reliability', 'innovation'],
        characteristics: {
          humor: 20,
          formality: 90,
          enthusiasm: 60,
          expertise: 95,
          empathy: 70,
          innovation: 80
        }
      },
      language: {
        vocabulary: ['innovative', 'solutions', 'expertise', 'strategic', 'comprehensive'],
        phrases: ['We are committed to', 'Our expertise in', 'Strategic approach', 'Proven results'],
        avoidWords: ['awesome', 'amazing', 'incredible', 'mind-blowing'],
        preferredLength: 'medium',
        punctuationStyle: 'standard'
      },
      content: {
        topics: ['industry insights', 'thought leadership', 'case studies', 'best practices'],
        themes: ['innovation', 'growth', 'success', 'transformation'],
        hashtags: ['#innovation', '#leadership', '#business', '#strategy'],
        callToActions: ['Learn more', 'Contact us', 'Discover how', 'Get started'],
        questions: ['What challenges are you facing?', 'How can we help?', 'What are your goals?']
      },
      learning: {
        examples: [],
        patterns: [],
        adaptations: [],
        lastUpdated: new Date(),
        confidence: 0.7
      }
    };

    // Creative Brand
    const creativeBrand: BrandPersonality = {
      id: 'creative_brand',
      name: 'Creative Brand',
      description: 'Artistic, inspiring, and innovative brand voice',
      traits: {
        tone: 'playful',
        voice: 'inspirational',
        style: 'visual',
        values: ['creativity', 'innovation', 'authenticity', 'expression'],
        characteristics: {
          humor: 80,
          formality: 30,
          enthusiasm: 95,
          expertise: 70,
          empathy: 85,
          innovation: 95
        }
      },
      language: {
        vocabulary: ['creative', 'inspiring', 'unique', 'bold', 'imaginative'],
        phrases: ['Think outside the box', 'Unleash your creativity', 'Bold ideas', 'Creative solutions'],
        avoidWords: ['traditional', 'conventional', 'standard', 'ordinary'],
        preferredLength: 'short',
        punctuationStyle: 'expressive'
      },
      content: {
        topics: ['creativity', 'design', 'art', 'inspiration', 'innovation'],
        themes: ['imagination', 'expression', 'beauty', 'originality'],
        hashtags: ['#creativity', '#design', '#art', '#inspiration'],
        callToActions: ['Get inspired', 'Create with us', 'Express yourself', 'Be creative'],
        questions: ['What inspires you?', 'How do you express creativity?', 'What bold ideas do you have?']
      },
      learning: {
        examples: [],
        patterns: [],
        adaptations: [],
        lastUpdated: new Date(),
        confidence: 0.7
      }
    };

    this.brandPersonalities.set(professionalBrand.id, professionalBrand);
    this.brandPersonalities.set(creativeBrand.id, creativeBrand);
  }

  async createBrandPersonality(brandData: Omit<BrandPersonality, 'id' | 'learning'>): Promise<BrandPersonality> {
    const id = `brand_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const brand: BrandPersonality = {
      ...brandData,
      id,
      learning: {
        examples: [],
        patterns: [],
        adaptations: [],
        lastUpdated: new Date(),
        confidence: 0.5
      }
    };

    this.brandPersonalities.set(id, brand);
    return brand;
  }

  async updateBrandPersonality(brandId: string, updates: Partial<BrandPersonality>): Promise<BrandPersonality | null> {
    const brand = this.brandPersonalities.get(brandId);
    if (!brand) return null;

    const updatedBrand = { ...brand, ...updates };
    this.brandPersonalities.set(brandId, updatedBrand);
    return updatedBrand;
  }

  async getBrandPersonality(brandId: string): Promise<BrandPersonality | null> {
    return this.brandPersonalities.get(brandId) || null;
  }

  async getAllBrandPersonalities(): Promise<BrandPersonality[]> {
    return Array.from(this.brandPersonalities.values());
  }

  async learnFromContent(brandId: string, content: string, platform: string, performance: any): Promise<void> {
    const brand = this.brandPersonalities.get(brandId);
    if (!brand) return;

    console.log(`🎭 Learning from content for brand: ${brand.name}`);

    // Create brand example
    const example: BrandExample = {
      id: `example_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      platform,
      performance: {
        engagement: performance.engagement || 0,
        reach: performance.reach || 0,
        sentiment: this.analyzeSentiment(content)
      },
      traits: this.extractTraitsFromContent(content),
      timestamp: new Date()
    };

    brand.learning.examples.push(example);
    brand.learning.lastUpdated = new Date();

    // Update patterns
    this.updateBrandPatterns(brand, example);

    // Update adaptations
    this.updateBrandAdaptations(brand, example);

    // Update confidence
    brand.learning.confidence = this.calculateBrandConfidence(brand);

    this.brandPersonalities.set(brandId, brand);
  }

  async generateContentWithBrand(brandId: string, prompt: string, platform: string, context?: any): Promise<string> {
    const brand = this.brandPersonalities.get(brandId);
    if (!brand) {
      throw new Error(`Brand ${brandId} not found`);
    }

    console.log(`🎭 Generating content with brand personality: ${brand.name}`);

    // Analyze the prompt
    const promptAnalysis = this.analyzePrompt(prompt);

    // Apply brand personality
    const brandedContent = this.applyBrandPersonality(brand, prompt, platform, promptAnalysis);

    // Adapt for platform
    const adaptedContent = this.adaptForPlatform(brand, brandedContent, platform);

    return adaptedContent;
  }

  async analyzeBrandConsistency(brandId: string): Promise<BrandAnalysis> {
    const brand = this.brandPersonalities.get(brandId);
    if (!brand) {
      throw new Error(`Brand ${brandId} not found`);
    }

    const analysis: BrandAnalysis = {
      brandId,
      analysis: {
        consistency: this.calculateConsistency(brand),
        authenticity: this.calculateAuthenticity(brand),
        engagement: this.calculateEngagement(brand),
        growth: this.calculateGrowth(brand)
      },
      insights: {
        strengths: this.identifyStrengths(brand),
        weaknesses: this.identifyWeaknesses(brand),
        opportunities: this.identifyOpportunities(brand),
        recommendations: this.generateRecommendations(brand)
      },
      trends: {
        emergingTraits: this.identifyEmergingTraits(brand),
        decliningTraits: this.identifyDecliningTraits(brand),
        stableTraits: this.identifyStableTraits(brand)
      }
    };

    this.brandAnalyses.set(brandId, analysis);
    return analysis;
  }

  async getBrandRecommendations(brandId: string, platform: string, goal: string): Promise<string[]> {
    const brand = this.brandPersonalities.get(brandId);
    if (!brand) return [];

    const recommendations = [];

    // Platform-specific recommendations
    if (platform === 'instagram' && brand.traits.style !== 'visual') {
      recommendations.push('Consider more visual content for Instagram');
    }

    if (platform === 'linkedin' && brand.traits.tone !== 'professional') {
      recommendations.push('Adjust tone to be more professional for LinkedIn');
    }

    // Goal-specific recommendations
    if (goal === 'engagement' && brand.traits.characteristics.enthusiasm < 70) {
      recommendations.push('Increase enthusiasm in content to boost engagement');
    }

    if (goal === 'authority' && brand.traits.characteristics.expertise < 80) {
      recommendations.push('Showcase more expertise to establish authority');
    }

    return recommendations;
  }

  private analyzeSentiment(content: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['great', 'amazing', 'wonderful', 'excellent', 'fantastic', 'love', 'best'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'disappointing'];

    const positiveCount = positiveWords.filter(word => content.toLowerCase().includes(word)).length;
    const negativeCount = negativeWords.filter(word => content.toLowerCase().includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private extractTraitsFromContent(content: string): { tone: string; voice: string; style: string } {
    // Analyze content to extract traits
    const tone = this.detectTone(content);
    const voice = this.detectVoice(content);
    const style = this.detectStyle(content);

    return { tone, voice, style };
  }

  private detectTone(content: string): string {
    if (content.includes('!') && content.includes('?')) return 'playful';
    if (content.includes('!')) return 'enthusiastic';
    if (content.includes('?')) return 'inquisitive';
    if (content.length > 200) return 'detailed';
    if (content.length < 100) return 'concise';
    return 'neutral';
  }

  private detectVoice(content: string): string {
    if (content.includes('we') || content.includes('our')) return 'conversational';
    if (content.includes('you should') || content.includes('must')) return 'authoritative';
    if (content.includes('imagine') || content.includes('dream')) return 'inspirational';
    if (content.includes('data') || content.includes('research')) return 'technical';
    return 'neutral';
  }

  private detectStyle(content: string): string {
    if (content.split('\n').length > 3) return 'structured';
    if (content.includes('•') || content.includes('-')) return 'list';
    if (content.includes('"') || content.includes("'")) return 'storytelling';
    return 'standard';
  }

  private updateBrandPatterns(brand: BrandPersonality, example: BrandExample): void {
    // Identify patterns in the content
    const patterns = this.identifyPatterns(example.content);
    
    for (const pattern of patterns) {
      const existingPattern = brand.learning.patterns.find(p => p.pattern === pattern);
      
      if (existingPattern) {
        existingPattern.frequency++;
        existingPattern.successRate = (existingPattern.successRate + (example.performance.engagement > 50 ? 1 : 0)) / 2;
      } else {
        brand.learning.patterns.push({
          pattern,
          frequency: 1,
          successRate: example.performance.engagement > 50 ? 1 : 0,
          contexts: [example.platform],
          examples: [example.content.substring(0, 100)]
        });
      }
    }
  }

  private identifyPatterns(content: string): string[] {
    const patterns = [];
    
    if (content.includes('?')) patterns.push('question_pattern');
    if (content.includes('!')) patterns.push('exclamation_pattern');
    if (content.includes('#')) patterns.push('hashtag_pattern');
    if (content.includes('@')) patterns.push('mention_pattern');
    if (content.split(' ').length > 20) patterns.push('long_form_pattern');
    if (content.split(' ').length < 10) patterns.push('short_form_pattern');
    
    return patterns;
  }

  private updateBrandAdaptations(brand: BrandPersonality, example: BrandExample): void {
    const adaptation = brand.learning.adaptations.find(a => 
      a.context === example.platform && a.platform === example.platform
    );
    
    if (adaptation) {
      // Update existing adaptation
      adaptation.effectiveness = (adaptation.effectiveness + (example.performance.engagement > 50 ? 1 : 0)) / 2;
    } else {
      // Create new adaptation
      brand.learning.adaptations.push({
        context: example.platform,
        platform: example.platform,
        adaptations: {
          tone: example.traits.tone,
          length: example.content.length > 100 ? 'long' : 'short',
          style: example.traits.style
        },
        effectiveness: example.performance.engagement > 50 ? 1 : 0
      });
    }
  }

  private calculateBrandConfidence(brand: BrandPersonality): number {
    const exampleCount = brand.learning.examples.length;
    const patternCount = brand.learning.patterns.length;
    const adaptationCount = brand.learning.adaptations.length;
    
    if (exampleCount < this.minExamplesForLearning) return 0.5;
    
    const confidence = Math.min(0.95, 
      (exampleCount / 100) * 0.4 + 
      (patternCount / 20) * 0.3 + 
      (adaptationCount / 10) * 0.3
    );
    
    return confidence;
  }

  private analyzePrompt(prompt: string): any {
    return {
      length: prompt.length,
      keywords: prompt.split(' ').length,
      emotions: this.detectEmotions(prompt),
      intent: this.detectIntent(prompt)
    };
  }

  private detectEmotions(prompt: string): string[] {
    const emotions = [];
    
    if (prompt.includes('excited') || prompt.includes('thrilled')) emotions.push('excitement');
    if (prompt.includes('worried') || prompt.includes('concerned')) emotions.push('concern');
    if (prompt.includes('happy') || prompt.includes('joy')) emotions.push('happiness');
    if (prompt.includes('sad') || prompt.includes('disappointed')) emotions.push('sadness');
    
    return emotions;
  }

  private detectIntent(prompt: string): string {
    if (prompt.includes('create') || prompt.includes('generate')) return 'content_creation';
    if (prompt.includes('promote') || prompt.includes('advertise')) return 'promotion';
    if (prompt.includes('educate') || prompt.includes('teach')) return 'education';
    if (prompt.includes('entertain') || prompt.includes('fun')) return 'entertainment';
    return 'general';
  }

  private applyBrandPersonality(brand: BrandPersonality, prompt: string, platform: string, analysis: any): string {
    let content = prompt;
    
    // Apply tone
    content = this.applyTone(content, brand.traits.tone);
    
    // Apply voice
    content = this.applyVoice(content, brand.traits.voice);
    
    // Apply characteristics
    content = this.applyCharacteristics(content, brand.traits.characteristics);
    
    // Add brand vocabulary
    content = this.addBrandVocabulary(content, brand.language.vocabulary);
    
    // Add brand phrases
    content = this.addBrandPhrases(content, brand.language.phrases);
    
    return content;
  }

  private applyTone(content: string, tone: string): string {
    switch (tone) {
      case 'professional':
        return content.replace(/!/g, '.').replace(/\?/g, '.');
      case 'casual':
        return content + ' 😊';
      case 'playful':
        return `🎉 ${content} 🎉`;
      case 'authoritative':
        return `Important: ${content}`;
      default:
        return content;
    }
  }

  private applyVoice(content: string, voice: string): string {
    switch (voice) {
      case 'conversational':
        return `Hey there! ${content}`;
      case 'inspirational':
        return `✨ ${content} ✨`;
      case 'technical':
        return `Technical insight: ${content}`;
      default:
        return content;
    }
  }

  private applyCharacteristics(content: string, characteristics: any): string {
    let result = content;
    
    if (characteristics.humor > 70) {
      result += ' 😄';
    }
    
    if (characteristics.enthusiasm > 80) {
      result = `🚀 ${result} 🚀`;
    }
    
    if (characteristics.expertise > 80) {
      result = `Expert tip: ${result}`;
    }
    
    return result;
  }

  private addBrandVocabulary(content: string, vocabulary: string[]): string {
    // Add relevant brand vocabulary
    for (const word of vocabulary) {
      if (content.toLowerCase().includes(word.toLowerCase())) {
        continue; // Already contains the word
      }
      
      // Add word if it fits the context
      if (this.wordFitsContext(word, content)) {
        content += ` ${word}`;
      }
    }
    
    return content;
  }

  private addBrandPhrases(content: string, phrases: string[]): string {
    // Add relevant brand phrases
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    return `${content}\n\n${randomPhrase}`;
  }

  private wordFitsContext(word: string, content: string): boolean {
    // Simple context matching
    const contextWords = ['business', 'innovation', 'creative', 'professional'];
    return contextWords.some(contextWord => content.toLowerCase().includes(contextWord));
  }

  private adaptForPlatform(brand: BrandPersonality, content: string, platform: string): string {
    const adaptation = brand.learning.adaptations.find(a => a.platform === platform);
    
    if (!adaptation) return content;
    
    let adaptedContent = content;
    
    // Apply platform-specific adaptations
    if (platform === 'twitter' && content.length > 280) {
      adaptedContent = content.substring(0, 277) + '...';
    }
    
    if (platform === 'instagram' && !content.includes('#')) {
      adaptedContent += '\n\n#instagram #viral #fyp';
    }
    
    return adaptedContent;
  }

  private calculateConsistency(brand: BrandPersonality): number {
    const examples = brand.learning.examples;
    if (examples.length < 2) return 0.5;
    
    // Calculate consistency based on trait similarity
    const traitConsistency = this.calculateTraitConsistency(examples);
    const patternConsistency = this.calculatePatternConsistency(brand.learning.patterns);
    
    return (traitConsistency + patternConsistency) / 2;
  }

  private calculateTraitConsistency(examples: BrandExample[]): number {
    // Simplified consistency calculation
    const tones = examples.map(e => e.traits.tone);
    const voices = examples.map(e => e.traits.voice);
    
    const toneConsistency = this.calculateArrayConsistency(tones);
    const voiceConsistency = this.calculateArrayConsistency(voices);
    
    return (toneConsistency + voiceConsistency) / 2;
  }

  private calculateArrayConsistency(array: string[]): number {
    const unique = new Set(array);
    return 1 - (unique.size - 1) / Math.max(array.length - 1, 1);
  }

  private calculatePatternConsistency(patterns: BrandPattern[]): number {
    if (patterns.length === 0) return 0.5;
    
    const avgSuccessRate = patterns.reduce((sum, p) => sum + p.successRate, 0) / patterns.length;
    return avgSuccessRate;
  }

  private calculateAuthenticity(brand: BrandPersonality): number {
    // Calculate authenticity based on brand values alignment
    const valueAlignment = this.calculateValueAlignment(brand);
    const traitAlignment = this.calculateTraitAlignment(brand);
    
    return (valueAlignment + traitAlignment) / 2;
  }

  private calculateValueAlignment(brand: BrandPersonality): number {
    // Simplified value alignment calculation
    return 0.8; // Placeholder
  }

  private calculateTraitAlignment(brand: BrandPersonality): number {
    // Simplified trait alignment calculation
    return 0.7; // Placeholder
  }

  private calculateEngagement(brand: BrandPersonality): number {
    const examples = brand.learning.examples;
    if (examples.length === 0) return 0.5;
    
    const avgEngagement = examples.reduce((sum, e) => sum + e.performance.engagement, 0) / examples.length;
    return Math.min(1, avgEngagement / 100);
  }

  private calculateGrowth(brand: BrandPersonality): number {
    const examples = brand.learning.examples;
    if (examples.length < 5) return 0.5;
    
    // Calculate growth based on recent performance
    const recentExamples = examples.slice(-5);
    const olderExamples = examples.slice(0, -5);
    
    if (olderExamples.length === 0) return 0.5;
    
    const recentAvg = recentExamples.reduce((sum, e) => sum + e.performance.engagement, 0) / recentExamples.length;
    const olderAvg = olderExamples.reduce((sum, e) => sum + e.performance.engagement, 0) / olderExamples.length;
    
    return Math.min(1, recentAvg / Math.max(olderAvg, 1));
  }

  private identifyStrengths(brand: BrandPersonality): string[] {
    const strengths = [];
    
    if (brand.learning.confidence > 0.8) {
      strengths.push('High brand confidence and consistency');
    }
    
    if (brand.traits.characteristics.expertise > 80) {
      strengths.push('Strong expertise and authority');
    }
    
    if (brand.traits.characteristics.enthusiasm > 80) {
      strengths.push('High enthusiasm and energy');
    }
    
    return strengths;
  }

  private identifyWeaknesses(brand: BrandPersonality): string[] {
    const weaknesses = [];
    
    if (brand.learning.confidence < 0.5) {
      weaknesses.push('Low brand confidence - needs more examples');
    }
    
    if (brand.traits.characteristics.empathy < 50) {
      weaknesses.push('Low empathy - consider more emotional connection');
    }
    
    return weaknesses;
  }

  private identifyOpportunities(brand: BrandPersonality): string[] {
    const opportunities = [];
    
    if (brand.learning.adaptations.length < 3) {
      opportunities.push('Expand to more platforms');
    }
    
    if (brand.learning.patterns.length < 5) {
      opportunities.push('Develop more content patterns');
    }
    
    return opportunities;
  }

  private generateRecommendations(brand: BrandPersonality): string[] {
    const recommendations = [];
    
    if (brand.learning.examples.length < this.minExamplesForLearning) {
      recommendations.push('Provide more content examples to improve brand learning');
    }
    
    if (brand.learning.confidence < 0.7) {
      recommendations.push('Focus on consistent brand voice across all content');
    }
    
    return recommendations;
  }

  private identifyEmergingTraits(brand: BrandPersonality): string[] {
    // Analyze recent examples for emerging traits
    const recentExamples = brand.learning.examples.slice(-10);
    const emergingTraits = [];
    
    if (recentExamples.length >= 3) {
      const recentTones = recentExamples.map(e => e.traits.tone);
      const toneCounts = this.countOccurrences(recentTones);
      
      for (const [tone, count] of Object.entries(toneCounts)) {
        if (count >= 3) {
          emergingTraits.push(`Emerging tone: ${tone}`);
        }
      }
    }
    
    return emergingTraits;
  }

  private identifyDecliningTraits(brand: BrandPersonality): string[] {
    // Analyze patterns for declining traits
    return []; // Placeholder
  }

  private identifyStableTraits(brand: BrandPersonality): string[] {
    // Identify traits that remain consistent
    return ['Professional tone', 'Expertise focus']; // Placeholder
  }

  private countOccurrences(array: string[]): { [key: string]: number } {
    return array.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  getStatus() {
    return {
      status: 'operational',
      brands: this.brandPersonalities.size,
      learningEnabled: this.learningEnabled,
      capabilities: [
        'Brand personality learning',
        'Content generation with brand voice',
        'Brand consistency analysis',
        'Platform-specific adaptations',
        'Pattern recognition',
        'Trait analysis',
        'Performance-based learning',
        'Brand recommendations'
      ]
    };
  }
}

export default BrandPersonalityEngine;
