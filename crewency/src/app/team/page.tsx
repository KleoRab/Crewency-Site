'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { User } from '@/types';
import { motion } from 'framer-motion';
import {
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ShieldCheckIcon,
  UserIcon,
  CogIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'john@company.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'owner',
  organizationId: 'org1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  emailVerified: true,
  status: 'active',
};

const teamMembers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@company.com',
    role: 'owner',
    status: 'active',
    lastActive: '2024-01-15T10:30:00Z',
    avatar: null,
    permissions: ['all'],
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@company.com',
    role: 'admin',
    status: 'active',
    lastActive: '2024-01-15T09:15:00Z',
    avatar: null,
    permissions: ['content', 'analytics', 'schedule'],
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike@company.com',
    role: 'editor',
    status: 'active',
    lastActive: '2024-01-15T08:45:00Z',
    avatar: null,
    permissions: ['content', 'schedule'],
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily@company.com',
    role: 'viewer',
    status: 'pending',
    lastActive: null,
    avatar: null,
    permissions: ['analytics'],
  },
  {
    id: '5',
    firstName: 'Alex',
    lastName: 'Wilson',
    email: 'alex@company.com',
    role: 'editor',
    status: 'inactive',
    lastActive: '2024-01-10T16:20:00Z',
    avatar: null,
    permissions: ['content'],
  },
];

const roles = [
  { id: 'owner', name: 'Owner', description: 'Full access to all features and settings', color: 'purple' },
  { id: 'admin', name: 'Admin', description: 'Manage content, analytics, and team members', color: 'blue' },
  { id: 'editor', name: 'Editor', description: 'Create and schedule content', color: 'green' },
  { id: 'viewer', name: 'Viewer', description: 'View analytics and reports only', color: 'gray' },
];

const TeamMemberCard = ({ member, onEdit, onDelete, onView }: {
  member: typeof teamMembers[0];
  onEdit: (member: typeof teamMembers[0]) => void;
  onDelete: (member: typeof teamMembers[0]) => void;
  onView: (member: typeof teamMembers[0]) => void;
}) => {
  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.id === role);
    return roleData?.color || 'gray';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'pending': return 'yellow';
      case 'inactive': return 'red';
      default: return 'gray';
    }
  };

  const formatLastActive = (lastActive: string | null) => {
    if (!lastActive) return 'Never';
    const date = new Date(lastActive);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {member.firstName.charAt(0)}{member.lastName.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {member.firstName} {member.lastName}
            </h3>
            <p className="text-gray-600">{member.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getRoleColor(member.role)}-100 text-${getRoleColor(member.role)}-800`}>
                {roles.find(r => r.id === member.role)?.name}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusColor(member.status)}-100 text-${getStatusColor(member.status)}-800`}>
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Last active: {formatLastActive(member.lastActive)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onView(member)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onEdit(member)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(member)}
            className="p-2 text-red-400 hover:text-red-600 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function TeamPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    router.push('/auth/login');
  };

  const handleEditMember = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const handleDeleteMember = (member: typeof teamMembers[0]) => {
    if (confirm(`Are you sure you want to remove ${member.firstName} ${member.lastName} from the team?`)) {
      console.log('Deleting member:', member);
    }
  };

  const handleViewMember = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const handleInviteMember = () => {
    setShowInviteModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-2">Manage your team members and their permissions.</p>
            </div>
            <button
              onClick={handleInviteMember}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <UserPlusIcon className="h-5 w-5 mr-2" />
              Invite Member
            </button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.role === 'admin' || m.role === 'owner').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
                onView={handleViewMember}
              />
            ))}
          </div>
        </div>

        {/* Roles Overview */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 bg-${role.color}-500 rounded-full mr-2`}></div>
                  <h4 className="font-medium text-gray-900">{role.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{role.description}</p>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">
                    {teamMembers.filter(m => m.role === role.id).length} members
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
