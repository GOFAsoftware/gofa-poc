import { QuizQuestion } from './types';

export const BASELINE_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Section 1: Physical and Functional Health
  {
    id: 'q1',
    section: 'Physical Health',
    question: 'In general, how would you rate your health?',
    options: [
      { label: 'Excellent', value: 100 },
      { label: 'Very good', value: 85 },
      { label: 'Good', value: 70 },
      { label: 'Fair', value: 40 },
      { label: 'Poor', value: 20 },
    ],
  },
  {
    id: 'q2',
    section: 'Physical Health',
    question: 'Are you limited in moderate physical activities (e.g., moving a table)?',
    options: [
      { label: 'Not limited at all', value: 100 },
      { label: 'Limited a little', value: 60 },
      { label: 'Limited a lot', value: 20 },
    ],
  },
  {
    id: 'q3',
    section: 'Physical Health',
    question: 'Are you limited in climbing stairs or doing similar daily physical efforts?',
    options: [
      { label: 'Not limited at all', value: 100 },
      { label: 'Limited a little', value: 60 },
      { label: 'Limited a lot', value: 20 },
    ],
  },
  {
    id: 'q4',
    section: 'Physical Health',
    question: 'Does pain interfere with your normal work or daily activities?',
    options: [
      { label: 'Not at all', value: 100 },
      { label: 'A little', value: 70 },
      { label: 'Moderately', value: 40 },
      { label: 'Quite a bit', value: 20 },
      { label: 'Extremely', value: 10 },
    ],
  },

  // Section 2: Role Limitation Due to Physical Health
  {
    id: 'q5',
    section: 'Functional Limitations',
    question: 'Due to physical health, have you reduced time spent on work or daily activities?',
    options: [
      { label: 'Not at all', value: 100 },
      { label: 'A little', value: 70 },
      { label: 'Moderately', value: 40 },
      { label: 'Quite a bit', value: 20 },
      { label: 'Extremely', value: 10 },
    ],
  },
  {
    id: 'q6',
    section: 'Functional Limitations',
    question: 'Due to physical health, have you accomplished less than you would like?',
    options: [
      { label: 'Not at all', value: 100 },
      { label: 'A little', value: 70 },
      { label: 'Moderately', value: 40 },
      { label: 'Quite a bit', value: 20 },
      { label: 'Extremely', value: 10 },
    ],
  },
  {
    id: 'q7',
    section: 'Functional Limitations',
    question: 'Due to emotional health, have you reduced time spent on work or daily activities?',
    options: [
      { label: 'Not at all', value: 100 },
      { label: 'A little', value: 70 },
      { label: 'Moderately', value: 40 },
      { label: 'Quite a bit', value: 20 },
      { label: 'Extremely', value: 10 },
    ],
  },
  {
    id: 'q8',
    section: 'Functional Limitations',
    question: 'Due to emotional health, have you accomplished less than you would like?',
    options: [
      { label: 'Not at all', value: 100 },
      { label: 'A little', value: 70 },
      { label: 'Moderately', value: 40 },
      { label: 'Quite a bit', value: 20 },
      { label: 'Extremely', value: 10 },
    ],
  },

  // Section 3: Energy and Emotional Well-being
  {
    id: 'q9',
    section: 'Energy & Mood',
    question: 'How much of the time do you feel calm and peaceful?',
    options: [
      { label: 'All of the time', value: 100 },
      { label: 'Most of the time', value: 80 },
      { label: 'Some of the time', value: 50 },
      { label: 'A little of the time', value: 20 },
      { label: 'None of the time', value: 10 },
    ],
  },
  {
    id: 'q10',
    section: 'Energy & Mood',
    question: 'How much of the time do you feel energetic and vigorous?',
    options: [
      { label: 'All of the time', value: 100 },
      { label: 'Most of the time', value: 80 },
      { label: 'Some of the time', value: 50 },
      { label: 'A little of the time', value: 20 },
      { label: 'None of the time', value: 10 },
    ],
  },
  {
    id: 'q11',
    section: 'Energy & Mood',
    question: 'How often do you feel downhearted or low in mood?',
    options: [
      { label: 'None of the time', value: 100 },
      { label: 'A little of the time', value: 80 },
      { label: 'Some of the time', value: 50 },
      { label: 'Most of the time', value: 20 },
      { label: 'All of the time', value: 10 },
    ],
  },

  // Section 4: Social & Mental Well-being (WHO-5 Style)
  {
    id: 'q12',
    section: 'Mental Well-being',
    question: 'I have felt cheerful and in good spirits',
    options: [
      { label: 'At no time', value: 10 },
      { label: 'Some of the time', value: 30 },
      { label: 'Less than half of the time', value: 50 },
      { label: 'More than half of the time', value: 70 },
      { label: 'Most of the time', value: 90 },
      { label: 'All of the time', value: 100 },
    ],
  },
  {
    id: 'q13',
    section: 'Mental Well-being',
    question: 'I have felt calm and relaxed',
    options: [
      { label: 'At no time', value: 10 },
      { label: 'Some of the time', value: 30 },
      { label: 'Less than half of the time', value: 50 },
      { label: 'More than half of the time', value: 70 },
      { label: 'Most of the time', value: 90 },
      { label: 'All of the time', value: 100 },
    ],
  },
  {
    id: 'q14',
    section: 'Mental Well-being',
    question: 'I have felt active and vigorous',
    options: [
      { label: 'At no time', value: 10 },
      { label: 'Some of the time', value: 30 },
      { label: 'Less than half of the time', value: 50 },
      { label: 'More than half of the time', value: 70 },
      { label: 'Most of the time', value: 90 },
      { label: 'All of the time', value: 100 },
    ],
  },
  {
    id: 'q15',
    section: 'Mental Well-being',
    question: 'I woke up feeling fresh and rested',
    options: [
      { label: 'At no time', value: 10 },
      { label: 'Some of the time', value: 30 },
      { label: 'Less than half of the time', value: 50 },
      { label: 'More than half of the time', value: 70 },
      { label: 'Most of the time', value: 90 },
      { label: 'All of the time', value: 100 },
    ],
  },
  {
    id: 'q16',
    section: 'Mental Well-being',
    question: 'My daily life feels interesting and meaningful',
    options: [
      { label: 'At no time', value: 10 },
      { label: 'Some of the time', value: 30 },
      { label: 'Less than half of the time', value: 50 },
      { label: 'More than half of the time', value: 70 },
      { label: 'Most of the time', value: 90 },
      { label: 'All of the time', value: 100 },
    ],
  },
];
