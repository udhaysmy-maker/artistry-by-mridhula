import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
