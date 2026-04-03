"use client";

import { Button } from "@/components/ui/button";

export function QAExport({ dealId }: { dealId: string }) {
  const handleExport = async () => {
    const response = await fetch(`/api/qa/export?dealId=${dealId}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qa-${dealId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline">
      CSVエクスポート
    </Button>
  );
}
