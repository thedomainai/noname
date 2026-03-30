import { LoginForm } from "@/components/features/auth/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <LoginForm />
    </div>
  );
}
