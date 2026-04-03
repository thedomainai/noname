"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TemplateManager() {
  const templates = [
    { id: "business", name: "ビジネスDD", itemCount: 25 },
    { id: "financial", name: "財務DD", itemCount: 30 },
    { id: "legal", name: "法務DD", itemCount: 20 },
    { id: "comprehensive", name: "包括的DD", itemCount: 75 },
  ];

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {template.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {template.itemCount} 項目
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  編集
                </Button>
                <Button variant="outline" size="sm">
                  プレビュー
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
