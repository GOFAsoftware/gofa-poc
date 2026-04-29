import { QuizAnswer, BaselineResult } from './types';

/** Fixed baseline Health Index — everyone starts at 50 regardless of quiz answers */
export const BASELINE_HEALTH_INDEX = 50;

/** Maximum engagement points that can be contributed to the Health Index */
export const MAX_ENGAGEMENT_POINTS = 50;

/** Maximum negative engagement — sustained disengagement can reduce the index by up to -50 */
export const MIN_ENGAGEMENT_POINTS = -50;

/**
 * Research basis for ~12-week journey to peak Health Index (+50):
 * - Exercise physiology: measurable cardiorespiratory & strength adaptation in 8–12 weeks
 *   (ACSM guidelines; Blair et al.; Hickson 1981)
 * - Habit formation: median 66 days (~9.4 weeks) to automaticity
 *   (Lally et al., 2010, European Journal of Social Psychology)
 * - Clinical RCTs: 12-week minimum for demonstrable health outcomes
 *
 * Design implication: consistent daily engagement of 3–4 habits/day over ~84 days
 * is needed to realistically reach the full +50 engagement cap.
 */
export const WEEKS_TO_PEAK = 12;

export interface EngagementActionDef {
  id: string;
  label: string;
  description: string;
  category: 'daily' | 'streak';
  domain: 'movement' | 'nutrition' | 'hydration' | 'recovery' | 'consistency';
  points: number;
  emoji: string;
  /**
   * If true, this action can only be claimed once (e.g. streak milestones).
   * Attempting to add it again will be ignored.
   */
  oneTime: boolean;
}

/**
 * Calculate Baseline Health Index from quiz answers
 * Weighted approach:
 * - Physical Health Dimension: 40%
 * - Functional Health Dimension: 30%
 * - Mental Well-being Dimension: 30%
 */
export function calculateBaselineHealthIndex(answers: QuizAnswer[]): BaselineResult {
  // Map answers by question ID for easy lookup
  const answerMap = new Map(answers.map(a => [a.questionId, a]));

  // Physical Health Dimension (Q1-Q4)
  const physicalQuestions = ['q1', 'q2', 'q3', 'q4'];
  const physicalScore =
    physicalQuestions.reduce((sum, qId) => sum + (answerMap.get(qId)?.value || 0), 0) /
    physicalQuestions.length;

  // Functional Health Dimension (Q5-Q8)
  const functionalQuestions = ['q5', 'q6', 'q7', 'q8'];
  const functionalScore =
    functionalQuestions.reduce((sum, qId) => sum + (answerMap.get(qId)?.value || 0), 0) /
    functionalQuestions.length;

  // Mental Well-being Dimension (Q9-Q16)
  const mentalQuestions = ['q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16'];
  const mentalScore =
    mentalQuestions.reduce((sum, qId) => sum + (answerMap.get(qId)?.value || 0), 0) /
    mentalQuestions.length;

  // Baseline is always fixed at 50 — quiz informs domain breakdown only
  const baselineHealthIndex = BASELINE_HEALTH_INDEX;

  // Label is always 'Building Foundation' at the fixed baseline of 50
  const label = 'Building Foundation';

  // Determine domain labels
  const getDomainLabel = (score: number): string => {
    if (score >= 75) return 'Positive';
    if (score >= 50) return 'Moderate';
    return 'Needs Attention';
  };

  return {
    baselineHealthIndex,
    physicalHealthScore: Math.round(physicalScore),
    functionalHealthScore: Math.round(functionalScore),
    mentalWellbeingScore: Math.round(mentalScore),
    label,
    domains: {
      physical: {
        score: Math.round(physicalScore),
        label: getDomainLabel(physicalScore),
      },
      functional: {
        score: Math.round(functionalScore),
        label: getDomainLabel(functionalScore),
      },
      mental: {
        score: Math.round(mentalScore),
        label: getDomainLabel(mentalScore),
      },
    },
    createdAt: new Date(),
  };
}

/**
 * Calculate current Health Index based on baseline + engagement effects.
 * Engagement is clamped to [MIN_ENGAGEMENT_POINTS, MAX_ENGAGEMENT_POINTS] (−50 to +50).
 * Score range: 0–100 (baseline 50 ± up to 50 from engagement).
 */
export function calculateCurrentHealthIndex(
  baselineHealthIndex: number,
  engagementPoints: number
): number {
  const cappedPoints = Math.max(MIN_ENGAGEMENT_POINTS, Math.min(engagementPoints, MAX_ENGAGEMENT_POINTS));
  const current = baselineHealthIndex + cappedPoints;
  return Math.max(0, Math.min(100, current));
}

