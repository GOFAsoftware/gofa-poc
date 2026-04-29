import Link from "next/link";

const proofPoints = [
  {
    value: "5-10 min",
    label: "to complete rapid screening journeys",
  },
  {
    value: "1 platform",
    label: "for screening, engagement, and follow-up visibility",
  },
  {
    value: "3 layers",
    label: "Connect for operators, 1Care for members, SilverCare for aging journeys",
  },
];

const customerCards = [
  {
    title: "Insurers",
    summary:
      "Turn wellness and screening into a visible member benefit, with measurable participation and earlier identification of higher-risk groups.",
    points: [
      "Improve policyholder engagement with branded digital journeys",
      "Use rewards and habit loops to lift repeat participation",
      "Surface outreach priorities before claims or acute events escalate",
    ],
  },
  {
    title: "Hospitals & clinics",
    summary:
      "Standardize intake, pre-assessment, and triage so frontline teams spend less time collecting information and more time intervening.",
    points: [
      "Digitize onboarding and assessment capture across locations",
      "View frailty, fall risk, and health-factor signals in one workflow",
      "Support referral, follow-up, and service coordination from one command center",
    ],
  },
  {
    title: "NGOs & eldercare operators",
    summary:
      "Run community or long-term care programs with a clearer picture of participant readiness, risk mix, and immediate outreach needs.",
    points: [
      "Segment participants by status, age profile, and assessment completion",
      "Bring care managers, invitations, and reporting into one workspace",
      "Extend support into mobile member journeys for ongoing engagement",
    ],
  },
];

const platformLayers = [
  {
    name: "GOFA Connect",
    role: "Operator command center",
    description:
      "For care managers and client administrators who need oversight across participant lists, risk mix, invitations, and action queues.",
  },
  {
    name: "1Care",
    role: "Member engagement layer",
    description:
      "For branded wellness programs, habit-building, rewards, and AI-guided services that make prevention feel like an everyday benefit.",
  },
  {
    name: "SilverCare",
    role: "Healthy aging journey",
    description:
      "For older adults and care ecosystems focused on fall risk, frailty, mobility, and continuous support beyond one-off assessment events.",
  },
];

const sectorCards = [
  {
    id: "01",
    title: "Screen early",
    description:
      "Capture health risk factors, frailty, fall risk, mobility, and other preventive signals through guided digital flows.",
  },
  {
    id: "02",
    title: "Stratify clearly",
    description:
      "Convert raw assessment activity into care signals such as urgent outreach, higher-risk cohorts, and assessment coverage gaps.",
  },
  {
    id: "03",
    title: "Engage continuously",
    description:
      "Use rewards, member experiences, AI assistance, and targeted follow-up to keep people participating between clinical touchpoints.",
  },
  {
    id: "04",
    title: "Operate efficiently",
    description:
      "Give internal teams a single branded workspace for invitations, analytics, participant views, and service coordination.",
  },
];

const modules = [
  "Health risk factor screening",
  "Fall risk and frailty journeys",
  "MSK and movement assessments",
  "Cognitive and healthy aging pathways",
  "Member engagement, rewards, and habit loops",
  "Operational dashboards and participant management",
];

