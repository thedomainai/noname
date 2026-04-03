import { LoginForm } from "@/components/features/auth/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DD Navigator</h1>
        <p className="text-gray-600">M&A デューデリジェンス業務支援ツール</p>
      </div>
      <LoginForm />
    </div>
  );
}
