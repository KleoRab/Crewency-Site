// 👥 TEAM COLLABORATION SYSTEM
// Multi-user support, approval workflows, and team management capabilities

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'creator' | 'viewer';
  permissions: string[];
  teamId: string;
  preferences: {
    notifications: boolean;
    emailDigest: boolean;
    defaultPlatforms: string[];
    workingHours: { start: string; end: string };
  };
  metadata: {
    created: Date;
    lastActive: Date;
    isActive: boolean;
  };
}

interface Team {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  members: string[];
  settings: {
    approvalRequired: boolean;
    maxMembers: number;
    allowedPlatforms: string[];
    contentGuidelines: string[];
    brandVoice: string;
  };
  metadata: {
    created: Date;
    lastUpdated: Date;
    isActive: boolean;
  };
}

interface ContentApproval {
  id: string;
  contentId: string;
  submittedBy: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  approvers: {
    userId: string;
    status: 'pending' | 'approved' | 'rejected';
    comments: string;
    reviewedAt?: Date;
  }[];
  requiredApprovals: number;
  currentApprovals: number;
  metadata: {
    priority: 'low' | 'medium' | 'high' | 'urgent';
    deadline?: Date;
    tags: string[];
  };
}

interface CollaborationSession {
  id: string;
  name: string;
  participants: string[];
  contentId?: string;
  type: 'brainstorm' | 'review' | 'planning' | 'strategy';
  status: 'active' | 'completed' | 'cancelled';
  notes: string[];
  decisions: {
    decision: string;
    madeBy: string;
    timestamp: Date;
  }[];
  metadata: {
    created: Date;
    lastActivity: Date;
    duration: number; // minutes
  };
}

interface TeamAnalytics {
  teamId: string;
  period: 'day' | 'week' | 'month' | 'year';
  metrics: {
    totalContent: number;
    approvedContent: number;
    rejectedContent: number;
    averageApprovalTime: number; // hours
    mostActiveUser: string;
    contentByPlatform: { [platform: string]: number };
    contentByUser: { [userId: string]: number };
  };
  insights: {
    topPerformers: { userId: string; score: number }[];
    bottlenecks: string[];
    recommendations: string[];
  };
}

class TeamCollaborationSystem {
  private users: Map<string, User>;
  private teams: Map<string, Team>;
  private contentApprovals: Map<string, ContentApproval>;
  private collaborationSessions: Map<string, CollaborationSession>;
  private teamAnalytics: Map<string, TeamAnalytics>;

  constructor() {
    this.users = new Map();
    this.teams = new Map();
    this.contentApprovals = new Map();
    this.collaborationSessions = new Map();
    this.teamAnalytics = new Map();
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default admin user
    const adminUser: User = {
      id: 'admin_1',
      email: 'admin@crewency.com',
      name: 'Admin User',
      role: 'admin',
      permissions: ['all'],
      teamId: 'default_team',
      preferences: {
        notifications: true,
        emailDigest: true,
        defaultPlatforms: ['instagram', 'linkedin', 'twitter'],
        workingHours: { start: '09:00', end: '17:00' }
      },
      metadata: {
        created: new Date(),
        lastActive: new Date(),
        isActive: true
      }
    };

    // Create default team
    const defaultTeam: Team = {
      id: 'default_team',
      name: 'Default Team',
      description: 'Default team for Crewency users',
      ownerId: 'admin_1',
      members: ['admin_1'],
      settings: {
        approvalRequired: false,
        maxMembers: 50,
        allowedPlatforms: ['instagram', 'linkedin', 'twitter', 'facebook', 'youtube', 'tiktok'],
        contentGuidelines: [
          'Maintain professional tone',
          'Include relevant hashtags',
          'Follow brand guidelines',
          'Ensure content is original'
        ],
        brandVoice: 'professional'
      },
      metadata: {
        created: new Date(),
        lastUpdated: new Date(),
        isActive: true
      }
    };

    this.users.set(adminUser.id, adminUser);
    this.teams.set(defaultTeam.id, defaultTeam);
  }

