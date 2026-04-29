'use client';

import { useRouter } from 'next/navigation';
import { useHealthIndexPoc } from '@/lib/health-index/useHealthIndexPoc';
import Link from 'next/link';
import { useEffect } from 'react';

function DomainBar({ label, score }: { label: string; score: number }) {
  const getColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-800">{label}</span>
        <span className="font-bold text-lg text-gray-900">{score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className={`h-3 rounded-full transition-all duration-500 ${getColor(score)}`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}

function HealthIndexCircle({ index, label }: { index: number; label: string }) {
  const getStatusColor = (index: number) => {
    if (index >= 75) return 'text-green-600';
    if (index >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getStatusBgColor = (index: number) => {
    if (index >= 75) return 'bg-green-100';
    if (index >= 50) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`w-24 h-24 rounded-full ${getStatusBgColor(index)} flex items-center justify-center mb-2`}>
        <div className="text-center">
          <div className={`text-5xl font-bold ${getStatusColor(index)}`}>{index}</div>
        </div>
      </div>
      <p className="text-sm text-gray-700 font-semibold text-center">{label}</p>
    </div>
  );
}

export default function BaselineResultsPage() {
  const router = useRouter();
  const { state, isInitialized } = useHealthIndexPoc();

  useEffect(() => {
    // Wait for initialization before checking if state exists
    if (isInitialized && !state) {
      router.push('/health-index/quiz');
    }
  }, [state, isInitialized, router]);

  if (!isInitialized || !state) {
    return null;
  }

  const { baselineResult } = state;
  const getLabelColor = (label: string) => {
    if (label === 'Strong Foundation') return 'text-green-700 bg-green-100';
    if (label === 'Building Foundation') return 'text-amber-700 bg-amber-100';
    return 'text-red-700 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Baseline Health Index</h1>
          <p className="text-gray-600 text-lg">
            Your baseline is set at <strong>50</strong> — the universal starting point for all users.
            Your quiz responses reveal how your physical, functional, and mental domains contribute
            to your starting profile.
          </p>
        </div>

        {/* Main Score Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col items-center mb-8">
            <HealthIndexCircle index={baselineResult.baselineHealthIndex} label="Baseline Health Index" />
          </div>

          <div className="text-center mb-8">
            <div className={`inline-block px-4 py-2 rounded-full font-semibold mb-4 ${getLabelColor(baselineResult.label)}`}>
              {baselineResult.label}
            </div>
            <p className="text-gray-600 text-center">
              Your baseline is fixed at <strong>50</strong> for all users. From here, consistent
              daily engagement can lift your Health Index toward 100 (+50 pts), while inactivity
              and missed sessions will reduce it toward 0 (−50 pts). Research shows reaching
              peak engagement takes ~12 weeks of consistent daily habits.
            </p>
          </div>

          {/* Domain Breakdown */}
          <div className="border-t-2 border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Health Index Domains</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-1">Physical Function</h3>
                <p className="text-xs text-gray-600 mb-4">Capacity for movement and activity</p>
                <div className="text-3xl font-bold text-indigo-600">
                  {baselineResult.physicalHealthScore}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-1">Functional Ability</h3>
                <p className="text-xs text-gray-600 mb-4">Ability to complete daily activities</p>
                <div className="text-3xl font-bold text-indigo-600">
                  {baselineResult.functionalHealthScore}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-1">Mental Well-being</h3>
                <p className="text-xs text-gray-600 mb-4">Emotional and mental aspects</p>
                <div className="text-3xl font-bold text-indigo-600">
                  {baselineResult.mentalWellbeingScore}
                </div>
              </div>
            </div>

            {/* Detailed Domain Bars */}
            <h3 className="text-lg font-bold text-gray-900 mb-6">Domain Breakdown</h3>
            <DomainBar label="Physical Function" score={baselineResult.physicalHealthScore} />
            <DomainBar label="Functional Ability" score={baselineResult.functionalHealthScore} />
            <DomainBar label="Mental Well-being" score={baselineResult.mentalWellbeingScore} />
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-8 mb-8">
            <p className="text-sm text-blue-900">
              <strong>Important:</strong> This Health Index is designed for wellness engagement
              and monitoring purposes only. It does not provide a diagnosis, medical advice, or
              clinical decision support.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/health-index/dashboard"
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Continue to Health Index Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