export default function Home() {
  return (
    <div className="page-grid min-h-screen overflow-hidden">
      <nav className="sticky top-0 z-20 border-b border-[var(--color-line)] bg-[rgba(252,248,242,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-accent-strong)] text-sm font-extrabold tracking-[0.18em] text-white">
              GOFA
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-[0.08em] text-[var(--color-foreground)] uppercase">
                GOFA Biz Solution
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-[rgba(23,33,33,0.6)]">
                Preventive health engagement platform
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm font-semibold text-[rgba(23,33,33,0.72)] md:flex">
            <a
              href="#solution"
              className="transition-colors hover:text-[var(--color-foreground)]"
            >
              Solution
            </a>
            <a
              href="#buyers"
              className="transition-colors hover:text-[var(--color-foreground)]"
            >
              Buyers
            </a>
            <a
              href="#journey"
              className="transition-colors hover:text-[var(--color-foreground)]"
            >
              Journey
            </a>
            <Link
              href="/insights"
              className="transition-colors hover:text-[var(--color-foreground)]"
            >
              Insights
            </Link>
            <a
              href="#demo"
              className="transition-colors hover:text-[var(--color-foreground)]"
            >
              Demo
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
          <div className="absolute left-4 top-20 h-40 w-40 rounded-full bg-[rgba(198,125,78,0.18)] blur-3xl" />
          <div className="absolute right-0 top-16 h-56 w-56 rounded-full bg-[rgba(15,118,110,0.18)] blur-3xl" />

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[rgba(255,250,243,0.82)] px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-[var(--color-accent-strong)]">
                AI-powered digital health engagement platform
              </div>

              <h1 className="font-display max-w-4xl text-5xl leading-[0.96] font-semibold text-[var(--color-foreground)] sm:text-6xl lg:text-[5.7rem]">
                Help insurers and healthcare teams move from screening events to continuous preventive care.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[rgba(23,33,33,0.78)] sm:text-xl">
                GOFA Biz Solution combines rapid assessment journeys, member engagement experiences, and operational visibility in one client-brandable platform. It is built for organizations that need to identify risk earlier, explain value more clearly, and coordinate follow-up without fragmented workflows.
              </p>

              <div className="mt-10">
                <Link
                  href="/health-index/1care"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--color-accent-strong)] px-7 text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Start health assessment
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {proofPoints.map((item) => (
                  <div
                    key={item.label}
                    className="soft-panel rounded-[1.75rem] border border-[var(--color-line)] p-5 shadow-[0_25px_70px_-45px_rgba(23,33,33,0.4)]"
                  >
                    <p className="text-2xl font-extrabold text-[var(--color-accent-strong)]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[rgba(23,33,33,0.72)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-panel relative rounded-[2rem] border border-[var(--color-line)] p-6 shadow-[0_30px_90px_-50px_rgba(23,33,33,0.45)] lg:p-8">
              <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                    Command center snapshot
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-[var(--color-foreground)]">
                    See engagement, adoption, and care signals at a glance.
                  </h2>
                </div>
                <div className="rounded-full bg-[var(--color-highlight-soft)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-highlight)]">
                  Live view
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Assessment coverage", "78%"],
                  ["Immediate outreach", "24"],
                  ["Higher-risk cohort", "19%"],
                  ["Average age", "67"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/60 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[rgba(23,33,33,0.52)]">
                      {label}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-[var(--color-foreground)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-[var(--color-line)] bg-[rgba(15,118,110,0.08)] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                      Risk story
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[rgba(23,33,33,0.74)]">
                      Identify who needs urgent intervention, who needs guided engagement, and where onboarding has stalled.
                    </p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(15,118,110,0.2)] bg-white text-xl font-extrabold text-[var(--color-accent-strong)]">
                    24h
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <div className="h-2 flex-1 rounded-full bg-[var(--color-accent-strong)]" />
                  <div className="h-2 w-20 rounded-full bg-[rgba(15,118,110,0.38)]" />
                  <div className="h-2 w-14 rounded-full bg-[rgba(198,125,78,0.6)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="section-divider h-px w-full" />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                Why this matters
              </p>
              <h2 className="font-display mt-4 text-4xl leading-tight text-[var(--color-foreground)] sm:text-5xl">
                Decision-makers need more than a screening tool.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Clinical credibility",
                  description:
                    "Assessment and reporting journeys are designed for real preventive use cases including frailty, fall risk, mobility, and healthy aging.",
                },
                {
                  title: "Member value people understand",
                  description:
                    "Turn prevention into a visible service with guided onboarding, wellness journeys, and engagement loops rather than one-off campaigns.",
                },
                {
                  title: "Operational control",
                  description:
                    "Give teams a unified workspace for participant lists, outreach priorities, invitations, and program visibility across client ecosystems.",
                },
                {
                  title: "Client-brandable deployment",
                  description:
                    "Adapt the experience for insurer, clinic, NGO, or healthy aging programs without rebuilding the underlying workflow stack.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="soft-panel rounded-[1.75rem] border border-[var(--color-line)] p-6"
                >
                  <h3 className="text-xl font-bold text-[var(--color-foreground)]">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[rgba(23,33,33,0.74)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="buyers" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-highlight)]">
                Built for buyers
              </p>
              <h2 className="font-display mt-4 text-4xl leading-tight text-[var(--color-foreground)] sm:text-5xl">
                Clear value for insurers, healthcare groups, and care operators.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[rgba(23,33,33,0.72)]">
              The same platform can support member-facing wellness experiences, frontline assessment intake, and operator dashboards. The difference is not just branding. It is the ability to connect engagement with action.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {customerCards.map((card) => (
              <article
                key={card.title}
                className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-7 shadow-[0_25px_70px_-50px_rgba(23,33,33,0.35)]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                  {card.title}
                </p>
                <p className="mt-4 text-lg leading-8 text-[var(--color-foreground)]">
                  {card.summary}
                </p>
                <div className="mt-6 space-y-3">
                  {card.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-highlight)]" />
                      <p className="text-sm leading-6 text-[rgba(23,33,33,0.74)]">{point}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-accent-strong)] p-8 text-white shadow-[0_30px_100px_-55px_rgba(23,33,33,0.6)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[rgba(255,255,255,0.65)]">
                Platform architecture
              </p>
              <h2 className="font-display mt-4 text-4xl leading-tight text-white">
                One backbone, three ways to deliver value.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[rgba(255,255,255,0.78)]">
                GOFA works because it does not force you to choose between an operator console and a member experience. It gives you both, connected by the same preventive health logic.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {modules.map((module) => (
                  <span
                    key={module}
                    className="rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)] px-4 py-2 text-sm text-[rgba(255,255,255,0.88)]"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              {platformLayers.map((layer) => (
                <div
                  key={layer.name}
                  className="soft-panel rounded-[1.75rem] border border-[var(--color-line)] p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--color-foreground)]">{layer.name}</h3>
                      <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-highlight)]">
                        {layer.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-7 text-[rgba(23,33,33,0.74)]">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
              End-to-end journey
            </p>
            <h2 className="font-display mt-4 text-4xl leading-tight text-[var(--color-foreground)] sm:text-5xl">
              A landing page story that makes the product immediately understandable.
            </h2>
            <p className="mt-5 text-base leading-8 text-[rgba(23,33,33,0.74)]">
              The strongest GOFA story is simple: screen early, understand who needs support, keep people engaged, and give operators a clearer action model. That is what buyers need to see within the first minute.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sectorCards.map((step) => (
              <div
                key={step.id}
                className="soft-panel rounded-[2rem] border border-[var(--color-line)] p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-highlight-soft)] text-lg font-extrabold text-[var(--color-highlight)]">
                  {step.id}
                </div>
                <h3 className="mt-5 text-2xl font-bold text-[var(--color-foreground)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[rgba(23,33,33,0.74)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" className="mx-auto max-w-7xl px-6 pb-24 pt-10 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-[var(--color-line)] bg-[rgba(255,250,243,0.86)] p-8 shadow-[0_30px_100px_-55px_rgba(23,33,33,0.45)]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                  Demo entry points
                </p>
                <h2 className="font-display mt-4 text-4xl leading-tight text-[var(--color-foreground)]">
                  Show the buyer the flow, not just the promise.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(23,33,33,0.74)]">
                  This POC already includes onboarding and screening experiences. Use them in meetings to demonstrate how GOFA can support intake, rapid risk capture, and member-facing engagement without forcing stakeholders to imagine the workflow.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/connect/health-risk-factor-assessments"
                    className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--color-accent-strong)] px-7 text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Open screening journey
                  </Link>
                  <Link
                    href="/onboarding"
                    className="inline-flex h-14 items-center justify-center rounded-full border border-[var(--color-line-strong)] px-7 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-foreground)] transition-colors hover:bg-white"
                  >
                    Open onboarding journey
                  </Link>
                  <Link
                    href="/insights"
                    className="inline-flex h-14 items-center justify-center rounded-full border border-[var(--color-line-strong)] px-7 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-foreground)] transition-colors hover:bg-white"
                  >
                    Open insights hub
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-foreground)] p-8 text-white shadow-[0_30px_100px_-55px_rgba(23,33,33,0.7)]">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[rgba(255,255,255,0.58)]">
                Best fit conversations
              </p>
              <div className="mt-5 space-y-5">
                {[
                  "Insurer wellness and policyholder engagement programs",
                  "Hospital, clinic, and screening center intake modernization",
                  "NGO or community healthy aging pathways",
                  "Frailty, fall-risk, and functional health outreach initiatives",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-highlight)]" />
                    <p className="text-base leading-7 text-[rgba(255,255,255,0.82)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-line)] bg-[rgba(23,33,33,0.96)] py-10 text-[rgba(255,255,255,0.72)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="font-display text-2xl text-white">GOFA Biz Solution</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgba(255,255,255,0.62)]">
              A preventive health engagement platform for organizations that need clearer risk visibility and better member participation.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.16em] text-[rgba(255,255,255,0.68)]">
            <a href="#solution">Solution</a>
            <a href="#buyers">Buyers</a>
            <a href="#journey">Journey</a>
            <Link href="/insights">Insights</Link>
            <a href="#demo">Demo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
