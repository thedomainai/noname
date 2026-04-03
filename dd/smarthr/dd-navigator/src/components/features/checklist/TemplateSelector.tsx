"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TemplateSelector({ dealId }: { dealId: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const templates = [
    { id: "business", name: "ビジネスDD" },
    { id: "financial", name: "財務DD" },
    { id: "legal", name: "法務DD" },
    { id: "comprehensive", name: "包括的DD" },
  ];

  const handleSelect = async (templateId: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/checklist/apply-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deal_id: dealId, template_id: templateId }),
      });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        テンプレート選択
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle>チェックリストテンプレート</DialogTitle>
        <DialogDescription>
          案件に適用するテンプレートを選択してください
        </DialogDescription>
        <DialogContent>
          <div className="grid grid-cols-1 gap-3 mt-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelect(template.id)}
              >
                <CardContent className="pt-6">
                  <h4 className="font-medium text-gray-900">
                    {template.name}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
