// 📝 CONTENT TEMPLATE LIBRARY
// Extensive library of proven viral templates and industry-specific content frameworks

interface ContentTemplate {
  id: string;
  name: string;
  category: string;
  industry: string;
  platform: string;
  format: string;
  viralScore: number;
  engagementRate: number;
  template: {
    structure: string[];
    variables: { [key: string]: string };
    examples: string[];
    variations: string[];
  };
  metadata: {
    created: Date;
    lastUsed: Date;
    usageCount: number;
    successRate: number;
    tags: string[];
  };
}

interface IndustryTemplate {
  industry: string;
  templates: ContentTemplate[];
  bestPractices: string[];
  commonThemes: string[];
  audienceInsights: {
    demographics: { [key: string]: number };
    interests: { [key: string]: number };
    behavior: { [key: string]: number };
  };
}

class ContentTemplateLibrary {
  private templates: Map<string, ContentTemplate>;
  private industryTemplates: Map<string, IndustryTemplate>;
  private viralTemplates: ContentTemplate[];
  private trendingTemplates: ContentTemplate[];

  constructor() {
    this.templates = new Map();
    this.industryTemplates = new Map();
    this.viralTemplates = [];
    this.trendingTemplates = [];
    
    this.initializeTemplates();
    this.initializeIndustryTemplates();
  }

  private initializeTemplates() {
    // Viral Templates
    const viralTemplates = [
      {
        id: 'viral_question',
        name: 'Viral Question Template',
        category: 'engagement',
        industry: 'general',
        platform: 'instagram',
        format: 'post',
        viralScore: 95,
        engagementRate: 12.5,
        template: {
          structure: ['Hook', 'Question', 'Context', 'Call to Action'],
          variables: {
            hook: 'Did you know that...',
            question: 'What do you think about...',
            context: 'This is important because...',
            cta: 'Comment your thoughts below!'
          },
          examples: [
            'Did you know that 90% of people scroll past content in 3 seconds? What do you think about this attention span challenge? This is important because it affects how we create content. Comment your thoughts below!'
          ],
          variations: [
            'POV: You just discovered...',
            'Unpopular opinion: ...',
            'Hot take: ...'
          ]
        },
        metadata: {
          created: new Date(),
          lastUsed: new Date(),
          usageCount: 0,
          successRate: 0.85,
          tags: ['viral', 'engagement', 'question', 'hook']
        }
      },
      {
        id: 'transformation_story',
        name: 'Transformation Story Template',
        category: 'inspiration',
        industry: 'general',
        platform: 'instagram',
        format: 'post',
        viralScore: 88,
        engagementRate: 10.2,
        template: {
          structure: ['Before', 'Journey', 'After', 'Lesson'],
          variables: {
            before: 'Before I started...',
            journey: 'The journey was...',
            after: 'Now I...',
            lesson: 'The lesson I learned...'
          },
          examples: [
            'Before I started this business, I was working 9-5 and feeling unfulfilled. The journey was challenging with many setbacks. Now I run my own company and help others achieve their dreams. The lesson I learned: never give up on your vision.'
          ],
          variations: [
            'From zero to hero...',
            'The comeback story...',
            'How I went from...'
          ]
        },
        metadata: {
          created: new Date(),
          lastUsed: new Date(),
          usageCount: 0,
          successRate: 0.78,
          tags: ['story', 'transformation', 'inspiration', 'personal']
        }
      }
    ];

    viralTemplates.forEach(template => {
      this.templates.set(template.id, template);
      this.viralTemplates.push(template);
    });

    // Trending Templates
    const trendingTemplates = [
      {
        id: 'trending_challenge',
        name: 'Trending Challenge Template',
        category: 'trending',
        industry: 'general',
        platform: 'tiktok',
        format: 'video',
        viralScore: 92,
        engagementRate: 15.8,
        template: {
          structure: ['Setup', 'Challenge', 'Reaction', 'Invitation'],
          variables: {
            setup: 'I tried...',
            challenge: 'The challenge was...',
            reaction: 'My reaction was...',
            invitation: 'Try it yourself!'
          },
          examples: [
            'I tried the 30-day productivity challenge. The challenge was to wake up at 5 AM every day. My reaction was mixed - some days were amazing, others were tough. Try it yourself! #productivitychallenge'
          ],
          variations: [
            'POV: You tried...',
            'Day 1 of...',
            'I challenged myself to...'
          ]
        },
        metadata: {
          created: new Date(),
          lastUsed: new Date(),
          usageCount: 0,
          successRate: 0.82,
          tags: ['trending', 'challenge', 'video', 'viral']
        }
      }
    ];

    trendingTemplates.forEach(template => {
      this.templates.set(template.id, template);
      this.trendingTemplates.push(template);
    });
  }

