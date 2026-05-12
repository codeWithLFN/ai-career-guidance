import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { User } from "lucide-react";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/auth/sign-up"
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Sign up
        </Link>
      </div>
    );
  }

  const email = user.email as string;
  const initials = email
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {/* Avatar + Name */}
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
          {initials}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium leading-none truncate max-w-[160px]">
            {email.split("@")[0]}
          </p>
          <p className="text-[11px] text-muted-foreground leading-none mt-0.5 truncate max-w-[160px]">
            {email}
          </p>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
