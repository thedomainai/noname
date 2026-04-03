import { ImportForm } from "@/components/features/longlist/ImportForm";

export default function ImportPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        CSV インポート
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <ImportForm />
      </div>
    </div>
  );
}
