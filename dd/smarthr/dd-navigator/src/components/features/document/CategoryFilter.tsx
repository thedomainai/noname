"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

const categories = [
  { value: "", label: "すべて" },
  { value: "business", label: "事業" },
  { value: "financial", label: "財務" },
  { value: "legal", label: "法務" },
  { value: "tax", label: "税務" },
  { value: "hr", label: "人事" },
  { value: "it", label: "IT" },
  { value: "other", label: "その他" },
];

export function CategoryFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>カテゴリ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {categories.map((cat) => {
            const href = cat.value
              ? `${pathname}?category=${cat.value}`
              : pathname;
            const isActive = currentCategory === cat.value;

            return (
              <Link
                key={cat.value}
                href={href}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
