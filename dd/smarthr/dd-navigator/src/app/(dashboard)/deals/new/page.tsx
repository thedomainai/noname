import { DealForm } from "@/components/features/deal/DealForm";

export default function NewDealPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">新規案件作成</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <DealForm />
      </div>
    </div>
  );
}