  // User Management
  async createUser(userData: Omit<User, 'id' | 'metadata'>): Promise<User> {
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user: User = {
      ...userData,
      id,
      metadata: {
        created: new Date(),
        lastActive: new Date(),
        isActive: true
      }
    };

    this.users.set(id, user);
    return user;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(userId);
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getUser(userId: string): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  async getUsersByTeam(teamId: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.teamId === teamId);
  }

  // Team Management
  async createTeam(teamData: Omit<Team, 'id' | 'metadata'>): Promise<Team> {
    const id = `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const team: Team = {
      ...teamData,
      id,
      metadata: {
        created: new Date(),
        lastUpdated: new Date(),
        isActive: true
      }
    };

    this.teams.set(id, team);
    return team;
  }

  async updateTeam(teamId: string, updates: Partial<Team>): Promise<Team | null> {
    const team = this.teams.get(teamId);
    if (!team) return null;

    const updatedTeam = { ...team, ...updates, metadata: { ...team.metadata, lastUpdated: new Date() } };
    this.teams.set(teamId, updatedTeam);
    return updatedTeam;
  }

  async addTeamMember(teamId: string, userId: string): Promise<boolean> {
    const team = this.teams.get(teamId);
    const user = this.users.get(userId);
    
    if (!team || !user) return false;
    
    if (team.members.length >= team.settings.maxMembers) {
      throw new Error('Team member limit reached');
    }
    
    if (!team.members.includes(userId)) {
      team.members.push(userId);
      user.teamId = teamId;
      this.teams.set(teamId, team);
      this.users.set(userId, user);
    }
    
    return true;
  }

  async removeTeamMember(teamId: string, userId: string): Promise<boolean> {
    const team = this.teams.get(teamId);
    const user = this.users.get(userId);
    
    if (!team || !user) return false;
    
    team.members = team.members.filter(id => id !== userId);
    user.teamId = 'default_team'; // Move to default team
    
    this.teams.set(teamId, team);
    this.users.set(userId, user);
    
    return true;
  }

  // Content Approval System
  async submitForApproval(contentId: string, submittedBy: string, approvers: string[], priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'): Promise<ContentApproval> {
    const id = `approval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const approval: ContentApproval = {
      id,
      contentId,
      submittedBy,
      submittedAt: new Date(),
      status: 'pending',
      approvers: approvers.map(userId => ({
        userId,
        status: 'pending' as const,
        comments: ''
      })),
      requiredApprovals: approvers.length,
      currentApprovals: 0,
      metadata: {
        priority,
        tags: []
      }
    };

    this.contentApprovals.set(id, approval);
    return approval;
  }

  async reviewContent(approvalId: string, reviewerId: string, decision: 'approved' | 'rejected', comments: string = ''): Promise<boolean> {
    const approval = this.contentApprovals.get(approvalId);
    if (!approval) return false;

    const approver = approval.approvers.find(a => a.userId === reviewerId);
    if (!approver) return false;

    approver.status = decision;
    approver.comments = comments;
    approver.reviewedAt = new Date();

    if (decision === 'approved') {
      approval.currentApprovals++;
    }

    // Check if approval is complete
    if (approval.currentApprovals >= approval.requiredApprovals) {
      approval.status = 'approved';
    } else if (approval.approvers.every(a => a.status === 'rejected')) {
      approval.status = 'rejected';
    }

    this.contentApprovals.set(approvalId, approval);
    return true;
  }

  async getPendingApprovals(userId: string): Promise<ContentApproval[]> {
    return Array.from(this.contentApprovals.values())
      .filter(approval => 
        approval.status === 'pending' && 
        approval.approvers.some(a => a.userId === userId && a.status === 'pending')
      );
  }

  async getApprovalHistory(teamId: string): Promise<ContentApproval[]> {
    const team = this.teams.get(teamId);
    if (!team) return [];

    return Array.from(this.contentApprovals.values())
      .filter(approval => team.members.includes(approval.submittedBy));
  }

