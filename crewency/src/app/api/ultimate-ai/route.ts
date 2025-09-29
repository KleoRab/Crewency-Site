import { NextRequest, NextResponse } from 'next/server';
import UltimateAISystem from '../../../lib/ai/UltimateAISystem';

// Initialize the Ultimate AI System with all features enabled
const ultimateAI = new UltimateAISystem({
  enableAnalytics: true,
  enableLearning: true,
  enableTemplates: true,
  enableAutomation: true,
  enableCollaboration: true,
  enableBrandPersonality: true,
  enableCompetitorAnalysis: true,
  enableContentCalendar: true,
  enableRevolutionaryAI: true
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'generate_content':
        result = await ultimateAI.generateUltimateContent(data.prompt, data.context);
        break;

      case 'generate_strategy':
        result = await ultimateAI.generateContentStrategy(data.requirements);
        break;

      case 'analyze_performance':
        result = await ultimateAI.analyzePerformance(data.contentId);
        break;

      case 'manage_workflow':
        result = await ultimateAI.manageTeamWorkflow(data.workflowData);
        break;

      case 'get_analytics':
        result = await ultimateAI.getComprehensiveAnalytics(data.period);
        break;

      case 'get_status':
        result = await ultimateAI.getSystemStatus();
        break;

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error: any) {
    console.error('Ultimate AI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = await ultimateAI.getSystemStatus();
    return NextResponse.json({ success: true, data: status });
  } catch (error: any) {
    console.error('Ultimate AI Status Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get system status' },
      { status: 500 }
    );
  }
}
