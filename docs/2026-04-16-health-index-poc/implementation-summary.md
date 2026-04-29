# GOFA Health Index PoC

A lightweight proof-of-concept demonstrating how a baseline health profile and ongoing engagement behaviors can shape a dynamic Health Index over time.

## Overview

This PoC is designed for:
- Insurer demos
- Broker presentations  
- Internal concept validation
- Discussion with clinical advisors

## Flow

1. **Entry Page** (`/health-index`) - Introduction and navigation
2. **Baseline Quiz** (`/health-index/quiz`) - 16-question assessment covering physical health, functional abilities, and mental well-being
3. **Baseline Results** (`/health-index/results`) - Displays Baseline Health Index and domain breakdown
4. **Engagement Dashboard** (`/health-index/dashboard`) - Simulate engagement actions and see Health Index updates in real-time
5. **Demo Admin View** (`/health-index/demo`) - Sample users showing various engagement scenarios

## Key Features

### Baseline Health Index Calculation
- **Physical Health Dimension** (40% weight) - Q1-Q4: General health, exercise limitations, pain
- **Functional Health Dimension** (30% weight) - Q5-Q8: Work/activity limitations due to physical/emotional health
- **Mental Well-being Dimension** (30% weight) - Q9-Q16: Energy, mood, WHO-5 style well-being questions

### Engagement Actions
Positive actions that increase Health Index:
- Complete AI Move (+2)
- Log Healthy Meal (+1)
- Meet Hydration Goal (+1)
- Log Good Sleep (+2)
- Reach Step Goal (+1)
- Complete Weekly Consistency (+3)

Negative actions (optional) that decrease Health Index:
- No Exercise Today (-1)
- Poor Sleep (-2)
- Low Hydration (-1)

### Health Index Anchoring
- **Baseline Health Index**: Fixed anchor point from quiz (0-100)
- **Current Health Index**: Baseline + engagement adjustments (0-100)
- **Health Index Change**: Shows trend from baseline with visual indicators

## Technical Architecture

### Directory Structure
```
/app/health-index/
  ├── page.tsx                    # Entry page
  ├── quiz/page.tsx              # Baseline quiz
  ├── results/page.tsx           # Baseline results
  ├── dashboard/page.tsx         # Engagement dashboard
  └── demo/page.tsx              # Sample users admin view

/lib/health-index/
  ├── types.ts                   # TypeScript interfaces
  ├── questions.ts               # Quiz questions data
  ├── scoring.ts                 # Health Index calculation logic
  ├── useHealthIndexPoc.ts       # Custom hook for state management
  └── index.ts                   # Barrel export
```

### State Management
The PoC uses a simple custom hook (`useHealthIndexPoc`) that persists state to localStorage:
```typescript
const { state, currentAnswers, addQuizAnswer, completeBaselineQuiz, addEngagementEvent, resetDemo } = useHealthIndexPoc();
```

### Data Persistence
All state is stored in `localStorage` under `health-index-poc` key for demo continuity.

## Scoring Logic

### Baseline Health Index Calculation
```
Health Index = (Physical × 40%) + (Functional × 30%) + (Mental × 30%)
```

Each dimension is calculated as the average of its constituent questions, using numeric values from answer options.

### Current Health Index
```
Current = Baseline + Engagement Points
Range: 0-100 (with guardrails)
```

## Engagement Simulation

The dashboard allows users to:
1. Click engagement action buttons
2. See immediate Health Index updates
3. View activity log with timestamps
4. Track engagement by domain
5. Understand how consistency matters

## UI/UX Notes

- **Health Index (not Score)**: Consistently uses "Health Index" terminology; avoids "score"
- **Wellness-oriented language**: Non-diagnostic, focused on engagement and trends
- **Visual hierarchy**: Baseline vs Current clearly distinguished
- **Mobile responsive**: Works on devices using Tailwind CSS
- **Accessible**: Clear contrast, readable fonts, semantic structure

## Disclaimers

The PoC includes prominent disclaimers that:
- This is for wellness engagement and monitoring, NOT medical diagnosis
- It demonstrates a concept, not a clinical tool
- It is not a substitute for professional medical advice

## Extending the PoC

Future enhancements could include:
- Real integration with GOFA modules (AI Move, Meal Snap, etc.)
- Multi-user comparison views
- More sophisticated scoring algorithms
- Historical trend analysis
- Intervention recommendations
- Export/reporting capabilities

## Running the PoC

```bash
cd gofa-poc
bun install
bun dev
```

Then navigate to `http://localhost:3000/health-index`
