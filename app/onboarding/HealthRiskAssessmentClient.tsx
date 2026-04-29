"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardPlus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useMemo, useState } from "react";

type StepKey =
  | "identity"
  | "medical"
  | "lifestyle"
  | "mobility"
  | "vitals"
  | "review";

type RiskLevel = "低" | "中" | "高";

interface AssessmentData {
  personalInfo: {
    fullName: string;
    englishName: string;
    hkid: string;
    phone: string;
    birthDate: string;
    gender: string;
    district: string;
    maritalStatus: string;
    housingType: string;
    mobilityStatus: string;
  };
  medicalHistory: {
    sleep: string;
    hypertension: boolean;
    diabetes: boolean;
    coronaryHeartDisease: boolean;
    stroke: boolean;
    chronicPain: boolean;
  };
  lifestyle: {
    physicalActivity: string;
    smokingStatus: string;
    alcoholStatus: string;
    fruitsServingsPerDay: string;
    vegetablesServingsPerDay: string;
  };
  sarcf: {
    liftingCarrying: string;
    walkingAcrossRoom: string;
    transferring: string;
    climbingStairs: string;
    falls: string;
  };
  vitals: {
    bloodPressureSystolic: string;
    bloodPressureDiastolic: string;
    heartRate: string;
    bodyWeight: string;
    bodyHeight: string;
    waistCircumference: string;
    mood: string;
  };
}

const steps: Array<{
  key: StepKey;
  shortLabel: string;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    key: "identity",
    shortLabel: "登記",
    eyebrow: "第 1 步，共 6 步",
    title: "基本登記資料",
    description: "參考香港醫療機構初步登記欄位，先完成身份、聯絡及居住狀況資料。",
  },
  {
    key: "medical",
    shortLabel: "病史",
    eyebrow: "第 2 步，共 6 步",
    title: "病史與睡眠情況",
    description: "快速記錄常見慢性疾病、既往心腦血管病史，以及近期睡眠狀況。",
  },
  {
    key: "lifestyle",
    shortLabel: "生活",
    eyebrow: "第 3 步，共 6 步",
    title: "生活習慣篩查",
    description: "了解日常活動量、吸煙飲酒情況，以及基本飲食習慣。",
  },
  {
    key: "mobility",
    shortLabel: "活動",
    eyebrow: "第 4 步，共 6 步",
    title: "活動能力篩查",
    description: "以簡化 SARC-F 問題評估肌少症及跌倒風險相關活動能力。",
  },
  {
    key: "vitals",
    shortLabel: "指標",
    eyebrow: "第 5 步，共 6 步",
    title: "生理指標",
    description: "輸入最新血壓、心率、體重、身高及腰圍，完成基礎健康風險分析。",
  },
  {
    key: "review",
    shortLabel: "總覽",
    eyebrow: "第 6 步，共 6 步",
    title: "篩查總覽",
    description: "檢視摘要、風險提示及建議跟進方向，方便前線快速分流。",
  },
];

const districtOptions = [
  "中西區",
  "灣仔",
  "東區",
  "南區",
  "油尖旺",
  "深水埗",
  "九龍城",
  "黃大仙",
  "觀塘",
  "荃灣",
  "屯門",
  "元朗",
  "北區",
  "大埔",
  "沙田",
  "西貢",
  "葵青",
  "離島",
];

const initialData: AssessmentData = {
  personalInfo: {
    fullName: "",
    englishName: "",
    hkid: "",
    phone: "",
    birthDate: "",
    gender: "",
    district: "",
    maritalStatus: "",
    housingType: "",
    mobilityStatus: "",
  },
  medicalHistory: {
    sleep: "",
    hypertension: false,
    diabetes: false,
    coronaryHeartDisease: false,
    stroke: false,
    chronicPain: false,
  },
  lifestyle: {
    physicalActivity: "",
    smokingStatus: "",
    alcoholStatus: "",
    fruitsServingsPerDay: "2",
    vegetablesServingsPerDay: "2",
  },
  sarcf: {
    liftingCarrying: "",
    walkingAcrossRoom: "",
    transferring: "",
    climbingStairs: "",
    falls: "",
  },
  vitals: {
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    bodyWeight: "",
    bodyHeight: "",
    waistCircumference: "",
    mood: "",
  },
};

