'use client';

import { useState, useCallback, useEffect } from 'react';
import { QuizAnswer, UserHealthIndexState, EngagementEvent, BaselineResult } from './types';
import { calculateBaselineHealthIndex, calculateCurrentHealthIndex, ALL_ACTIONS } from './scoring';

const generateId = () => Math.random().toString(36).substring(2, 9);

export function useHealthIndexPoc() {
  const [state, setState] = useState<UserHealthIndexState | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<QuizAnswer[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('health-index-poc');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState({
          ...parsed,
          baselineResult: {
            ...parsed.baselineResult,
            createdAt: new Date(parsed.baselineResult.createdAt),
          },
          engagementEvents: (parsed.engagementEvents || []).map((e: any) => ({
            ...e,
            timestamp: new Date(e.timestamp),
          })),
          createdAt: new Date(parsed.createdAt),
          updatedAt: new Date(parsed.updatedAt),
        });
      } catch (e) {
        console.error('Failed to load Health Index PoC state:', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (state) {
      localStorage.setItem('health-index-poc', JSON.stringify(state));
    }
  }, [state]);

  const addQuizAnswer = useCallback((answer: QuizAnswer) => {
    setCurrentAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== answer.questionId);
      return [...filtered, answer];
    });
  }, []);

  const completeBaselineQuiz = useCallback(() => {
    const baselineResult = calculateBaselineHealthIndex(currentAnswers);
    const newState: UserHealthIndexState = {
      userId: generateId(),
      baselineHealthIndex: baselineResult.baselineHealthIndex,
      currentHealthIndex: baselineResult.baselineHealthIndex,
      baselineResult,
      engagementEvents: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setState(newState);
    setCurrentAnswers([]);
    // Save to localStorage immediately to ensure data is available on next page
    localStorage.setItem('health-index-poc', JSON.stringify(newState));
  }, [currentAnswers]);

  const addEngagementEvent = useCallback((actionId: string) => {
    if (!state) return;

    const action = ALL_ACTIONS.find(a => a.id === actionId);
    if (!action) return;

    // Prevent duplicate one-time actions
    if (action.oneTime && state.engagementEvents.some(e => e.type === actionId)) return;

    const event: EngagementEvent = {
      id: generateId(),
      type: actionId,
      domain: action.domain,
      points: action.points,
      label: action.label,
      description: action.description,
      timestamp: new Date(),
    };

    const totalEngagementPoints = [...state.engagementEvents, event].reduce(
      (sum, e) => sum + e.points,
      0
    );

    const newCurrentHealthIndex = calculateCurrentHealthIndex(
      state.baselineHealthIndex,
      totalEngagementPoints
    );

    setState(prev =>
      prev
        ? {
            ...prev,
            engagementEvents: [...prev.engagementEvents, event],
            currentHealthIndex: newCurrentHealthIndex,
            updatedAt: new Date(),
          }
        : null
    );
  }, [state]);

  const resetDemo = useCallback(() => {
    setState(null);
    setCurrentAnswers([]);
    localStorage.removeItem('health-index-poc');
  }, []);

  return {
    state,
    currentAnswers,
    addQuizAnswer,
    completeBaselineQuiz,
    addEngagementEvent,
    resetDemo,
    isQuizComplete: !!state && state.engagementEvents !== undefined,
    isInitialized,
  };
}
