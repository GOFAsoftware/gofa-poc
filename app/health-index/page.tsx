'use client';

import Link from 'next/link';

export default function HealthIndexEntry() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <div className="text-6xl font-bold text-indigo-600 mb-2">GOFA</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Health Index</h1>
            <p className="text-xl text-gray-600 mb-2">Concept Demonstration</p>
            <p className="text-sm text-gray-500 italic">
              A concept demo showing how baseline wellness profile and ongoing engagement behaviors
              can shape a dynamic Health Index over time.
            </p>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How it Works</h2>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Take Baseline Quiz</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Complete a short wellness assessment to establish your starting Health Index
                  across physical health, functional abilities, and mental well-being.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Receive Baseline Health Index</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Get your starting Health Index and see how your wellness profile breaks down by
                  domain.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Simulate Engagement Activities</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Click engagement action buttons to see how activities across GOFA modules
                  influence your Health Index over time.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-8">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This PoC demonstrates how a baseline health profile and
              ongoing engagement behaviors may be translated into a dynamic Health Index for
              engagement and monitoring purposes. It is not a diagnostic or medical assessment
              tool.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/health-index/quiz"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Start Demo
            </Link>
            <Link
              href="/health-index/demo"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
            >
              View Sample User
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>Built on GOFA engagement modules • wellness-focused concept</p>
        </div>
      </div>
    </div>
  );
}
