import { Suspense } from "react";
import HealthRiskAssessmentClient from "./HealthRiskAssessmentClient";

export default function OnboardingPage() {
  return (
    <Suspense>
      <HealthRiskAssessmentClient />
    </Suspense>
  );
}
