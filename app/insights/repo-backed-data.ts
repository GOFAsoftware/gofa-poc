export type OverviewData = {
  totalLinkedPlayers: number;
  highRiskCount: number;
  averageAge: number;
  urgentAttentionCount: number;
  assessmentCompletedCount: number;
  assessmentCompletionRate: number;
  riskDistribution: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
  };
  ageDistribution: Record<string, number>;
};

export type OriginCount = {
  total: number;
  completed: number;
  incomplete: number;
};

export type ClientBreakdown = {
  clientId: string;
  total: number;
  completed: number;
  byOrigin: Record<string, OriginCount>;
};

export type AssessmentTypeCounts = {
  total: number;
  completed: number;
  incomplete: number;
  byOrigin: Record<string, OriginCount>;
  byClient: ClientBreakdown[];
};

export type EngagementInsightsData = {
  lessons: {
    activeUsers: number;
    totalPlays: number;
    completedPlays: number;
  };
  aiMove: {
    activeUsers: number;
    totalSessions: number;
    completedSessions: number;
    totalReps: number;
  };
  aiTraining: {
    activeUsers: number;
    totalRuns: number;
    completedRuns: number;
    totalCaloriesBurned: number;
  };
};

export type FunctionalTestRow = {
  label: string;
  description: string;
  unit: string;
  threshold: string;
  overallAvg: number;
  ageUnder60: number;
  age60to69: number;
  age70to79: number;
  age80plus: number;
};

export type ChallengePartnerStat = {
  source: "bupa" | "tellytv";
  label: string;
  totalPlays: number;
  totalPlaysEnded: number;
  totalPlaysCancelled: number;
  totalPlaysPending: number;
  totalDurationPlayedMinutes: number;
  totalRepsDone: number;
};

export type SilverCarePlayer = {
  uid: string;
  name: string;
  age: number;
  riskLevel: 1 | 2 | 3 | 4;
  riskLevelText: "LOW" | "INTERMEDIATE" | "HIGH" | "VERY_HIGH";
  fallRiskPercentage: number;
  sarcopeniaRisk: string;
  lastAssessmentDate: string;
  linkSource: Array<"1care" | "silvercare" | "connect">;
};

export const repoSourceNotes = {
  title: "Repository-backed demo dataset",
  detail:
    "This page now follows the real analytics field set from GOFA B2B overview, assessment-counts, engagement-insights, challenge stats, and SilverCare player analytics plus rehab guidance.",
};

export const labels = {
  healthInsights: "Health Insights",
  engagementInsights: "Engagement Insights",
  assessmentCounts: "Assessment Counts",
  functionalTestReport: "Functional Test Average Performance",
  riskMix: "Risk Mix",
  ageProfile: "Age Profile",
  assessmentCoverage: "Assessment Coverage",
  aiMove: "AI Move",
  aiTraining: "AI Training",
  lessons: "Lessons",
  sourceBupa: "Bupa",
  sourceTellyTv: "Telly TV",
  sourceOrigins: {
    kiosk: "Kiosk",
    "1care": "1Care",
    "sc-app": "SilverCare App",
    app: "App",
    web: "Web",
    connect: "Connect",
    unknown: "Other / Unknown",
  },
};

export const overview: OverviewData = {
  totalLinkedPlayers: 50,
  highRiskCount: 15,
  averageAge: 61,
  urgentAttentionCount: 5,
  assessmentCompletedCount: 36,
  assessmentCompletionRate: 72,
  riskDistribution: {
    level1: 20,
    level2: 15,
    level3: 10,
    level4: 5,
  },
  ageDistribution: {
    "30-39": 3,
    "40-49": 7,
    "50-59": 11,
    "60-69": 14,
    "70-79": 10,
    "80-89": 5,
    "90+": 0,
  },
};

