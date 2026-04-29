import { Suspense } from "react";
import HealthRiskAssessmentClient from "../../onboarding/HealthRiskAssessmentClient";

export default function HealthRiskFactorAssessmentsPage() {
  return (
    <Suspense>
      <HealthRiskAssessmentClient />
    </Suspense>
  );
}
