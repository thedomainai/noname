"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface ToastProps {
  message: string;
  variant?: "default" | "success" | "error";
  duration?: number;
}

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (props: ToastProps) => {
    setToast(props);
    setTimeout(() => {
      setToast(null);
    }, props.duration || 3000);
  };

  return { toast, showToast };
}

export function Toast({ message, variant = "default" }: ToastProps) {
  const variantClasses = {
    default: "bg-gray-900 text-white",
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={cn(
          "px-4 py-3 rounded-lg shadow-lg",
          variantClasses[variant]
        )}
      >
        {message}
      </div>
    </div>
  );
}
