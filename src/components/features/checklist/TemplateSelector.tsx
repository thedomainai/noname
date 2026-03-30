"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ChecklistTemplate } from "@/types";
import { useState } from "react";

interface TemplateSelectorProps {
  templates: ChecklistTemplate[];
  onApply: (templateId: string) => Promise<void>;
}

export function TemplateSelector({
  templates,
  onApply,
}: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async (templateId: string) => {
    setIsLoading(true);
    try {
      await onApply(templateId);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to apply template:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (templates.length === 0) return null;

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)} size="sm">
        Apply Template
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} title="Apply Checklist Template">
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border border-border rounded-md p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">
                    {template.name}
                  </h3>
                  {template.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => handleApply(template.id)}
                  disabled={isLoading}
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}
