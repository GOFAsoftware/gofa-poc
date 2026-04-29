import type { Metadata } from "next";
import Link from "next/link";
import {
  assessmentCounts,
  challengePartnerStats,
  engagementInsights,
  functionalTests,
  labels,
  overview,
  rehabGuidance,
  repoSourceNotes,
  riskLevelTextMap,
  silverCarePlayers,
} from "./repo-backed-data";

const topMetrics = [
  {
    label: "Total linked players",
    value: String(overview.totalLinkedPlayers),
    detail: "Field name matches /analytics/overview in GOFA B2B.",
  },
  {
    label: "Needs active support",
    value: String(overview.highRiskCount),
    detail: "Higher-risk participants requiring guided follow-up.",
  },
  {
    label: "Urgent attention",
    value: String(overview.urgentAttentionCount),
    detail: "Very-high-risk cohort from the real risk distribution model.",
  },
  {
    label: "Assessment coverage",
    value: `${overview.assessmentCompletionRate}%`,
    detail: `${overview.assessmentCompletedCount} of ${overview.totalLinkedPlayers} linked players have completed at least one assessment.`,
  },
];

const assessmentCards = [
  {
    title: labels.assessmentCounts,
    summary: "Real assessment categories and status model from the GOFA B2B analytics route.",
    rows: [
      { label: "Fall Risk", value: assessmentCounts.fallRisk },
      { label: "Cognitive", value: assessmentCounts.cognitive },
      { label: "MSK", value: assessmentCounts.msk },
    ],
  },
];

const riskMixRows = [
  { label: "Low", count: overview.riskDistribution.level1, accent: "bg-emerald-500" },
  { label: "Intermediate", count: overview.riskDistribution.level2, accent: "bg-amber-400" },
  { label: "High", count: overview.riskDistribution.level3, accent: "bg-orange-500" },
  { label: "Very High", count: overview.riskDistribution.level4, accent: "bg-rose-500" },
];

const engagementCards = [
  {
    title: labels.aiMove,
    desc: "Exercise sessions and completed movement work.",
    metrics: [
      { label: "Active users", value: String(engagementInsights.aiMove.activeUsers) },
      { label: "Completed sessions", value: String(engagementInsights.aiMove.completedSessions) },
      { label: "Total reps", value: String(engagementInsights.aiMove.totalReps) },
    ],
  },
  {
    title: labels.aiTraining,
    desc: "Plan-based routine runs and calories burned.",
    metrics: [
      { label: "Active users", value: String(engagementInsights.aiTraining.activeUsers) },
      { label: "Completed runs", value: String(engagementInsights.aiTraining.completedRuns) },
      { label: "Total calories", value: String(engagementInsights.aiTraining.totalCaloriesBurned) },
    ],
  },
  {
    title: labels.lessons,
    desc: "Lesson participation and completion momentum.",
    metrics: [
      { label: "Active users", value: String(engagementInsights.lessons.activeUsers) },
      { label: "Total plays", value: String(engagementInsights.lessons.totalPlays) },
      { label: "Completed plays", value: String(engagementInsights.lessons.completedPlays) },
    ],
  },
];

export const metadata: Metadata = {
  title: "Insights | GOFA Biz Solution",
  description:
    "Repository-backed GOFA insights using real B2B analytics field names, partner channels, and SilverCare rehab guidance.",
};

