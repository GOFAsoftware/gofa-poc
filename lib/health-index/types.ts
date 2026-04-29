// Health Index PoC Data Models

export interface QuizAnswer {
  questionId: string;
  answer: string;
  value: number;
}

export interface BaselineResult {
  baselineHealthIndex: number;
  physicalHealthScore: number;
  functionalHealthScore: number;
  mentalWellbeingScore: number;
  label: string;
  domains: {
    physical: { score: number; label: string };
    functional: { score: number; label: string };
    mental: { score: number; label: string };
  };
  createdAt: Date;
}

export interface EngagementEvent {
  id: string;
  type: string;
  domain: 'movement' | 'nutrition' | 'hydration' | 'recovery' | 'consistency';
  points: number;
  label: string;
  description: string;
  timestamp: Date;
}

export interface UserHealthIndexState {
  userId: string;
  baselineHealthIndex: number;
  currentHealthIndex: number;
  baselineResult: BaselineResult;
  engagementEvents: EngagementEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DomainScore {
  movement: number;
  nutrition: number;
  hydration: number;
  recovery: number;
  consistency: number;
}

export interface QuizQuestion {
  id: string;
  section: string;
  question: string;
  options: Array<{
    label: string;
    value: number;
  }>;
}