export const assessmentCounts: {
  fallRisk: AssessmentTypeCounts;
  cognitive: AssessmentTypeCounts;
  msk: AssessmentTypeCounts;
} = {
  fallRisk: {
    total: 44,
    completed: 36,
    incomplete: 8,
    byOrigin: {
      kiosk: { total: 9, completed: 8, incomplete: 1 },
      "1care": { total: 7, completed: 6, incomplete: 1 },
      "sc-app": { total: 11, completed: 8, incomplete: 3 },
      connect: { total: 8, completed: 7, incomplete: 1 },
      web: { total: 5, completed: 4, incomplete: 1 },
      app: { total: 4, completed: 3, incomplete: 1 },
    },
    byClient: [
      {
        clientId: "bupa",
        total: 14,
        completed: 12,
        byOrigin: {
          "1care": { total: 5, completed: 4, incomplete: 1 },
          app: { total: 3, completed: 3, incomplete: 0 },
          web: { total: 6, completed: 5, incomplete: 1 },
        },
      },
      {
        clientId: "gofa",
        total: 18,
        completed: 14,
        byOrigin: {
          kiosk: { total: 9, completed: 8, incomplete: 1 },
          connect: { total: 5, completed: 4, incomplete: 1 },
          "sc-app": { total: 4, completed: 2, incomplete: 2 },
        },
      },
      {
        clientId: "tellytv",
        total: 12,
        completed: 10,
        byOrigin: {
          "sc-app": { total: 7, completed: 6, incomplete: 1 },
          connect: { total: 3, completed: 3, incomplete: 0 },
          web: { total: 2, completed: 1, incomplete: 1 },
        },
      },
    ],
  },
  cognitive: {
    total: 18,
    completed: 11,
    incomplete: 7,
    byOrigin: {
      kiosk: { total: 3, completed: 2, incomplete: 1 },
      "sc-app": { total: 6, completed: 4, incomplete: 2 },
      web: { total: 4, completed: 2, incomplete: 2 },
      connect: { total: 5, completed: 3, incomplete: 2 },
    },
    byClient: [
      {
        clientId: "gofa",
        total: 8,
        completed: 5,
        byOrigin: {
          kiosk: { total: 3, completed: 2, incomplete: 1 },
          connect: { total: 3, completed: 2, incomplete: 1 },
          web: { total: 2, completed: 1, incomplete: 1 },
        },
      },
      {
        clientId: "bupa",
        total: 4,
        completed: 2,
        byOrigin: {
          web: { total: 2, completed: 1, incomplete: 1 },
          app: { total: 2, completed: 1, incomplete: 1 },
        },
      },
      {
        clientId: "tellytv",
        total: 6,
        completed: 4,
        byOrigin: {
          "sc-app": { total: 4, completed: 3, incomplete: 1 },
          connect: { total: 2, completed: 1, incomplete: 1 },
        },
      },
    ],
  },
  msk: {
    total: 21,
    completed: 14,
    incomplete: 7,
    byOrigin: {
      kiosk: { total: 2, completed: 2, incomplete: 0 },
      "1care": { total: 6, completed: 4, incomplete: 2 },
      app: { total: 5, completed: 3, incomplete: 2 },
      web: { total: 3, completed: 2, incomplete: 1 },
      connect: { total: 5, completed: 3, incomplete: 2 },
    },
    byClient: [
      {
        clientId: "bupa",
        total: 9,
        completed: 6,
        byOrigin: {
          "1care": { total: 5, completed: 4, incomplete: 1 },
          app: { total: 2, completed: 1, incomplete: 1 },
          web: { total: 2, completed: 1, incomplete: 1 },
        },
      },
      {
        clientId: "gofa",
        total: 5,
        completed: 4,
        byOrigin: {
          kiosk: { total: 2, completed: 2, incomplete: 0 },
          connect: { total: 3, completed: 2, incomplete: 1 },
        },
      },
      {
        clientId: "tellytv",
        total: 7,
        completed: 4,
        byOrigin: {
          app: { total: 3, completed: 2, incomplete: 1 },
          connect: { total: 2, completed: 1, incomplete: 1 },
          web: { total: 2, completed: 1, incomplete: 1 },
        },
      },
    ],
  },
};

export const functionalTests: FunctionalTestRow[] = [
  {
    label: "5x Sit-to-Stand",
    description: "Time to complete 5 repetitions",
    unit: "sec",
    threshold: "Pass <= 12 sec",
    overallAvg: 13.6,
    ageUnder60: 10.8,
    age60to69: 12.7,
    age70to79: 14.3,
    age80plus: 17.1,
  },
  {
    label: "30 sec Sit-to-Stand",
    description: "Repetitions completed in 30 seconds",
    unit: "reps",
    threshold: "Pass >= 12 reps",
    overallAvg: 11.4,
    ageUnder60: 14.1,
    age60to69: 12.6,
    age70to79: 10.5,
    age80plus: 8.2,
  },
  {
    label: "Single-Leg Stance",
    description: "Balance hold time",
    unit: "sec",
    threshold: "Pass >= 10 sec",
    overallAvg: 7.8,
    ageUnder60: 12.1,
    age60to69: 8.6,
    age70to79: 6.4,
    age80plus: 3.8,
  },
  {
    label: "Tandem Stance",
    description: "Heel-to-toe balance hold time",
    unit: "sec",
    threshold: "Pass >= 10 sec / Partial >= 5 sec",
    overallAvg: 8.9,
    ageUnder60: 12.5,
    age60to69: 10.1,
    age70to79: 7.4,
    age80plus: 4.9,
  },
  {
    label: "Tandem Walk",
    description: "Completed tandem steps",
    unit: "steps",
    threshold: "Pass >= 8 steps",
    overallAvg: 7.2,
    ageUnder60: 8.4,
    age60to69: 7.8,
    age70to79: 6.9,
    age80plus: 5.4,
  },
];

