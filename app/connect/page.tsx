import { Suspense } from "react";
import HealthRiskAssessmentClient from "../onboarding/HealthRiskAssessmentClient";

export default function ConnectPage() {
  return (
    <Suspense>
      <HealthRiskAssessmentClient />
    </Suspense>
  );
}
