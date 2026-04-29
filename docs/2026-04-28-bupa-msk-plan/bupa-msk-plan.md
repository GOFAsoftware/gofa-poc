# Blua MSK Health Programme — End-to-End Digital Journey
## Implementation Plan (GOFA × Bupa)
**Date:** 28 April 2026

---

## What GOFA Already Has ✅

| Capability | Detail | Status |
|---|---|---|
| AI MSK Assessment | Shoulder, low-back, knee — pose detection + surveys + risk scoring | ✅ Live |
| Risk Level Engine | LOW / MODERATE / HIGH / VERY_HIGH per body part | ✅ Live |
| Pain Review (in-assessment) | Sliding-bar pain questionnaire post-movement | ✅ Live |
| PDF Report Export | `/msk/assessment/[id]/export-pdf` with locale support | ✅ Live |
| AI Training Model | `mskAssessment` as input in `ai-training.ts` risk tier pipeline | ✅ Live |
| AI-Guided Exercise Delivery | AI Move, lesson plans, warmup/main/cooldown blocks | ✅ Live |
| Progress Tracking | `PlanPlay`, `formScore`, `poseAccuracy`, compliance % in Firestore | ✅ Live |
| Multi-Tenant Infrastructure | `bupa.gofa.app` subdomain, `customToken` auth, `mskSettings` on Client doc | ✅ Live |

---

## Gaps vs. Diagram — Summary

| Diagram Stage | Gap |
|---|---|
| Stage 2 – Triage | No dedicated triage screen routing users to 3 pathways |
| Stage 2 – Booking | No Bupa clinic booking CTA/integration |
| Stage 4 – Recurring check-in | No standalone weekly pain check-in (only in-assessment today) |
| Stage 4 – Weekly review | No weekly progress review screen |
| Stage 4 – Progress dashboard | No MSK-specific before/after trend chart |
| Stage 5 – Outcome report | No 3-month before/after outcome report |

---

## Implementation Phases

### Phase 1 — Bupa Tenant Setup
**Owner:** GOFA | **Effort:** 1–2 days

1. Configure `bupa` Client doc in Firestore: enable `mskSettings`, set `primaryColor` (Bupa blue), define `programmeDurationWeeks: 12`
2. Verify `bupa.gofa.app` subdomain routing, branding, and MSK home page renders correctly

---

### Phase 2 — Triage Screen
**Owner:** GOFA | **Effort:** 3–5 days

3. Build post-assessment **Triage Result Page** at `/msk/assessment/[id]/triage` mapping `MskRiskLevel` to 3 pathways:

| Risk Level | Action | Next Step |
|---|---|---|
| Low | "Start GOFA Rehab Programme" | Auto-assign MSK lesson plan |
| Medium | Rehab Programme + "Book Check-in" | Bupa booking URL (deep-link) |
| High / Very High | "Recommend Clinic / Physio / Doctor" | Bupa booking URL (deep-link) |

4. Add `triageAction` field to `MSKAssessmentResult` model to record which pathway was taken
5. Track triage funnel in Firebase Analytics

---

### Phase 3 — MSK Rehab Programme (12-Week Journey)
**Owner:** GOFA | **Effort:** 1–2 weeks

6. Create **12-week MSK lesson plan templates** in Firestore (per body part × risk tier — Low, Medium, High — with warmup/rehab/cooldown blocks), reusing existing exercise content
7. Auto-create `PlanPlay` linked to `mskAssessmentResultId` when user accepts the "Start Rehab" CTA
8. Build **standalone weekly pain/discomfort check-in** — lightweight slider (0–10 NRS scale), stored as a timestamped subcollection on `MSKAssessmentResult`
9. Build **weekly review screen** — shows sessions completed, pain trend chart, and surfaces "You're on track / Seek help" prompt if pain increases ≥2 points

---

### Phase 4 — Progress Dashboard
**Owner:** GOFA | **Effort:** 1 week

10. Build **MSK Rehab Dashboard** page (`/msk/rehab/dashboard`):
    - Exercise compliance % (from `PlanPlay`)
    - Movement quality trend (from `formScore` / `poseAccuracy`)
    - Weekly pain score chart (from check-in subcollection)
    - Mobility improvement indicator
11. Add in-app/push notification hooks for weekly review reminder at Day 7 cadence

---

### Phase 5 — 3-Month Outcome Report
**Owner:** GOFA | **Effort:** 3–5 days

12. Build **Outcome Report** (`/msk/outcome-report/[id]`):
    - Before/After table: MSK score, pain score (NRS), mobility score, compliance %
    - Recommendation section ("Continue Rehab / Book Follow-up / Explore Other Programmes")
    - Export as PDF (reuse existing Puppeteer-based export pipeline)
13. Surface **Re-assessment CTA** at Week 12 to collect "After" data and close the feedback loop

---

## What Bupa Must Provide

| Item | Urgency | Why Needed |
|---|---|---|
| **Clinic/physio booking URL or API** | High | Triage CTA for Medium/High risk users — "Book Appointment" |
| **Member enrollment flow** | High | How Bupa pushes members into the MSK journey (GOFA `customToken` auth already works) |
| **Programme definition sign-off** | High | Confirm 12-week duration, weekly check-in cadence, pain escalation thresholds |
| **Branding assets** | Medium | Logo + Bupa blue hex code (for `primaryColor` on Client doc) |
| **Clinical back-channel (optional)** | Low | If doctor prescription should auto-assign a specific rehab plan → Bupa webhook to GOFA API |
| **FCM/notification consent (optional)** | Low | Needed only if delivering push notifications via a native Flutter wrapper |

> **Note:** Stage 3 (Clinic / Doctor workflow) is entirely Bupa's system. GOFA's role is limited to generating the PDF report for the doctor and providing the booking CTA.

---

## Key Files (gofa-web-nextjs)

**Modify:**
- `src/app/(main)/msk/home/page.tsx` — reads `mskSettings`, entry point
- `src/models/msk-assessment-result.ts` — add `triageAction` field
- `src/components/msk/assessment-report/types.ts` — risk level types (reuse in triage)

**Create (new routes):**
- `src/app/(main)/msk/assessment/[id]/triage/page.tsx`
- `src/app/(main)/msk/rehab/dashboard/page.tsx`
- `src/app/(main)/msk/rehab/check-in/page.tsx`
- `src/app/(main)/msk/outcome-report/[id]/page.tsx`

---

## Indicative Timeline

| Week | Milestone |
|---|---|
| Week 1 | Tenant setup + Triage screen (Phases 1–2) |
| Week 2–3 | 12-week lesson plans + auto-assignment + check-in (Phase 3) |
| Week 4 | Progress dashboard (Phase 4) |
| Week 5 | Outcome report + re-assessment CTA (Phase 5) |
| Week 6 | UAT with Bupa, polish, go-live |

---

*Prepared by GOFA — 28 April 2026*