export const engagementInsights: EngagementInsightsData = {
  aiMove: {
    activeUsers: 24,
    totalSessions: 186,
    completedSessions: 142,
    totalReps: 4890,
  },
  aiTraining: {
    activeUsers: 17,
    totalRuns: 94,
    completedRuns: 63,
    totalCaloriesBurned: 24180,
  },
  lessons: {
    activeUsers: 21,
    totalPlays: 128,
    completedPlays: 96,
  },
};

export const challengePartnerStats: ChallengePartnerStat[] = [
  {
    source: "bupa",
    label: labels.sourceBupa,
    totalPlays: 412,
    totalPlaysEnded: 336,
    totalPlaysCancelled: 34,
    totalPlaysPending: 42,
    totalDurationPlayedMinutes: 2240,
    totalRepsDone: 12180,
  },
  {
    source: "tellytv",
    label: labels.sourceTellyTv,
    totalPlays: 368,
    totalPlaysEnded: 251,
    totalPlaysCancelled: 51,
    totalPlaysPending: 66,
    totalDurationPlayedMinutes: 1975,
    totalRepsDone: 10110,
  },
];

export const silverCarePlayers: SilverCarePlayer[] = [
  {
    uid: "player_001",
    name: "王小明",
    age: 67,
    riskLevel: 4,
    riskLevelText: "VERY_HIGH",
    fallRiskPercentage: 82,
    sarcopeniaRisk: "High potential",
    lastAssessmentDate: "2026-03-18",
    linkSource: ["silvercare", "connect"],
  },
  {
    uid: "player_002",
    name: "李美玲",
    age: 73,
    riskLevel: 3,
    riskLevelText: "HIGH",
    fallRiskPercentage: 68,
    sarcopeniaRisk: "Moderate",
    lastAssessmentDate: "2026-03-12",
    linkSource: ["silvercare"],
  },
  {
    uid: "player_003",
    name: "張志強",
    age: 58,
    riskLevel: 2,
    riskLevelText: "INTERMEDIATE",
    fallRiskPercentage: 41,
    sarcopeniaRisk: "Low potential",
    lastAssessmentDate: "2026-03-28",
    linkSource: ["1care"],
  },
  {
    uid: "player_004",
    name: "陳淑芬",
    age: 62,
    riskLevel: 1,
    riskLevelText: "LOW",
    fallRiskPercentage: 18,
    sarcopeniaRisk: "None",
    lastAssessmentDate: "2026-03-30",
    linkSource: ["1care", "connect"],
  },
];

export const rehabGuidance = [
  {
    cohort: "High risk / frail",
    fitPtStart: "Chair-based exercise",
    progression:
      "Start with safe seated movement only. These exercises can be completed on a chair and reduce fall exposure while rebuilding confidence.",
    safety:
      "All exercise should be supervised or completed with someone nearby.",
  },
  {
    cohort: "Medium risk / pre-frail",
    fitPtStart: "Chair-based exercise -> sit-to-stand progression",
    progression:
      "Build a seated base first, then progress into sit-to-stand routines once the member can tolerate repeated transitions safely.",
    safety:
      "Keep a nearby support surface such as a chair back or wall.",
  },
  {
    cohort: "Lower risk / stable",
    fitPtStart: "Sit-to-stand progression",
    progression:
      "Begin with sit-to-stand work to build lower-limb strength, then advance into standing movement for functional carryover.",
    safety:
      "Progress gradually even when baseline risk is lower.",
  },
];

export const riskLevelTextMap: Record<SilverCarePlayer["riskLevelText"], string> = {
  LOW: "Low",
  INTERMEDIATE: "Intermediate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};