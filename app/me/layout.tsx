
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { GraduationCap } from "lucide-react";
import { persistor, store } from "@/lib/store/store";
import LoadingIndicator from "@/components/ui/loadingIndicator";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-2 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a href={"/me"}>
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg hero-gradient flex items-center justify-center bg-primary text-primary-foreground">
                      <GraduationCap className="h-5 w-5 text-primary-foreground bg-primary text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">ACGS</span>
                  </div>
                </a>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                  <a href="/me/history" className="hover:text-foreground transition-colors">History</a>
                </div>
                {!hasEnvVars ? (
                  <EnvVarWarning />
                ) : (
                  <Suspense>
                    <AuthButton />
                  </Suspense>
                )}
              </div>
            </nav>
            <div className="flex-1 flex flex-col gap-2 max-w-5xl p-5">
              {children}
            </div>

            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
              <p>© 2026 AI Career Guidance System. Helping learners make informed career decisions.</p>
              <ThemeSwitcher />
            </footer>
          </div>
        </main>
  );
}
