import { MemberList } from "@/components/features/settings/MemberList";
import { MemberInvite } from "@/components/features/settings/MemberInvite";

export default async function TeamSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">チーム管理</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          メンバーを招待
        </h2>
        <MemberInvite />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          チームメンバー
        </h2>
        <MemberList />
      </div>
    </div>
  );
}