  private initializeIndustryTemplates() {
    // Technology Industry
    this.industryTemplates.set('technology', {
      industry: 'technology',
      templates: [
        {
          id: 'tech_innovation',
          name: 'Tech Innovation Template',
          category: 'innovation',
          industry: 'technology',
          platform: 'linkedin',
          format: 'post',
          viralScore: 85,
          engagementRate: 8.5,
          template: {
            structure: ['Problem', 'Solution', 'Impact', 'Future'],
            variables: {
              problem: 'The problem we face...',
              solution: 'Our solution is...',
              impact: 'This will impact...',
              future: 'In the future...'
            },
            examples: [
              'The problem we face is data silos preventing real-time insights. Our solution is an AI-powered data integration platform. This will impact how businesses make decisions. In the future, every company will have real-time intelligence.'
            ],
            variations: [
              'Breaking: New technology...',
              'Revolutionary breakthrough...',
              'Game-changing innovation...'
            ]
          },
          metadata: {
            created: new Date(),
            lastUsed: new Date(),
            usageCount: 0,
            successRate: 0.75,
            tags: ['tech', 'innovation', 'AI', 'breakthrough']
          }
        }
      ],
      bestPractices: [
        'Use technical terminology appropriately',
        'Include data and statistics',
        'Focus on innovation and disruption',
        'Appeal to tech-savvy audience'
      ],
      commonThemes: ['AI', 'Machine Learning', 'Cloud Computing', 'Cybersecurity', 'Digital Transformation'],
      audienceInsights: {
        demographics: { '25-34': 0.4, '35-44': 0.35, '45-54': 0.25 },
        interests: { 'technology': 0.9, 'innovation': 0.8, 'business': 0.7 },
        behavior: { 'professional': 0.8, 'analytical': 0.7, 'early_adopter': 0.6 }
      }
    });

    // Healthcare Industry
    this.industryTemplates.set('healthcare', {
      industry: 'healthcare',
      templates: [
        {
          id: 'health_tip',
          name: 'Health Tip Template',
          category: 'education',
          industry: 'healthcare',
          platform: 'instagram',
          format: 'post',
          viralScore: 80,
          engagementRate: 9.2,
          template: {
            structure: ['Hook', 'Tip', 'Explanation', 'Action'],
            variables: {
              hook: 'Did you know...',
              tip: 'Here\'s a simple tip...',
              explanation: 'This works because...',
              action: 'Try this today!'
            },
            examples: [
              'Did you know that drinking water first thing in the morning boosts your metabolism? Here\'s a simple tip: start your day with a glass of water. This works because it kickstarts your digestive system. Try this today! #healthtip'
            ],
            variations: [
              'Pro tip: ...',
              'Health hack: ...',
              'Doctor\'s advice: ...'
            ]
          },
          metadata: {
            created: new Date(),
            lastUsed: new Date(),
            usageCount: 0,
            successRate: 0.72,
            tags: ['health', 'tip', 'wellness', 'education']
          }
        }
      ],
      bestPractices: [
        'Use evidence-based information',
        'Include disclaimers when appropriate',
        'Focus on prevention and wellness',
        'Use clear, simple language'
      ],
      commonThemes: ['Wellness', 'Prevention', 'Nutrition', 'Exercise', 'Mental Health'],
      audienceInsights: {
        demographics: { '25-44': 0.6, '45-64': 0.3, '65+': 0.1 },
        interests: { 'health': 0.95, 'wellness': 0.85, 'fitness': 0.7 },
        behavior: { 'health_conscious': 0.9, 'information_seeker': 0.8, 'preventive': 0.7 }
      }
    });
  }

  async getTemplate(templateId: string): Promise<ContentTemplate | null> {
    return this.templates.get(templateId) || null;
  }

  async getTemplatesByCategory(category: string): Promise<ContentTemplate[]> {
    return Array.from(this.templates.values())
      .filter(template => template.category === category);
  }

  async getTemplatesByIndustry(industry: string): Promise<ContentTemplate[]> {
    return Array.from(this.templates.values())
      .filter(template => template.industry === industry);
  }

  async getTemplatesByPlatform(platform: string): Promise<ContentTemplate[]> {
    return Array.from(this.templates.values())
      .filter(template => template.platform === platform);
  }

  async getViralTemplates(): Promise<ContentTemplate[]> {
    return this.viralTemplates.sort((a, b) => b.viralScore - a.viralScore);
  }

  async getTrendingTemplates(): Promise<ContentTemplate[]> {
    return this.trendingTemplates.sort((a, b) => b.engagementRate - a.engagementRate);
  }

