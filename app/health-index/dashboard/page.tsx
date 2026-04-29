'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHealthIndexPoc } from '@/lib/health-index/useHealthIndexPoc';
import {
  ENGAGEMENT_ACTIONS,
  STREAK_ACTIONS,
  NEGATIVE_ACTIONS,
  MAX_ENGAGEMENT_POINTS,
  MIN_ENGAGEMENT_POINTS,
  WEEKS_TO_PEAK,
  EngagementActionDef,
} from '@/lib/health-index/scoring';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react';

// ---------------------------------------------------------------------------
// Score formula + engagement bar
// ---------------------------------------------------------------------------
function ScoreFormulaRow({
  baseline,
  engagementPts,
  current,
}: {
  baseline: number;
  engagementPts: number;
  current: number;
}) {
  const delta = current - baseline;
  // Each half of the bidirectional bar represents 50 pts (one full side = 50% of bar width)
  const posPct = (Math.max(0, engagementPts) / MAX_ENGAGEMENT_POINTS) * 50;
  const negPct = (Math.abs(Math.min(0, engagementPts)) / MAX_ENGAGEMENT_POINTS) * 50;
  const isPositiveMaxed = engagementPts >= MAX_ENGAGEMENT_POINTS;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      {/* Formula row */}
      <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
        <div className="text-center">
          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Baseline</div>
          <div className="bg-gray-100 rounded-lg px-5 py-2 text-3xl font-bold text-gray-700">
            {baseline}
          </div>
          <div className="text-xs text-gray-400 mt-1">Fixed starting point</div>
        </div>
        <div className="text-2xl font-light text-gray-400">+</div>
        <div className="text-center">
          <div className="text-xs font-semibold text-indigo-500 uppercase mb-1">Engagement</div>
          <div
            className={`rounded-lg px-5 py-2 text-3xl font-bold ${
              engagementPts >= MAX_ENGAGEMENT_POINTS
                ? 'bg-yellow-100 text-yellow-700'
                : engagementPts > 0
                ? 'bg-indigo-100 text-indigo-700'
                : engagementPts < 0
                ? 'bg-red-50 text-red-600'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {engagementPts > 0 ? `+${engagementPts}` : engagementPts}
            <span className="text-base font-normal text-gray-400">/{MAX_ENGAGEMENT_POINTS}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">Lifestyle activity</div>
        </div>
        <div className="text-2xl font-light text-gray-400">=</div>
        <div className="text-center">
          <div className="text-xs font-semibold text-emerald-600 uppercase mb-1">Current</div>
          <div
            className={`rounded-lg px-5 py-2 text-3xl font-bold ${
              current >= 75
                ? 'bg-emerald-100 text-emerald-700'
                : current >= 50
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {current}
          </div>
          <div className="flex items-center gap-1 justify-center mt-1 text-xs">
            {delta > 0 ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +{delta} from baseline
              </span>
            ) : delta < 0 ? (
              <span className="text-red-500 font-semibold flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> {delta} from baseline
              </span>
            ) : (
              <span className="text-gray-400 flex items-center gap-0.5">
                <Minus className="w-3 h-3" /> No change yet
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Bidirectional engagement bar: left = negative (red), centre = 0, right = positive (green) */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-semibold text-gray-500 uppercase">Engagement</span>
          <span className={`text-xs font-bold ${engagementPts >= 0 ? 'text-indigo-600' : 'text-red-500'}`}>
            {engagementPts > 0 ? `+${engagementPts}` : engagementPts} / {MAX_ENGAGEMENT_POINTS} pts
            {isPositiveMaxed && (
              <span className="ml-2 text-yellow-600">🏅 Maxed!</span>
            )}
          </span>
        </div>
        <div className="relative w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          <div className="absolute left-1/2 top-0 w-px h-full bg-gray-400 z-10" style={{ transform: 'translateX(-50%)' }} />
          {engagementPts > 0 && (
            <div
              className={`absolute left-1/2 h-full transition-all duration-500 ${
                isPositiveMaxed
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                  : posPct >= 25
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                  : 'bg-gradient-to-r from-indigo-400 to-indigo-500'
              }`}
              style={{ width: `${Math.min(posPct, 50)}%` }}
            />
          )}
          {engagementPts < 0 && (
            <div
              className="absolute right-1/2 h-full bg-gradient-to-l from-red-400 to-red-500 transition-all duration-500"
              style={{ width: `${Math.min(negPct, 50)}%` }}
            />
          )}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>−50</span><span>−25</span><span className="font-semibold text-gray-500">0</span><span>+25</span><span>+50</span>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Consistent daily engagement takes ~{WEEKS_TO_PEAK} weeks (research-backed) to reach +50
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Daily action card (repeatable)
// ---------------------------------------------------------------------------
function DailyActionCard({
  action,
  count,
  onClick,
  disabled,
}: {
  action: EngagementActionDef;
  count: number;
  onClick: () => void;
  disabled: boolean;
}) {
  const isNegative = action.points < 0;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full text-left rounded-xl border-2 p-4 transition-all active:scale-95 focus:outline-none focus:ring-2
        ${
          disabled
            ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
            : isNegative
            ? 'border-red-200 bg-white hover:border-red-400 hover:shadow-md focus:ring-red-200'
            : 'border-indigo-200 bg-white hover:border-indigo-500 hover:shadow-md focus:ring-indigo-200'
        }
      `}
    >
      {count > 0 && (
        <span
          className={`absolute top-2 right-2 text-xs font-bold rounded-full px-2 py-0.5 ${
            isNegative ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-700'
          }`}
        >
          ×{count}
        </span>
      )}
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{action.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-tight">{action.label}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{action.description}</p>
        </div>
      </div>
      <div
        className={`mt-3 text-sm font-bold ${
          isNegative ? 'text-red-500' : 'text-indigo-600'
        }`}
      >
        {action.points > 0 ? `+${action.points}` : action.points} pts
        {!disabled && (
          <span className="text-xs font-normal text-gray-400 ml-1">click to log</span>
        )}
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Streak milestone card (one-time)
// ---------------------------------------------------------------------------
function StreakCard({
  action,
  claimed,
  onClick,
  disabled,
}: {
  action: EngagementActionDef;
  claimed: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={claimed || disabled}
      className={`relative w-full text-left rounded-xl border-2 p-4 transition-all active:scale-95 focus:outline-none focus:ring-2
        ${
          claimed
            ? 'border-emerald-300 bg-emerald-50 cursor-default'
            : disabled
            ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
            : 'border-amber-300 bg-white hover:border-amber-500 hover:shadow-md focus:ring-amber-200 cursor-pointer'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{claimed ? '✅' : action.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900 text-sm leading-tight">{action.label}</p>
            {claimed && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                Claimed
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{action.description}</p>
        </div>
      </div>
      <div
        className={`mt-3 text-sm font-bold ${
          claimed ? 'text-emerald-600' : 'text-amber-600'
        }`}
      >
        +{action.points} pts
        {!claimed && !disabled && (
          <span className="text-xs font-normal text-gray-400 ml-1">one-time reward</span>
        )}
      </div>
    </button>
  );
}

function ActivityLogEntry({
  label,
  points,
  timestamp,
}: {
  label: string;
  points: number;
  timestamp: Date;
}) {
  const timeAgo = useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }, [timestamp]);

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
      <div>
        <p className="font-medium text-gray-800 text-sm">{label}</p>
        <p className="text-xs text-gray-400">{timeAgo}</p>
      </div>
      <div
        className={`font-bold text-base min-w-[3rem] text-right ${
          points > 0 ? 'text-emerald-600' : 'text-red-500'
        }`}
      >
        {points > 0 ? '+' : ''}{points}
      </div>
    </div>
  );
}

export default function HealthIndexDashboard() {
  const router = useRouter();
  const { state, addEngagementEvent, resetDemo, isInitialized } = useHealthIndexPoc();
  const [showNegative, setShowNegative] = useState(false);

  useEffect(() => {
    if (isInitialized && !state) {
      router.push('/health-index/quiz');
    }
  }, [state, isInitialized, router]);

  if (!isInitialized || !state) {
    return null;
  }

  // Raw engagement sum (before cap)
  const rawEngagementPoints = state.engagementEvents.reduce((sum, e) => sum + e.points, 0);
  const displayEngagementPts = Math.max(MIN_ENGAGEMENT_POINTS, Math.min(rawEngagementPoints, MAX_ENGAGEMENT_POINTS));
  const isMaxed = rawEngagementPoints >= MAX_ENGAGEMENT_POINTS;

  // Per-action click counts
  const actionCounts = state.engagementEvents.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] ?? 0) + 1;
    return acc;
  }, {});

  // One-time claimed set
  const claimedIds = new Set(
    state.engagementEvents
      .filter(e => STREAK_ACTIONS.some(s => s.id === e.type))
      .map(e => e.type)
  );

  const sortedEvents = [...state.engagementEvents].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Health Index Dashboard</h1>
            <p className="text-sm text-gray-500">
              Simulate real-life activities to see how they shift your Health Index
            </p>
          </div>
          <button
            onClick={resetDemo}
            className="text-xs text-gray-500 hover:text-gray-800 font-semibold px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Reset Demo
          </button>
        </div>

        {/* Score Formula + Engagement Bar */}
        <ScoreFormulaRow
          baseline={state.baselineHealthIndex}
          engagementPts={displayEngagementPts}
          current={state.currentHealthIndex}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Habits */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold text-gray-900">📅 Daily Habits</h2>
                {isMaxed && (
                  <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                    Max 50 pts reached
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-4">Repeatable — each click logs one activity session</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ENGAGEMENT_ACTIONS.map(action => (
                  <DailyActionCard
                    key={action.id}
                    action={action}
                    count={actionCounts[action.id] ?? 0}
                    onClick={() => addEngagementEvent(action.id)}
                    disabled={isMaxed}
                  />
                ))}
              </div>
            </div>

            {/* Streak Milestones */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">🔥 Streak Milestones</h2>
              <p className="text-xs text-gray-400 mb-4">One-time rewards — claim each milestone once</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STREAK_ACTIONS.map(action => (
                  <StreakCard
                    key={action.id}
                    action={action}
                    claimed={claimedIds.has(action.id)}
                    onClick={() => addEngagementEvent(action.id)}
                    disabled={isMaxed && !claimedIds.has(action.id)}
                  />
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
                Streak milestones total up to <strong>40 pts</strong>. Reaching the full <strong>+50 pt cap</strong> realistically takes ~<strong>{WEEKS_TO_PEAK} weeks</strong> of consistent daily engagement — based on exercise physiology and habit formation research.
              </div>
            </div>

            {/* Negative Events (collapsible) */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setShowNegative(v => !v)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                <div>
                  <h2 className="text-base font-bold text-gray-700 text-left">⚠️ Negative Events</h2>
                  <p className="text-xs text-gray-400 text-left">Simulate missed habits — reduces engagement points</p>
                </div>
                {showNegative ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {showNegative && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-3">
                    {NEGATIVE_ACTIONS.map(action => (
                      <DailyActionCard
                        key={action.id}
                        action={action}
                        count={actionCounts[action.id] ?? 0}
                        onClick={() => addEngagementEvent(action.id)}
                        disabled={false}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Stats + Log */}
          <div className="space-y-4">
            {/* Summary card */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-base">Engagement Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-semibold uppercase">Activities</span>
                  <span className="text-xl font-bold text-indigo-600">{state.engagementEvents.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-semibold uppercase">Pts Earned</span>
                  <span
                    className={`text-xl font-bold ${
                      displayEngagementPts > 0
                        ? 'text-emerald-600'
                        : displayEngagementPts < 0
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {displayEngagementPts > 0 ? '+' : ''}{displayEngagementPts}
                    <span className="text-sm font-normal text-gray-400">/{MAX_ENGAGEMENT_POINTS}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-semibold uppercase">Streaks</span>
                  <span className="text-xl font-bold text-amber-600">
                    {claimedIds.size}/{STREAK_ACTIONS.length}
                  </span>
                </div>
              </div>
              {state.engagementEvents.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">By Domain</p>
                  {(['movement', 'nutrition', 'hydration', 'recovery', 'consistency'] as const).map(domain => {
                    const evts = state.engagementEvents.filter(e => e.domain === domain);
                    if (evts.length === 0) return null;
                    const pts = evts.reduce((s, e) => s + e.points, 0);
                    const emoji = { movement: '🏃', nutrition: '🥗', hydration: '💧', recovery: '😴', consistency: '🔥' }[domain];
                    return (
                      <div key={domain} className="flex justify-between text-xs py-1">
                        <span className="text-gray-600">{emoji} {domain}</span>
                        <span className={`font-semibold ${pts > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {pts > 0 ? '+' : ''}{pts}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Activity log */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-base">Activity Log</h3>
              {sortedEvents.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">No activities yet — click any action to start!</p>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {sortedEvents.map(event => (
                    <ActivityLogEntry
                      key={event.id}
                      label={event.label}
                      points={event.points}
                      timestamp={event.timestamp}
                    />
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/health-index"
              className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-semibold py-2 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
          <p className="text-xs text-indigo-800">
            <strong>PoC Simulation:</strong> Baseline is fixed at <strong>50</strong> for all users.
            Engagement ranges from −50 (persistent disengagement) to +50 (consistent active habits),
            shifting the Health Index between 0 and 100. Missed logins and inactivity reduce points.{' '}
            In production, activities are recorded automatically from GOFA modules.{' '}
            Research basis: reaching peak (+50) takes ~<strong>{WEEKS_TO_PEAK} weeks</strong> of daily
            engagement (ACSM exercise guidelines; Lally et al., 2010 habit formation study).
          </p>
        </div>
      </div>
    </div>
  );
}
