'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useHealthIndexPoc } from '@/lib/health-index/useHealthIndexPoc';
import { BASELINE_QUIZ_QUESTIONS } from '@/lib/health-index/questions';
import { QuizAnswer } from '@/lib/health-index/types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function BaselineQuizPage() {
  const router = useRouter();
  const { addQuizAnswer, completeBaselineQuiz, currentAnswers } = useHealthIndexPoc();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = BASELINE_QUIZ_QUESTIONS[currentQuestionIndex];
  const currentAnswer = useMemo(
    () => currentAnswers.find(a => a.questionId === currentQuestion.id),
    [currentAnswers, currentQuestion.id]
  );

  const progress = Math.round(((currentQuestionIndex + 1) / BASELINE_QUIZ_QUESTIONS.length) * 100);
  const isAnswered = !!currentAnswer;
  const isLastQuestion = currentQuestionIndex === BASELINE_QUIZ_QUESTIONS.length - 1;
  const allQuestionsAnswered = currentAnswers.length === BASELINE_QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionLabel: string, optionValue: number) => {
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer: optionLabel,
      value: optionValue,
    };
    addQuizAnswer(answer);
  };

  const handleNext = () => {
    if (isLastQuestion && allQuestionsAnswered) {
      completeBaselineQuiz();
      // Small delay to ensure state and localStorage are updated before navigation
      setTimeout(() => {
        router.push('/health-index/results');
      }, 100);
    } else if (isAnswered) {
      setCurrentQuestionIndex(prev => Math.min(prev + 1, BASELINE_QUIZ_QUESTIONS.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Baseline Health Index Quiz</h1>
          <p className="text-gray-600">
            This short check-in helps establish your starting Health Index based on your current
            physical, functional, and mental well-being. Approximately 5 minutes.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestionIndex + 1} of {BASELINE_QUIZ_QUESTIONS.length}
            </span>
            <span className="text-sm font-semibold text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-2 text-sm text-indigo-600 font-semibold uppercase">
            {currentQuestion.section}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.label, option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  currentAnswer?.answer === option.label
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      currentAnswer?.answer === option.label
                        ? 'border-indigo-600 bg-indigo-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {currentAnswer?.answer === option.label && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-2 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLastQuestion && allQuestionsAnswered ? (
                <>
                  Complete Quiz <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Next <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