  // Collaboration Sessions
  async createCollaborationSession(sessionData: Omit<CollaborationSession, 'id' | 'metadata'>): Promise<CollaborationSession> {
    const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: CollaborationSession = {
      ...sessionData,
      id,
      metadata: {
        created: new Date(),
        lastActivity: new Date(),
        duration: 0
      }
    };

    this.collaborationSessions.set(id, session);
    return session;
  }

  async addSessionNote(sessionId: string, note: string, addedBy: string): Promise<boolean> {
    const session = this.collaborationSessions.get(sessionId);
    if (!session) return false;

    session.notes.push(`${addedBy}: ${note}`);
    session.metadata.lastActivity = new Date();
    this.collaborationSessions.set(sessionId, session);
    return true;
  }

  async addSessionDecision(sessionId: string, decision: string, madeBy: string): Promise<boolean> {
    const session = this.collaborationSessions.get(sessionId);
    if (!session) return false;

    session.decisions.push({
      decision,
      madeBy,
      timestamp: new Date()
    });
    session.metadata.lastActivity = new Date();
    this.collaborationSessions.set(sessionId, session);
    return true;
  }

  async endCollaborationSession(sessionId: string): Promise<boolean> {
    const session = this.collaborationSessions.get(sessionId);
    if (!session) return false;

    session.status = 'completed';
    session.metadata.duration = Math.floor((Date.now() - session.metadata.created.getTime()) / 60000);
    this.collaborationSessions.set(sessionId, session);
    return true;
  }

  async getActiveSessions(teamId: string): Promise<CollaborationSession[]> {
    const team = this.teams.get(teamId);
    if (!team) return [];

    return Array.from(this.collaborationSessions.values())
      .filter(session => 
        session.status === 'active' && 
        session.participants.some(p => team.members.includes(p))
      );
  }