  async getIndustryTemplates(industry: string): Promise<IndustryTemplate | null> {
    return this.industryTemplates.get(industry) || null;
  }

  async generateContentFromTemplate(templateId: string, variables: { [key: string]: string }): Promise<string> {
    const template = await this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    let content = '';
    const structure = template.template.structure;
    const templateVariables = { ...template.template.variables, ...variables };

    for (const section of structure) {
      const sectionContent = templateVariables[section.toLowerCase()] || templateVariables[section] || '';
      if (sectionContent) {
        content += sectionContent + '\n\n';
      }
    }

    // Update usage count
    template.metadata.usageCount++;
    template.metadata.lastUsed = new Date();

    return content.trim();
  }

  async getRecommendedTemplates(context: {
    industry?: string;
    platform?: string;
    format?: string;
    goal?: string;
    audience?: string[];
  }): Promise<ContentTemplate[]> {
    let templates = Array.from(this.templates.values());

    // Filter by industry
    if (context.industry) {
      templates = templates.filter(t => t.industry === context.industry || t.industry === 'general');
    }

    // Filter by platform
    if (context.platform) {
      templates = templates.filter(t => t.platform === context.platform);
    }

    // Filter by format
    if (context.format) {
      templates = templates.filter(t => t.format === context.format);
    }

    // Sort by viral score and engagement rate
    templates.sort((a, b) => {
      const scoreA = a.viralScore * 0.6 + a.engagementRate * 0.4;
      const scoreB = b.viralScore * 0.6 + b.engagementRate * 0.4;
      return scoreB - scoreA;
    });

    return templates.slice(0, 10); // Return top 10
  }

  async createCustomTemplate(template: Omit<ContentTemplate, 'id' | 'metadata'>): Promise<ContentTemplate> {
    const id = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const customTemplate: ContentTemplate = {
      ...template,
      id,
      metadata: {
        created: new Date(),
        lastUsed: new Date(),
        usageCount: 0,
        successRate: 0.5,
        tags: []
      }
    };

    this.templates.set(id, customTemplate);
    return customTemplate;
  }

  async updateTemplateSuccess(templateId: string, success: boolean): Promise<void> {
    const template = this.templates.get(templateId);
    if (template) {
      const currentSuccessRate = template.metadata.successRate;
      const usageCount = template.metadata.usageCount;
      const newSuccessRate = ((currentSuccessRate * usageCount) + (success ? 1 : 0)) / (usageCount + 1);
      
      template.metadata.successRate = newSuccessRate;
      template.metadata.usageCount++;
      template.metadata.lastUsed = new Date();
    }
  }

  async getTemplateAnalytics(): Promise<any> {
    const allTemplates = Array.from(this.templates.values());
    
    return {
      totalTemplates: allTemplates.length,
      averageViralScore: allTemplates.reduce((sum, t) => sum + t.viralScore, 0) / allTemplates.length,
      averageEngagementRate: allTemplates.reduce((sum, t) => sum + t.engagementRate, 0) / allTemplates.length,
      mostUsedTemplate: allTemplates.reduce((max, t) => t.metadata.usageCount > max.metadata.usageCount ? t : max),
      topPerformingTemplate: allTemplates.reduce((max, t) => t.metadata.successRate > max.metadata.successRate ? t : max),
      categoryBreakdown: this.getCategoryBreakdown(allTemplates),
      industryBreakdown: this.getIndustryBreakdown(allTemplates),
      platformBreakdown: this.getPlatformBreakdown(allTemplates)
    };
  }

  private getCategoryBreakdown(templates: ContentTemplate[]): { [key: string]: number } {
    return templates.reduce((acc, template) => {
      acc[template.category] = (acc[template.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  private getIndustryBreakdown(templates: ContentTemplate[]): { [key: string]: number } {
    return templates.reduce((acc, template) => {
      acc[template.industry] = (acc[template.industry] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  private getPlatformBreakdown(templates: ContentTemplate[]): { [key: string]: number } {
    return templates.reduce((acc, template) => {
      acc[template.platform] = (acc[template.platform] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  getStatus() {
    return {
      status: 'operational',
      totalTemplates: this.templates.size,
      viralTemplates: this.viralTemplates.length,
      trendingTemplates: this.trendingTemplates.length,
      industries: Array.from(this.industryTemplates.keys()),
      capabilities: [
        'Template-based content generation',
        'Industry-specific templates',
        'Viral template library',
        'Trending template tracking',
        'Custom template creation',
        'Template performance analytics',
        'Template recommendations',
        'Success rate tracking'
      ]
    };
  }
}

export default ContentTemplateLibrary;
