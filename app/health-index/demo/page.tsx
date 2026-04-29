'use client';

import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SAMPLE_USERS = [
  {
    id: 'user-1',
    name: 'Alice Chen',
    age: 42,
    baselineHealthIndex: 68,
    currentHealthIndex: 75,
    engagementStreak: 4,
    activitiesLogged: 11,
    trend: 'improving',
    lastActivity: '2 hours ago',
  },
  {
    id: 'user-2',
    name: 'Marcus Johnson',
    age: 55,
    baselineHealthIndex: 52,
    currentHealthIndex: 58,
    engagementStreak: 2,
    activitiesLogged: 6,
    trend: 'improving',
    lastActivity: '5 hours ago',
  },
  {
    id: 'user-3',
    name: 'Sarah Williams',
    age: 38,
    baselineHealthIndex: 71,
    currentHealthIndex: 68,
    engagementStreak: 0,
    activitiesLogged: 2,
    trend: 'declining',
    lastActivity: '3 days ago',
  },
  {
    id: 'user-4',
    name: 'David Kim',
    age: 48,
    baselineHealthIndex: 65,
    currentHealthIndex: 72,
    engagementStreak: 7,
    activitiesLogged: 18,
    trend: 'improving',
    lastActivity: 'Just now',
  },
  {
    id: 'user-5',
    name: 'Elizabeth Turner',
    age: 45,
    baselineHealthIndex: 45,
    currentHealthIndex: 51,
    engagementStreak: 1,
    activitiesLogged: 3,
    trend: 'improving',
    lastActivity: '12 hours ago',
  },
  {
    id: 'user-6',
    name: 'James Patrick',
    age: 60,
    baselineHealthIndex: 58,
    currentHealthIndex: 55,
    engagementStreak: 0,
    activitiesLogged: 1,
    trend: 'declining',
    lastActivity: '1 week ago',
  },
];

function UserCard({ user }: { user: (typeof SAMPLE_USERS)[0] }) {
  const delta = user.currentHealthIndex - user.baselineHealthIndex;
  const getStatusColor = (index: number) => {
    if (index >= 75) return 'bg-green-100 text-green-800';
    if (index >= 50) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.age} years old</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(user.currentHealthIndex)}`}>
          {user.currentHealthIndex}
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Baseline:</span>
          <span className="font-semibold">{user.baselineHealthIndex}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Change:</span>
          <span className={`font-semibold flex items-center gap-1 ${delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {delta > 0 ? <TrendingUp className="w-4 h-4" /> : delta < 0 ? <TrendingDown className="w-4 h-4" /> : null}
            {delta > 0 ? '+' : ''}{delta}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Activities:</span>
          <span className="font-semibold">{user.activitiesLogged}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Streak:</span>
          <span className="font-semibold">{user.engagementStreak} days</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Last Activity:</span>
          <span className="font-semibold text-indigo-600">{user.lastActivity}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3 mt-3">
        <p className="text-xs text-gray-500 text-center">
          {user.trend === 'improving' ? '📈 Trending Upward' : '📉 Needs Engagement'}
        </p>
      </div>
    </div>
  );
}

export default function DemoAdminPage() {
  const statistics = {
    totalUsers: SAMPLE_USERS.length,
    avgBaselineHealthIndex: Math.round(
      SAMPLE_USERS.reduce((sum, u) => sum + u.baselineHealthIndex, 0) / SAMPLE_USERS.length
    ),
    avgCurrentHealthIndex: Math.round(
      SAMPLE_USERS.reduce((sum, u) => sum + u.currentHealthIndex, 0) / SAMPLE_USERS.length
    ),
    improvingUsers: SAMPLE_USERS.filter(u => u.trend === 'improving').length,
    activeTodayUsers: SAMPLE_USERS.filter(u => u.lastActivity.includes('ago')).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/health-index" className="text-indigo-600 hover:text-indigo-700 font-semibold mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Demo Admin View</h1>
          <p className="text-gray-600">
            Sample users demonstrating the Health Index PoC concept at various engagement levels
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-sm text-gray-600 font-semibold mb-2">Total Sample Users</p>
            <p className="text-3xl font-bold text-indigo-600">{statistics.totalUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-sm text-gray-600 font-semibold mb-2">Avg Baseline Health Index</p>
            <p className="text-3xl font-bold text-gray-800">{statistics.avgBaselineHealthIndex}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-sm text-gray-600 font-semibold mb-2">Avg Current Health Index</p>
            <p className="text-3xl font-bold text-indigo-600">{statistics.avgCurrentHealthIndex}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-sm text-gray-600 font-semibold mb-2">Improving Trend</p>
            <p className="text-3xl font-bold text-green-600">{statistics.improvingUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-sm text-gray-600 font-semibold mb-2">Active This Session</p>
            <p className="text-3xl font-bold text-amber-600">{statistics.activeTodayUsers}</p>
          </div>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {SAMPLE_USERS.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights from Sample Data</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-bold text-gray-900 mb-2">Engagement Impact</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Users with higher engagement show improvement in Health Index</li>
                <li>• David Kim: Started at 65, now at 72 with 7-day streak</li>
                <li>• Consistency compounds over time</li>
              </ul>
            </div>

            <div className="border-l-4 border-amber-500 pl-6">
              <h3 className="font-bold text-gray-900 mb-2">Engagement Dropoff Risk</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Users with low activity show Health Index decline</li>
                <li>• Sarah Williams: Baseline 71, now 68 (inactive for 3 days)</li>
                <li>• Early intervention window critical</li>
              </ul>
            </div>

            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="font-bold text-gray-900 mb-2">Baseline Variability</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Baseline Health Index ranges from 45–71 across users</li>
                <li>• Elizabeth Turner may benefit from targeted interventions</li>
                <li>• Personalized pathways possible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded p-6">
          <h3 className="font-bold text-blue-900 mb-2">About This Demo View</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>
              • This view shows <strong>sample, simulated user data</strong> to demonstrate the
              Health Index concept.
            </li>
            <li>
              • In production, this would connect to real user activity from GOFA modules (AI
              Move, Meal Snap, etc.)
            </li>
            <li>
              • Insurers and brokers can use similar dashboards to track population health trends
              and engagement.
            </li>
            <li>
              • Early identification of users with low engagement or declining Health Index enables
              targeted outreach.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