function formatPercent(part: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function totalByOrigin(origin: string) {
  return (
    (assessmentCounts.fallRisk.byOrigin[origin]?.total ?? 0) +
    (assessmentCounts.cognitive.byOrigin[origin]?.total ?? 0) +
    (assessmentCounts.msk.byOrigin[origin]?.total ?? 0)
  );
}

const allOrigins = Object.keys({
  ...assessmentCounts.fallRisk.byOrigin,
  ...assessmentCounts.cognitive.byOrigin,
  ...assessmentCounts.msk.byOrigin,
});

export default function InsightsPage() {
  return (
    <div className="page-grid min-h-screen">
      <nav className="sticky top-0 z-20 border-b border-[var(--color-line)] bg-[rgba(252,248,242,0.84)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-accent-strong)] text-sm font-extrabold tracking-[0.18em] text-white">
              GOFA
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-[0.08em] text-[var(--color-foreground)] uppercase">
                Insights Hub
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-[rgba(23,33,33,0.6)]">
                Aggregate assessment and engagement results
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-[rgba(23,33,33,0.78)]">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--color-line)] px-5 transition-colors hover:bg-white"
            >
              Back to landing page
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-12 lg:px-10 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[rgba(255,250,243,0.84)] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
              Health insights + engagement insights
            </div>
            <h1 className="font-display max-w-4xl text-5xl leading-[0.96] font-semibold text-[var(--color-foreground)] sm:text-6xl">
              One page to access aggregate results using the real GOFA analytics model.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[rgba(23,33,33,0.76)]">
              This view now follows the actual field structure used in GOFA B2B analytics: overview metrics, risk mix, age profile, assessment counts by origin and client, engagement insights, challenge partner channels, and SilverCare rehab guidance for Fit PT style progression.
            </p>
          </div>

          <div className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-6 shadow-[0_30px_90px_-50px_rgba(23,33,33,0.4)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              {repoSourceNotes.title}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Last 90 days",
                labels.healthInsights,
                labels.engagementInsights,
                "SilverCare rehab guidance included",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 text-sm text-[rgba(23,33,33,0.78)]"
                >
                  {chip}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[rgba(23,33,33,0.72)]">
              {repoSourceNotes.detail}
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topMetrics.map((metric) => (
            <div
              key={metric.label}
              className="soft-panel rounded-[1.75rem] border border-[var(--color-line)] p-6 shadow-[0_25px_60px_-45px_rgba(23,33,33,0.35)]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[rgba(23,33,33,0.52)]">
                {metric.label}
              </p>
              <p className="mt-4 text-4xl font-extrabold text-[var(--color-accent-strong)]">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-[rgba(23,33,33,0.72)]">
                {metric.detail}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                {labels.riskMix}
              </p>
              <h2 className="font-display mt-3 text-4xl leading-tight text-[var(--color-foreground)]">
                Portfolio distribution using the overview API shape.
              </h2>
            </div>
            <div className="soft-panel rounded-[1.8rem] border border-[var(--color-line)] p-6">
              <div className="space-y-4">
                {riskMixRows.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-sm font-semibold text-[var(--color-foreground)]">
                      <span>{row.label}</span>
                      <span>
                        {row.count} / {overview.totalLinkedPlayers}
                      </span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-[rgba(23,33,33,0.08)]">
                      <div
                        className={`h-full rounded-full ${row.accent}`}
                        style={{ width: formatPercent(row.count, overview.totalLinkedPlayers) }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-[var(--color-line)] bg-white/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[rgba(23,33,33,0.48)]">
                    Average age
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-[var(--color-accent-strong)]">
                    {overview.averageAge}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-[var(--color-line)] bg-white/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[rgba(23,33,33,0.48)]">
                    {labels.assessmentCoverage}
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-[var(--color-foreground)]">
                    {overview.assessmentCompletionRate}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              {labels.ageProfile}
            </p>
            <div className="mt-5 space-y-4">
              {Object.entries(overview.ageDistribution).map(([band, count]) => (
                <div key={band} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-semibold text-[var(--color-foreground)]">{band}</div>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-[rgba(23,33,33,0.08)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-accent-strong)]"
                      style={{ width: formatPercent(count, overview.totalLinkedPlayers) }}
                    />
                  </div>
                  <div className="w-10 text-right text-sm text-[rgba(23,33,33,0.76)]">{count}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[var(--color-line)] bg-[rgba(15,118,110,0.08)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
                What changed
              </p>
              <p className="mt-3 text-sm leading-7 text-[rgba(23,33,33,0.74)]">
                The page no longer uses invented dashboard categories. It now renders the same concepts named in the GOFA repos: total linked players, needs active support, urgent attention, assessment coverage, risk mix, age profile, assessment counts by origin, engagement insights, and Bupa/Telly TV challenge channels.
              </p>
            </div>
          </div>
        </section>

        <section className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                {labels.assessmentCounts}
              </p>
              <h2 className="font-display mt-3 text-4xl leading-tight text-[var(--color-foreground)]">
                Real assessment types, real origin taxonomy.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[rgba(23,33,33,0.72)]">
              This section follows the actual assessment-counts route shape from GOFA B2B: fall risk, cognitive, and MSK totals with completed and incomplete counts, then breakdown by origin and client.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {assessmentCards[0].rows.map((row) => (
              <article
                key={row.label}
                className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/70 p-5"
              >
                <p className="text-2xl font-bold text-[var(--color-foreground)]">{row.label}</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[rgba(23,33,33,0.48)]">Total</p>
                    <p className="mt-2 text-3xl font-extrabold text-[var(--color-accent-strong)]">{row.value.total}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[rgba(23,33,33,0.48)]">Completed</p>
                    <p className="mt-2 text-3xl font-extrabold text-[var(--color-foreground)]">{row.value.completed}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[rgba(23,33,33,0.48)]">Incomplete</p>
                    <p className="mt-2 text-3xl font-extrabold text-[var(--color-highlight)]">{row.value.incomplete}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 overflow-x-auto rounded-[1.4rem] border border-[var(--color-line)] bg-white/70">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[var(--color-line)] bg-[rgba(255,250,243,0.9)] text-[rgba(23,33,33,0.64)]">
                <tr>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Origin</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Total</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Fall Risk</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Cognitive</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">MSK</th>
                </tr>
              </thead>
              <tbody>
                {allOrigins.map((origin) => (
                  <tr key={origin} className="border-b border-[var(--color-line)] last:border-b-0">
                    <td className="px-5 py-4 font-semibold text-[var(--color-foreground)]">
                      {labels.sourceOrigins[origin as keyof typeof labels.sourceOrigins] ?? origin}
                    </td>
                    <td className="px-5 py-4">{totalByOrigin(origin)}</td>
                    <td className="px-5 py-4">{assessmentCounts.fallRisk.byOrigin[origin]?.total ?? 0}</td>
                    <td className="px-5 py-4">{assessmentCounts.cognitive.byOrigin[origin]?.total ?? 0}</td>
                    <td className="px-5 py-4">{assessmentCounts.msk.byOrigin[origin]?.total ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                {labels.functionalTestReport}
              </p>
              <h2 className="font-display mt-3 text-4xl leading-tight text-[var(--color-foreground)]">
                Average performance by test and age band.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[rgba(23,33,33,0.72)]">
              Follows the health insights reporting model used in GOFA B2B, where overall averages exclude invalid zero values and highlight performance trend differences across age groups.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-[1.4rem] border border-[var(--color-line)] bg-white/70">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[var(--color-line)] bg-[rgba(255,250,243,0.9)] text-[rgba(23,33,33,0.64)]">
                <tr>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.16em]">Test</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.16em]">Overall</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.16em]">&lt;60</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.16em]">60-69</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.16em]">70-79</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.16em]">80+</th>
                </tr>
              </thead>
              <tbody>
                {functionalTests.map((row) => (
                  <tr key={row.label} className="border-b border-[var(--color-line)] last:border-b-0">
                    <td className="px-5 py-4 font-semibold text-[var(--color-foreground)]">
                      {row.label}
                      <span className="ml-2 text-xs font-normal uppercase tracking-[0.14em] text-[rgba(23,33,33,0.5)]">
                        {row.unit}
                      </span>
                      <p className="mt-1 text-xs font-normal leading-5 text-[rgba(23,33,33,0.56)]">
                        {row.description} · {row.threshold}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-[var(--color-accent-strong)]">{row.overallAvg}</td>
                    <td className="px-5 py-4">{row.ageUnder60}</td>
                    <td className="px-5 py-4">{row.age60to69}</td>
                    <td className="px-5 py-4">{row.age70to79}</td>
                    <td className="px-5 py-4">{row.age80plus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              {labels.engagementInsights}
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-[var(--color-foreground)]">
              AI Move, AI Training, lessons, and Fit PT style rehab guidance.
            </h2>
          </div>
          <div className="grid gap-5 xl:grid-cols-3">
            {engagementCards.map((card) => (
              <article
                key={card.title}
                className="soft-panel rounded-[1.8rem] border border-[var(--color-line)] p-6"
              >
                <h3 className="text-2xl font-bold text-[var(--color-foreground)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[rgba(23,33,33,0.72)]">{card.desc}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {card.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[rgba(23,33,33,0.48)]">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-2xl font-extrabold text-[var(--color-accent-strong)]">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-6 lg:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              Fit PT / rehab guidance
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-[var(--color-foreground)]">
              SilverCare progression logic for higher-need cohorts.
            </h2>
            <div className="mt-8 space-y-5">
              {rehabGuidance.map((partner) => (
                <div
                  key={partner.cohort}
                  className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/70 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[var(--color-foreground)]">{partner.cohort}</p>
                      <p className="mt-1 text-sm text-[rgba(23,33,33,0.66)]">Sourced from the SilverCare rehab center guidance component.</p>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-highlight)]">
                      Start with {partner.fitPtStart}
                    </p>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[rgba(23,33,33,0.48)]">
                        Progression
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[rgba(23,33,33,0.76)]">
                        {partner.progression}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[rgba(23,33,33,0.48)]">
                        Safety note
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[rgba(23,33,33,0.76)]">
                        {partner.safety}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-6 lg:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              Bupa and Telly TV channels
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-[var(--color-foreground)]">
              Partner challenge stats using the real challenge metric names.
            </h2>
            <div className="mt-8 overflow-x-auto rounded-[1.4rem] border border-[var(--color-line)] bg-white/70">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-[var(--color-line)] bg-[rgba(255,250,243,0.9)] text-[rgba(23,33,33,0.64)]">
                  <tr>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Source</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Total Plays</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Plays Ended</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Cancelled</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Pending</th>
                    <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Total Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {challengePartnerStats.map((row) => (
                    <tr key={row.source} className="border-b border-[var(--color-line)] last:border-b-0">
                      <td className="px-5 py-4 font-semibold text-[var(--color-foreground)]">{row.label}</td>
                      <td className="px-5 py-4">{row.totalPlays}</td>
                      <td className="px-5 py-4">{row.totalPlaysEnded}</td>
                      <td className="px-5 py-4">{row.totalPlaysCancelled}</td>
                      <td className="px-5 py-4">{row.totalPlaysPending}</td>
                      <td className="px-5 py-4">{row.totalRepsDone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                SilverCare player analytics
              </p>
              <h2 className="font-display mt-3 text-4xl leading-tight text-[var(--color-foreground)]">
                Sample cohort shaped like the real player analytics API.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[rgba(23,33,33,0.72)]">
              These rows use the actual field set exposed by the shared player analytics schema: name, age, riskLevelText, fallRiskPercentage, sarcopeniaRisk, lastAssessmentDate, and linkSource.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-[1.4rem] border border-[var(--color-line)] bg-white/70">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[var(--color-line)] bg-[rgba(255,250,243,0.9)] text-[rgba(23,33,33,0.64)]">
                <tr>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Name</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Age</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Risk</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Fall Risk %</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Physical Status</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Last Assessment</th>
                  <th className="px-5 py-4 font-bold uppercase tracking-[0.14em]">Link Source</th>
                </tr>
              </thead>
              <tbody>
                {silverCarePlayers.map((player) => (
                  <tr key={player.uid} className="border-b border-[var(--color-line)] last:border-b-0">
                    <td className="px-5 py-4 font-semibold text-[var(--color-foreground)]">{player.name}</td>
                    <td className="px-5 py-4">{player.age}</td>
                    <td className="px-5 py-4">{riskLevelTextMap[player.riskLevelText]}</td>
                    <td className="px-5 py-4">{player.fallRiskPercentage}%</td>
                    <td className="px-5 py-4">{player.sarcopeniaRisk}</td>
                    <td className="px-5 py-4">{formatDate(player.lastAssessmentDate)}</td>
                    <td className="px-5 py-4">{player.linkSource.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}