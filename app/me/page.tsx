"use client"

// import { redirect } from "next/navigation";

// import { createClient } from "@/lib/supabase/server";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useState } from "react";
import AssessmentFlow, { AssessmentData } from "@/components/app-components/AssessmentFlow";
import ResultsDashboard from "@/components/app-components/ResultsDashboard";
import Navbar from "@/components/app-components/Navbar";
import HeroSection from "@/components/app-components/HeroSection";
import FeaturesSection from "@/components/app-components/FeaturesSection";
import { persistor, store } from "@/lib/store/store";
import LoadingIndicator from "@/components/ui/loadingIndicator";

// async function UserDetails() {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.getClaims();

//   if (error || !data?.claims) {
//     redirect("/auth/login");
//   }

//   return JSON.stringify(data.claims, null, 2);
// }

type View = "landing" | "assessment" | "results";

const ProtectedPage = () => {
  const [view, setView] = useState<View>("landing");
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    setView("results");
  };

  if (view === "assessment") {
    return (
      <AssessmentFlow
        onComplete={handleAssessmentComplete}
        onBack={() => setView("landing")}
      />
    );
  }

  if (view === "results" && assessmentData) {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingIndicator message="Loading state..." />} persistor={persistor}>
          <ResultsDashboard
            assessmentData={assessmentData}
            onBack={() => setView("landing")}
            onRetake={() => {
              setView("assessment");
              
            }}
          />
        </PersistGate>
      </Provider >
    );
  }
  console.log({ assessmentData })
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingIndicator message="Loading state..." />} persistor={persistor}>
        <div className="min-h-screen">
          <AssessmentFlow
            onComplete={handleAssessmentComplete}
            onBack={() => setView("landing")}
          />
          {/* Footer */}
          <footer className="border-t py-8 text-center text-sm text-muted-foreground">
            <div className="container mx-auto px-4">
              <p>© 2026 AI Career Guidance System. Helping learners make informed career decisions.</p>
            </div>
          </footer>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default ProtectedPage;