function getAge(birthDate: string): number | undefined {
  if (!birthDate) return undefined;
  const today = new Date();
  const birthday = new Date(birthDate);
  let age = today.getFullYear() - birthday.getFullYear();
  const monthOffset = today.getMonth() - birthday.getMonth();
  if (
    monthOffset < 0 ||
    (monthOffset === 0 && today.getDate() < birthday.getDate())
  ) {
    age -= 1;
  }
  return age;
}

function computeAssessment(data: AssessmentData) {
  const riskFactors: string[] = [];
  const recommendations: string[] = [];
  let score = 0;

  const age = getAge(data.personalInfo.birthDate);
  if (age && age >= 65) {
    score += 10;
    riskFactors.push("年齡 65 歲或以上");
  }

  if (
    data.personalInfo.mobilityStatus &&
    data.personalInfo.mobilityStatus !== "independent"
  ) {
    score += 15;
    riskFactors.push("需要助行或活動能力受限");
    recommendations.push("建議安排平衡力、步態或防跌評估。");
  }

  if (data.medicalHistory.hypertension) {
    score += 18;
    riskFactors.push("已知高血壓病史");
    recommendations.push("建議定期監測血壓並檢視藥物依從性。");
  }

  if (data.medicalHistory.diabetes) {
    score += 15;
    riskFactors.push("已知糖尿病病史");
    recommendations.push("建議跟進血糖控制及飲食指導。");
  }

  if (data.medicalHistory.coronaryHeartDisease || data.medicalHistory.stroke) {
    score += 24;
    riskFactors.push("曾有心腦血管疾病紀錄");
    recommendations.push("建議優先安排醫護人員作進一步臨床評估。");
  }

  if (data.medicalHistory.chronicPain) {
    score += 8;
    riskFactors.push("長期痛症可能影響功能狀態");
  }

  if (data.medicalHistory.sleep && data.medicalHistory.sleep !== "normal") {
    score += 6;
    riskFactors.push("近期睡眠質素欠佳");
  }

  if (data.lifestyle.physicalActivity === "low") {
    score += 12;
    riskFactors.push("身體活動量偏低");
    recommendations.push("可考慮安排漸進式步行或肌力訓練計劃。");
  }

  if (data.lifestyle.smokingStatus === "current") {
    score += 20;
    riskFactors.push("現時有吸煙習慣");
    recommendations.push("建議提供戒煙服務轉介資訊。");
  }

  if (data.lifestyle.alcoholStatus === "frequent") {
    score += 10;
    riskFactors.push("飲酒頻密");
  }

  const sarcfValues = Object.values(data.sarcf).map((value) => Number(value || 0));
  const sarcfScore = sarcfValues.reduce((sum, value) => sum + value, 0);
  if (sarcfScore >= 4) {
    score += 20;
    riskFactors.push(`SARC-F 分數偏高（${sarcfScore} 分）`);
    recommendations.push("建議跟進肌力、步速或跌倒風險篩查。");
  }

  const systolic = Number(data.vitals.bloodPressureSystolic || 0);
  const diastolic = Number(data.vitals.bloodPressureDiastolic || 0);
  const waist = Number(data.vitals.waistCircumference || 0);
  const weight = Number(data.vitals.bodyWeight || 0);
  const heightCm = Number(data.vitals.bodyHeight || 0);
  const bmi = weight && heightCm ? weight / (heightCm / 100) ** 2 : 0;

  if (systolic >= 140 || diastolic >= 90) {
    score += 15;
    riskFactors.push("血壓讀數偏高");
  }

  if (bmi >= 27) {
    score += 10;
    riskFactors.push(`BMI 偏高（${bmi.toFixed(1)}）`);
    recommendations.push("可考慮安排體重管理及營養諮詢。");
  }

  if (waist >= 90) {
    score += 8;
    riskFactors.push("腰圍偏高");
  }

  if (data.vitals.mood === "anxious" || data.vitals.mood === "depressed") {
    score += 6;
    riskFactors.push("情緒狀態值得留意");
    recommendations.push("如有需要，可安排情緒健康或社工支援跟進。");
  }

  const riskLevel: RiskLevel = score >= 60 ? "高" : score >= 30 ? "中" : "低";

  return {
    age,
    bmi: bmi ? bmi.toFixed(1) : "-",
    sarcfScore,
    score,
    riskLevel,
    riskFactors,
    recommendations,
  };
}