  // Team Analytics
  async generateTeamAnalytics(teamId: string, period: 'day' | 'week' | 'month' | 'year'): Promise<TeamAnalytics> {
    const team = this.teams.get(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const approvals = await this.getApprovalHistory(teamId);
    const sessions = Array.from(this.collaborationSessions.values())
      .filter(session => session.participants.some(p => team.members.includes(p)));

    const analytics: TeamAnalytics = {
      teamId,
      period,
      metrics: {
        totalContent: approvals.length,
        approvedContent: approvals.filter(a => a.status === 'approved').length,
        rejectedContent: approvals.filter(a => a.status === 'rejected').length,
        averageApprovalTime: this.calculateAverageApprovalTime(approvals),
        mostActiveUser: this.getMostActiveUser(approvals),
        contentByPlatform: this.getContentByPlatform(approvals),
        contentByUser: this.getContentByUser(approvals)
      },
      insights: {
        topPerformers: this.getTopPerformers(approvals),
        bottlenecks: this.identifyBottlenecks(approvals),
        recommendations: this.generateRecommendations(approvals, sessions)
      }
    };

    this.teamAnalytics.set(`${teamId}_${period}`, analytics);
    return analytics;
  }

  private calculateAverageApprovalTime(approvals: ContentApproval[]): number {
    const completedApprovals = approvals.filter(a => a.status === 'approved' || a.status === 'rejected');
    if (completedApprovals.length === 0) return 0;

    const totalTime = completedApprovals.reduce((sum, approval) => {
      const lastReview = approval.approvers
        .filter(a => a.reviewedAt)
        .sort((a, b) => b.reviewedAt!.getTime() - a.reviewedAt!.getTime())[0];
      
      if (lastReview) {
        return sum + (lastReview.reviewedAt!.getTime() - approval.submittedAt.getTime());
      }
      return sum;
    }, 0);

    return totalTime / completedApprovals.length / (1000 * 60 * 60); // Convert to hours
  }

  private getMostActiveUser(approvals: ContentApproval[]): string {
    const userCounts = approvals.reduce((acc, approval) => {
      acc[approval.submittedBy] = (acc[approval.submittedBy] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(userCounts).reduce((max, [user, count]) => 
      count > (userCounts[max] || 0) ? user : max, '');
  }

  private getContentByPlatform(approvals: ContentApproval[]): { [platform: string]: number } {
    // This would be based on actual content data
    return {
      'instagram': Math.floor(Math.random() * 50),
      'linkedin': Math.floor(Math.random() * 30),
      'twitter': Math.floor(Math.random() * 40),
      'facebook': Math.floor(Math.random() * 20)
    };
  }

  private getContentByUser(approvals: ContentApproval[]): { [userId: string]: number } {
    return approvals.reduce((acc, approval) => {
      acc[approval.submittedBy] = (acc[approval.submittedBy] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  private getTopPerformers(approvals: ContentApproval[]): { userId: string; score: number }[] {
    const userScores = approvals.reduce((acc, approval) => {
      const userId = approval.submittedBy;
      const score = approval.status === 'approved' ? 1 : 0;
      acc[userId] = (acc[userId] || 0) + score;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(userScores)
      .map(([userId, score]) => ({ userId, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  private identifyBottlenecks(approvals: ContentApproval[]): string[] {
    const bottlenecks = [];
    
    const avgApprovalTime = this.calculateAverageApprovalTime(approvals);
    if (avgApprovalTime > 24) {
      bottlenecks.push('Slow approval process - average time exceeds 24 hours');
    }
    
    const pendingCount = approvals.filter(a => a.status === 'pending').length;
    const totalCount = approvals.length;
    if (pendingCount / totalCount > 0.3) {
      bottlenecks.push('High number of pending approvals - 30% or more content waiting');
    }
    
    return bottlenecks;
  }

  private generateRecommendations(approvals: ContentApproval[], sessions: CollaborationSession[]): string[] {
    const recommendations = [];
    
    const avgApprovalTime = this.calculateAverageApprovalTime(approvals);
    if (avgApprovalTime > 48) {
      recommendations.push('Consider reducing approval requirements for faster content publishing');
    }
    
    const activeSessions = sessions.filter(s => s.status === 'active').length;
    if (activeSessions < 2) {
      recommendations.push('Encourage more collaborative sessions to improve team communication');
    }
    
    const approvalRate = approvals.filter(a => a.status === 'approved').length / approvals.length;
    if (approvalRate < 0.7) {
      recommendations.push('Review content guidelines to reduce rejection rate');
    }
    
    return recommendations;
  }

  // Permission Management
  async checkPermission(userId: string, permission: string): Promise<boolean> {
    const user = this.users.get(userId);
    if (!user) return false;

    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  }

  async updateUserPermissions(userId: string, permissions: string[]): Promise<boolean> {
    const user = this.users.get(userId);
    if (!user) return false;

    user.permissions = permissions;
    this.users.set(userId, user);
    return true;
  }

  // Notification System
  async sendNotification(userId: string, type: string, message: string, data?: any): Promise<void> {
    const user = this.users.get(userId);
    if (!user || !user.preferences.notifications) return;

    console.log(`📧 Notification to ${user.name}: ${message}`);
    // This would integrate with actual notification system
  }

  async sendTeamNotification(teamId: string, type: string, message: string, data?: any): Promise<void> {
    const team = this.teams.get(teamId);
    if (!team) return;

    for (const memberId of team.members) {
      await this.sendNotification(memberId, type, message, data);
    }
  }

  getStatus() {
    return {
      status: 'operational',
      users: this.users.size,
      teams: this.teams.size,
      pendingApprovals: Array.from(this.contentApprovals.values()).filter(a => a.status === 'pending').length,
      activeSessions: Array.from(this.collaborationSessions.values()).filter(s => s.status === 'active').length,
      capabilities: [
        'Multi-user management',
        'Team organization',
        'Content approval workflows',
        'Collaboration sessions',
        'Permission management',
        'Team analytics',
        'Notification system',
        'Role-based access control'
      ]
    };
  }
}

export default TeamCollaborationSystem;
