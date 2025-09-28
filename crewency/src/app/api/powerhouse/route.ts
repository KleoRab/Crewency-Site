import { NextRequest, NextResponse } from 'next/server';
import powerhouseIntegration from '../../../lib/ai/PowerhouseIntegration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userInput, industry = 'Technology', platform = 'LinkedIn', mode = 'quick' } = body;

    if (!userInput) {
      return NextResponse.json(
        { error: 'User input is required' },
        { status: 400 }
      );
    }

    let response;
    
    switch (mode) {
      case 'creative':
        response = await powerhouseIntegration.creativeGenerate(userInput, industry, platform);
        break;
      case 'business':
        response = await powerhouseIntegration.businessGenerate(userInput, industry, platform);
        break;
      case 'trend':
        response = await powerhouseIntegration.trendGenerate(userInput, industry, platform);
        break;
      case 'multi':
        response = await powerhouseIntegration.multiPlatformGenerate(userInput, industry, [platform, 'X', 'Instagram']);
        break;
      default:
        response = await powerhouseIntegration.quickGenerate(userInput, industry, platform);
    }

    if (response.success) {
      return NextResponse.json({
        success: true,
        data: response.data,
        systemStatus: response.systemStatus,
        performance: response.performance
      });
    } else {
      return NextResponse.json(
        { error: response.error || 'Generation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Powerhouse API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const analytics = powerhouseIntegration.getSystemAnalytics();
    return NextResponse.json({
      success: true,
      analytics
    });
  } catch (error) {
    console.error('Powerhouse Analytics Error:', error);
    return NextResponse.json(
      { error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}