function fieldError(message: string | undefined) {
  if (!message) return null;
  return (
    <div className="mt-2 flex items-center gap-2 text-sm text-rose-700">
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  error,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-900">{label}</span>
      {hint ? <span className="mb-2 block text-xs text-slate-500">{hint}</span> : null}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`h-12 w-full rounded-2xl border px-4 text-sm text-slate-900 outline-none transition ${
          error
            ? "border-rose-300 bg-rose-50"
            : "border-slate-200 bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        }`}
      />
      {fieldError(error)}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  error,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  error?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-900">{label}</span>
      {hint ? <span className="mb-2 block text-xs text-slate-500">{hint}</span> : null}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-12 w-full rounded-2xl border px-4 text-sm text-slate-900 outline-none transition ${
          error
            ? "border-rose-300 bg-rose-50"
            : "border-slate-200 bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        }`}
      >
        <option value="">請選擇</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {fieldError(error)}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
        checked
          ? "border-emerald-500 bg-emerald-50 text-emerald-950"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      <span className="pr-4 text-sm font-semibold">{label}</span>
      <span
        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          checked ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        <Check className="h-4 w-4" />
      </span>
    </button>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

export default function HealthRiskAssessmentClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [started, setStarted] = useState(searchParams.get("stage") !== null);
  const [currentStep, setCurrentStep] = useState(() => {
    const stage = Number(searchParams.get("stage") || "1");
    return Number.isFinite(stage) && stage >= 1 && stage <= steps.length
      ? stage - 1
      : 0;
  });
  const [data, setData] = useState<AssessmentData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => computeAssessment(data), [data]);

  function updateStage(nextStep: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("stage", String(nextStep + 1));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function validateStep(stepIndex: number) {
    const nextErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!data.personalInfo.fullName) nextErrors.fullName = "請輸入中文姓名。";
      if (!data.personalInfo.phone) nextErrors.phone = "請輸入聯絡電話。";
      if (
        data.personalInfo.phone &&
        !/^\d{8}$/.test(data.personalInfo.phone.replace(/\s/g, ""))
      ) {
        nextErrors.phone = "請輸入 8 位數香港電話。";
      }
      if (!data.personalInfo.birthDate) nextErrors.birthDate = "請輸入出生日期。";
      if (!data.personalInfo.gender) nextErrors.gender = "請選擇性別。";
      if (!data.personalInfo.district) nextErrors.district = "請選擇居住地區。";
      if (!data.personalInfo.housingType) nextErrors.housingType = "請選擇居住情況。";
      if (!data.personalInfo.mobilityStatus) nextErrors.mobilityStatus = "請選擇活動能力狀況。";
    }

    if (stepIndex === 1 && !data.medicalHistory.sleep) {
      nextErrors.sleep = "請選擇近期睡眠情況。";
    }

    if (stepIndex === 2) {
      if (!data.lifestyle.physicalActivity) nextErrors.physicalActivity = "請選擇活動量。";
      if (!data.lifestyle.smokingStatus) nextErrors.smokingStatus = "請選擇吸煙狀況。";
      if (!data.lifestyle.alcoholStatus) nextErrors.alcoholStatus = "請選擇飲酒狀況。";
    }

    if (stepIndex === 3) {
      for (const key of Object.keys(data.sarcf) as Array<keyof AssessmentData["sarcf"]>) {
        if (!data.sarcf[key]) nextErrors[key] = "請回答此項問題。";
      }
    }

    if (stepIndex === 4) {
      if (!data.vitals.bloodPressureSystolic) nextErrors.bloodPressureSystolic = "請輸入收縮壓。";
      if (!data.vitals.bloodPressureDiastolic) nextErrors.bloodPressureDiastolic = "請輸入舒張壓。";
      if (!data.vitals.heartRate) nextErrors.heartRate = "請輸入心率。";
      if (!data.vitals.bodyWeight) nextErrors.bodyWeight = "請輸入體重。";
      if (!data.vitals.bodyHeight) nextErrors.bodyHeight = "請輸入身高。";
      if (!data.vitals.waistCircumference) nextErrors.waistCircumference = "請輸入腰圍。";
      if (!data.vitals.mood) nextErrors.mood = "請選擇情緒狀態。";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(currentStep)) return;
    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextStep);
    updateStage(nextStep);
  }

  function handleBack() {
    const nextStep = Math.max(currentStep - 1, 0);
    setCurrentStep(nextStep);
    setErrors({});
    updateStage(nextStep);
  }

  function startAssessment() {
    setStarted(true);
    setCurrentStep(0);
    updateStage(0);
  }

  function submitAssessment() {
    if (!validateStep(4)) {
      setCurrentStep(4);
      updateStage(4);
      return;
    }
    setSubmitted(true);
    setErrors({});
  }

  const activeStep = steps[currentStep];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8f7_0%,#e7f0ee_48%,#f7faf9_100%)] text-slate-900">
      {!started ? (
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)] md:p-12">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#0f766e,#10b981,#94a3b8)]" />
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-emerald-900">
              <Stethoscope className="h-4 w-4" />
              香港醫療健康快速篩查
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
              健康風險快速登記及初步篩查
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              以繁體中文及香港常用醫療登記欄位為基礎，方便醫護、社福或企業健康團隊於 3 至 5 分鐘內完成初步登記、風險篩查及分流建議。
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "繁體中文介面",
                "香港電話及地區欄位",
                "適合快速登記及初步分流",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={startAssessment}
                className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                開始登記
              </button>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                返回首頁
              </Link>
            </div>
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
              此表格為初步篩查用途，內容參考香港常見醫療登記及風險分流欄位設計，不構成正式醫療診斷或醫管局官方表格。
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:mt-0">
            {[
              {
                title: "先登記，後篩查",
                body: "將姓名、聯絡電話、地區及活動能力放在最前，方便前線快速確認身份及基本需要。",
              },
              {
                title: "貼近香港服務流程",
                body: "使用香港地區、8 位電話、繁體中文描述及常見健康風險分類，減少填寫阻力。",
              },
              {
                title: "專業但不繁複",
                body: "保留病史、生活習慣、SARC-F 及生理指標，兼顧快速 onboarding 與臨床參考價值。",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)] backdrop-blur">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950">
              <ArrowLeft className="h-4 w-4" />
              返回首頁
            </Link>
            <div className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold tracking-[0.24em] text-slate-500 shadow-sm">
              HK HEALTH INTAKE
            </div>
          </div>

          {!submitted ? (
            <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
              <aside className="rounded-[2rem] bg-[linear-gradient(180deg,#0f172a_0%,#134e4a_100%)] p-6 text-white shadow-[0_28px_80px_-40px_rgba(15,23,42,0.8)]">
                <p className="text-xs font-semibold tracking-[0.24em] text-emerald-200">快速篩查流程</p>
                <div className="mt-6 space-y-3">
                  {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isComplete = index < currentStep;
                    return (
                      <div key={step.key} className={`rounded-2xl border px-4 py-4 transition ${isActive ? "border-emerald-300 bg-white/10" : "border-white/10 bg-white/[0.03]"}`}>
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${isComplete ? "bg-emerald-300 text-slate-950" : isActive ? "bg-white text-emerald-900" : "bg-white/10 text-white"}`}>
                            {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{step.shortLabel}</p>
                            <p className="text-xs text-slate-300">{step.title}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200">
                  建議由登記職員或護理團隊陪同填寫，特別適合長者、企業健康日或社區健康篩查情境。
                </div>
              </aside>

              <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.38)] backdrop-blur md:p-8">
                <p className="text-xs font-semibold tracking-[0.24em] text-emerald-700">{activeStep.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">{activeStep.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{activeStep.description}</p>

                {currentStep === 0 ? (
                  <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm leading-6 text-sky-900">
                    建議優先填寫中文姓名、聯絡電話、出生日期及居住地區，方便前線快速完成登記及初步分流。
                  </div>
                ) : null}

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {currentStep === 0 && (
                    <>
                      <Input
                        label="中文姓名"
                        value={data.personalInfo.fullName}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, fullName: value } }))}
                        error={errors.fullName}
                        placeholder="例如：陳大文"
                      />
                      <Input
                        label="英文姓名（可選）"
                        value={data.personalInfo.englishName}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, englishName: value } }))}
                        placeholder="例如：CHAN TAI MAN"
                      />
                      <Input
                        label="香港身份證首 4 位（可選）"
                        value={data.personalInfo.hkid}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, hkid: value } }))}
                        placeholder="例如：A123"
                        hint="建議只作識別用途，避免輸入完整證件號碼。"
                      />
                      <Input
                        label="聯絡電話"
                        value={data.personalInfo.phone}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, phone: value } }))}
                        error={errors.phone}
                        placeholder="例如：91234567"
                        hint="香港流動電話一般為 8 位數字。"
                      />
                      <Input
                        label="出生日期"
                        type="date"
                        value={data.personalInfo.birthDate}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, birthDate: value } }))}
                        error={errors.birthDate}
                      />
                      <Select
                        label="性別"
                        value={data.personalInfo.gender}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, gender: value } }))}
                        error={errors.gender}
                        options={[
                          { label: "女", value: "female" },
                          { label: "男", value: "male" },
                          { label: "其他 / 不便透露", value: "other" },
                        ]}
                      />
                      <Select
                        label="居住地區"
                        value={data.personalInfo.district}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, district: value } }))}
                        error={errors.district}
                        options={districtOptions.map((district) => ({ label: district, value: district }))}
                      />
                      <Select
                        label="婚姻狀況（可選）"
                        value={data.personalInfo.maritalStatus}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, maritalStatus: value } }))}
                        options={[
                          { label: "未婚", value: "single" },
                          { label: "已婚", value: "married" },
                          { label: "離婚 / 分居", value: "divorced" },
                          { label: "喪偶", value: "widowed" },
                        ]}
                      />
                      <Select
                        label="居住情況"
                        value={data.personalInfo.housingType}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, housingType: value } }))}
                        error={errors.housingType}
                        options={[
                          { label: "獨立居住", value: "independent" },
                          { label: "與家人同住", value: "withFamily" },
                          { label: "安老院 / 院舍", value: "careHome" },
                        ]}
                      />
                      <Select
                        label="活動能力"
                        value={data.personalInfo.mobilityStatus}
                        onChange={(value) => setData((current) => ({ ...current, personalInfo: { ...current.personalInfo, mobilityStatus: value } }))}
                        error={errors.mobilityStatus}
                        options={[
                          { label: "可獨立步行", value: "independent" },
                          { label: "需手杖 / 助行架", value: "assisted" },
                          { label: "主要使用輪椅", value: "wheelchair" },
                        ]}
                      />
                    </>
                  )}

                  {currentStep === 1 && (
                    <>
                      <div className="md:col-span-2">
                        <Select
                          label="近期睡眠情況"
                          value={data.medicalHistory.sleep}
                          onChange={(value) => setData((current) => ({ ...current, medicalHistory: { ...current.medicalHistory, sleep: value } }))}
                          error={errors.sleep}
                          options={[
                            { label: "大致正常", value: "normal" },
                            { label: "難以入睡", value: "troubleSleeping" },
                            { label: "經常醒來", value: "frequentWaking" },
                            { label: "過早醒來", value: "earlyWaking" },
                          ]}
                        />
                      </div>
                      <Toggle label="曾診斷高血壓" checked={data.medicalHistory.hypertension} onChange={(checked) => setData((current) => ({ ...current, medicalHistory: { ...current.medicalHistory, hypertension: checked } }))} />
                      <Toggle label="曾診斷糖尿病" checked={data.medicalHistory.diabetes} onChange={(checked) => setData((current) => ({ ...current, medicalHistory: { ...current.medicalHistory, diabetes: checked } }))} />
                      <Toggle label="曾有冠心病 / 心臟病紀錄" checked={data.medicalHistory.coronaryHeartDisease} onChange={(checked) => setData((current) => ({ ...current, medicalHistory: { ...current.medicalHistory, coronaryHeartDisease: checked } }))} />
                      <Toggle label="曾中風" checked={data.medicalHistory.stroke} onChange={(checked) => setData((current) => ({ ...current, medicalHistory: { ...current.medicalHistory, stroke: checked } }))} />
                      <Toggle label="有長期痛症或關節不適" checked={data.medicalHistory.chronicPain} onChange={(checked) => setData((current) => ({ ...current, medicalHistory: { ...current.medicalHistory, chronicPain: checked } }))} />
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <Select
                        label="每週身體活動量"
                        value={data.lifestyle.physicalActivity}
                        onChange={(value) => setData((current) => ({ ...current, lifestyle: { ...current.lifestyle, physicalActivity: value } }))}
                        error={errors.physicalActivity}
                        options={[
                          { label: "偏低，很少活動", value: "low" },
                          { label: "輕量活動", value: "light" },
                          { label: "中等活動", value: "moderate" },
                          { label: "高活動量", value: "high" },
                        ]}
                      />
                      <Select
                        label="吸煙狀況"
                        value={data.lifestyle.smokingStatus}
                        onChange={(value) => setData((current) => ({ ...current, lifestyle: { ...current.lifestyle, smokingStatus: value } }))}
                        error={errors.smokingStatus}
                        options={[
                          { label: "從不吸煙", value: "never" },
                          { label: "已戒煙", value: "former" },
                          { label: "現時吸煙", value: "current" },
                        ]}
                      />
                      <Select
                        label="飲酒狀況"
                        value={data.lifestyle.alcoholStatus}
                        onChange={(value) => setData((current) => ({ ...current, lifestyle: { ...current.lifestyle, alcoholStatus: value } }))}
                        error={errors.alcoholStatus}
                        options={[
                          { label: "沒有", value: "never" },
                          { label: "已停止", value: "former" },
                          { label: "偶爾", value: "occasional" },
                          { label: "經常", value: "frequent" },
                        ]}
                      />
                      <Input
                        label="每日水果份量"
                        type="number"
                        value={data.lifestyle.fruitsServingsPerDay}
                        onChange={(value) => setData((current) => ({ ...current, lifestyle: { ...current.lifestyle, fruitsServingsPerDay: value } }))}
                        placeholder="例如：2"
                      />
                      <Input
                        label="每日蔬菜份量"
                        type="number"
                        value={data.lifestyle.vegetablesServingsPerDay}
                        onChange={(value) => setData((current) => ({ ...current, lifestyle: { ...current.lifestyle, vegetablesServingsPerDay: value } }))}
                        placeholder="例如：3"
                      />
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      {[
                        ["liftingCarrying", "提起或搬運約 5 公斤物件時的困難程度"],
                        ["walkingAcrossRoom", "在室內步行一個房間距離時的困難程度"],
                        ["transferring", "由床或椅站起身時的困難程度"],
                        ["climbingStairs", "上樓梯時的困難程度"],
                        ["falls", "過去一年跌倒次數情況"],
                      ].map(([key, label]) => (
                        <Select
                          key={key}
                          label={label}
                          value={data.sarcf[key as keyof AssessmentData["sarcf"]]}
                          onChange={(value) => setData((current) => ({ ...current, sarcf: { ...current.sarcf, [key]: value } }))}
                          error={errors[key]}
                          options={[
                            { label: "沒有 / 很少", value: "0" },
                            { label: "有一些", value: "1" },
                            { label: "很多 / 經常", value: "2" },
                          ]}
                        />
                      ))}
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                      <Input
                        label="收縮壓 (mmHg)"
                        type="number"
                        value={data.vitals.bloodPressureSystolic}
                        onChange={(value) => setData((current) => ({ ...current, vitals: { ...current.vitals, bloodPressureSystolic: value } }))}
                        error={errors.bloodPressureSystolic}
                        placeholder="例如：128"
                      />
                      <Input
                        label="舒張壓 (mmHg)"
                        type="number"
                        value={data.vitals.bloodPressureDiastolic}
                        onChange={(value) => setData((current) => ({ ...current, vitals: { ...current.vitals, bloodPressureDiastolic: value } }))}
                        error={errors.bloodPressureDiastolic}
                        placeholder="例如：78"
                      />
                      <Input
                        label="心率 (每分鐘)"
                        type="number"
                        value={data.vitals.heartRate}
                        onChange={(value) => setData((current) => ({ ...current, vitals: { ...current.vitals, heartRate: value } }))}
                        error={errors.heartRate}
                        placeholder="例如：72"
                      />
                      <Input
                        label="體重 (kg)"
                        type="number"
                        value={data.vitals.bodyWeight}
                        onChange={(value) => setData((current) => ({ ...current, vitals: { ...current.vitals, bodyWeight: value } }))}
                        error={errors.bodyWeight}
                        placeholder="例如：60"
                      />
                      <Input
                        label="身高 (cm)"
                        type="number"
                        value={data.vitals.bodyHeight}
                        onChange={(value) => setData((current) => ({ ...current, vitals: { ...current.vitals, bodyHeight: value } }))}
                        error={errors.bodyHeight}
                        placeholder="例如：160"
                      />
                      <Input
                        label="腰圍 (cm)"
                        type="number"
                        value={data.vitals.waistCircumference}
                        onChange={(value) => setData((current) => ({ ...current, vitals: { ...current.vitals, waistCircumference: value } }))}
                        error={errors.waistCircumference}
                        placeholder="例如：84"
                      />
                      <div className="md:col-span-2">
                        <Select
                          label="今日情緒狀態"
                          value={data.vitals.mood}
                          onChange={(value) => setData((current) => ({ ...current, vitals: { ...current.vitals, mood: value } }))}
                          error={errors.mood}
                          options={[
                            { label: "平穩", value: "neutral" },
                            { label: "焦慮", value: "anxious" },
                            { label: "低落", value: "depressed" },
                          ]}
                        />
                      </div>
                    </>
                  )}

                  {currentStep === 5 && (
                    <>
                      <div className="rounded-3xl border border-emerald-100 bg-[linear-gradient(180deg,#f0fdf4_0%,#ecfeff_100%)] p-5 md:col-span-2">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-500">初步風險等級</p>
                            <h3 className="mt-2 text-4xl font-semibold text-slate-950">{result.riskLevel}</h3>
                          </div>
                          <div className={`rounded-full px-4 py-2 text-sm font-semibold ${result.riskLevel === "高" ? "bg-rose-100 text-rose-700" : result.riskLevel === "中" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                            風險分數 {result.score}
                          </div>
                        </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                          <SummaryCard label="年齡" value={result.age ?? "-"} />
                          <SummaryCard label="BMI" value={result.bmi} />
                          <SummaryCard label="SARC-F" value={result.sarcfScore} />
                        </div>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-5 md:col-span-2">
                        <p className="text-sm font-semibold text-slate-950">主要風險提示</p>
                        <ul className="mt-4 grid gap-3">
                          {(result.riskFactors.length ? result.riskFactors : ["暫未見明顯高風險提示，可按需要定期覆檢。"]).map((factor) => (
                            <li key={factor} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-500">目前進度：第 {currentStep + 1} 步，共 {steps.length} 步</div>
                  <div className="flex gap-3">
                    {currentStep > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        返回上一步
                      </button>
                    ) : null}
                    {currentStep < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                      >
                        下一步
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={submitAssessment}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        產生篩查摘要
                        <ClipboardPlus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur md:p-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.24em] text-emerald-700">篩查完成</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-slate-950">
                    {data.personalInfo.fullName || "未命名個案"}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                    以下摘要可作初步分流或健康諮詢參考，建議由醫護、護理或個案管理團隊結合臨床判斷進一步跟進。
                  </p>
                </div>
                <div className={`rounded-full px-4 py-2 text-sm font-semibold ${result.riskLevel === "高" ? "bg-rose-100 text-rose-700" : result.riskLevel === "中" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {result.riskLevel} 風險
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                <SummaryCard label="總分" value={result.score} />
                <SummaryCard label="年齡" value={result.age ?? "-"} />
                <SummaryCard label="BMI" value={result.bmi} />
                <SummaryCard label="SARC-F" value={result.sarcfScore} />
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold text-slate-950">個案重點</p>
                  <div className="mt-4 grid gap-3 text-sm text-slate-700">
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">中文姓名：{data.personalInfo.fullName || "-"}</div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">聯絡電話：{data.personalInfo.phone || "-"}</div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">居住地區：{data.personalInfo.district || "-"}</div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">活動能力：{data.personalInfo.mobilityStatus === "independent" ? "可獨立步行" : data.personalInfo.mobilityStatus === "assisted" ? "需助行工具" : data.personalInfo.mobilityStatus === "wheelchair" ? "主要使用輪椅" : "-"}</div>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold text-slate-950">跟進建議</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    {(result.recommendations.length ? result.recommendations : ["暫未見高風險提示，建議按服務安排定期重覆篩查。"]).map((item) => (
                      <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-950">主要風險因素</p>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 lg:grid-cols-2">
                  {(result.riskFactors.length ? result.riskFactors : ["目前未見顯著高風險項目。"]).map((factor) => (
                    <li key={factor} className="rounded-2xl bg-white px-4 py-3 shadow-sm">{factor}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(0);
                    setStarted(true);
                    updateStage(0);
                  }}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  修改資料
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setStarted(false);
                    setCurrentStep(0);
                    setData(initialData);
                    router.replace(pathname, { scroll: false });
                  }}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  重新開始
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
