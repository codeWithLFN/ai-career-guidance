import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
         <div className="py-10 flex items-center justify-center">
          <a href={"/"}>
            <div className="flex items-center gap-2">
              <div className="h-20 w-20 br-5 rounded-lg hero-gradient flex items-center justify-center bg-primary text-primary-foreground">
                <GraduationCap className="h-20 w-20 text-primary-foreground bg-primary text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ACGS</span>
            </div>
          </a>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Thank you for signing up!
              </CardTitle>
              <CardDescription>Check your email to confirm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You&apos;ve successfully signed up. Please check your email to
                confirm your account before signing in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