// ---------------------------------------------------------------------------
// Daily lifestyle habits — repeatable (for PoC each click counts)
// ---------------------------------------------------------------------------
export const ENGAGEMENT_ACTIONS: EngagementActionDef[] = [
  {
    id: 'ai-move',
    label: 'AI Move Session',
    description: 'Completed an AI-guided movement exercise',
    category: 'daily',
    domain: 'movement',
    points: 3,
    emoji: '🏃',
    oneTime: false,
  },
  {
    id: 'steps',
    label: 'Daily Steps Goal',
    description: 'Reached 8,000+ steps for the day',
    category: 'daily',
    domain: 'movement',
    points: 2,
    emoji: '👟',
    oneTime: false,
  },
  {
    id: 'meal',
    label: 'Log a Meal',
    description: 'Snapped and logged a balanced meal',
    category: 'daily',
    domain: 'nutrition',
    points: 1,
    emoji: '🥗',
    oneTime: false,
  },
  {
    id: 'hydration',
    label: 'Hydration Goal',
    description: 'Drank 2L+ of water today',
    category: 'daily',
    domain: 'hydration',
    points: 2,
    emoji: '💧',
    oneTime: false,
  },
  {
    id: 'sleep',
    label: 'Quality Sleep',
    description: '7+ hours recorded in sleep log',
    category: 'daily',
    domain: 'recovery',
    points: 3,
    emoji: '😴',
    oneTime: false,
  },
];

// ---------------------------------------------------------------------------
// Streak / milestone rewards — one-time only
// ---------------------------------------------------------------------------
export const STREAK_ACTIONS: EngagementActionDef[] = [
  {
    id: 'streak-3',
    label: '3-Day Sign-in Streak',
    description: 'Opened the app 3 days in a row',
    category: 'streak',
    domain: 'consistency',
    points: 3,
    emoji: '🔥',
    oneTime: true,
  },
  {
    id: 'streak-5',
    label: '5-Day Sign-in Streak',
    description: 'Opened the app 5 days in a row',
    category: 'streak',
    domain: 'consistency',
    points: 5,
    emoji: '🔥',
    oneTime: true,
  },
  {
    id: 'streak-7',
    label: '7-Day Sign-in Streak',
    description: 'Full week of daily engagement',
    category: 'streak',
    domain: 'consistency',
    points: 7,
    emoji: '⭐',
    oneTime: true,
  },
  {
    id: 'streak-10',
    label: '10-Day Sign-in Streak',
    description: 'Consistent 10-day engagement',
    category: 'streak',
    domain: 'consistency',
    points: 10,
    emoji: '🏆',
    oneTime: true,
  },
  {
    id: 'streak-30',
    label: '30-Day Streak',
    description: 'A full month of dedication',
    category: 'streak',
    domain: 'consistency',
    points: 15,
    emoji: '💎',
    oneTime: true,
  },
];

// ---------------------------------------------------------------------------
// Negative lifestyle events — repeatable
// ---------------------------------------------------------------------------
export const NEGATIVE_ACTIONS: EngagementActionDef[] = [
  {
    id: 'no-exercise',
    label: 'Skipped Exercise',
    description: 'No physical activity today',
    category: 'daily',
    domain: 'movement',
    points: -1,
    emoji: '😔',
    oneTime: false,
  },
  {
    id: 'poor-sleep',
    label: 'Poor Sleep',
    description: 'Less than 6 hours of sleep',
    category: 'daily',
    domain: 'recovery',
    points: -2,
    emoji: '🌙',
    oneTime: false,
  },
  {
    id: 'low-hydration',
    label: 'Low Hydration',
    description: "Didn't meet water intake goal",
    category: 'daily',
    domain: 'hydration',
    points: -1,
    emoji: '🚱',
    oneTime: false,
  },
  {
    id: 'unhealthy-meal',
    label: 'Unhealthy Meal',
    description: 'Logged a high-calorie / poor nutrition meal',
    category: 'daily',
    domain: 'nutrition',
    points: -1,
    emoji: '🍔',
    oneTime: false,
  },
  {
    id: 'missed-login',
    label: 'Missed Login / Inactive Day',
    description: 'Did not open the app or engage at all today',
    category: 'daily',
    domain: 'consistency',
    points: -3,
    emoji: '📵',
    oneTime: false,
  },
];

/** Combined lookup for all action types */
export const ALL_ACTIONS: EngagementActionDef[] = [
  ...ENGAGEMENT_ACTIONS,
  ...STREAK_ACTIONS,
  ...NEGATIVE_ACTIONS,
];

/**
 * Get trend direction based on change from baseline
 */
export function getTrendDirection(
  baselineHealthIndex: number,
  currentHealthIndex: number
): 'improving' | 'stable' | 'declining' {
  const delta = currentHealthIndex - baselineHealthIndex;
  if (delta > 5) return 'improving';
  if (delta < -5) return 'declining';
  return 'stable';
}

/**
 * Format Health Index change for display
 */
export function formatHealthIndexChange(
  baselineHealthIndex: number,
  currentHealthIndex: number
): string {
  const delta = currentHealthIndex - baselineHealthIndex;
  if (delta > 0) {
    return `+${delta} from baseline`;
  } else if (delta < 0) {
    return `${delta} from baseline`;
  }
  return 'No change';
}
