import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils/cn";

describe("cn", () => {
  it("単一のクラス名を返す", () => {
    const result = cn("text-center");

    expect(result).toBe("text-center");
  });

  it("複数のクラス名をマージする", () => {
    const result = cn("text-center", "font-bold", "text-red-500");

    expect(result).toBe("text-center font-bold text-red-500");
  });

  it("条件付きクラス名を処理する", () => {
    const result = cn("base-class", true && "active", false && "inactive");

    expect(result).toBe("base-class active");
  });

  it("オブジェクト形式のクラス名を処理する", () => {
    const result = cn({
      "text-center": true,
      "font-bold": false,
      "text-red-500": true,
    });

    expect(result).toBe("text-center text-red-500");
  });

  it("配列形式のクラス名を処理する", () => {
    const result = cn(["text-center", "font-bold"], "text-red-500");

    expect(result).toBe("text-center font-bold text-red-500");
  });

  it("Tailwind クラスの競合を解決する（後勝ち）", () => {
    const result = cn("text-red-500", "text-blue-500");

    expect(result).toBe("text-blue-500");
  });

  it("異なる Tailwind プロパティは両方保持する", () => {
    const result = cn("text-red-500", "bg-blue-500");

    expect(result).toBe("text-red-500 bg-blue-500");
  });

  it("Tailwind の修飾子付きクラスの競合を解決する", () => {
    const result = cn("p-4", "p-8");

    expect(result).toBe("p-8");
  });

  it("レスポンシブ修飾子の競合を解決する", () => {
    const result = cn("md:text-red-500", "md:text-blue-500");

    expect(result).toBe("md:text-blue-500");
  });

  it("undefined と null を無視する", () => {
    const result = cn("text-center", undefined, null, "font-bold");

    expect(result).toBe("text-center font-bold");
  });

  it("空文字列を無視する", () => {
    const result = cn("text-center", "", "font-bold");

    expect(result).toBe("text-center font-bold");
  });

  it("複雑な組み合わせを正しく処理する", () => {
    const isActive = true;
    const isDisabled = false;

    const result = cn(
      "base-class",
      {
        active: isActive,
        disabled: isDisabled,
      },
      isActive && "text-blue-500",
      "font-bold"
    );

    expect(result).toBe("base-class active text-blue-500 font-bold");
  });

  it("引数なしで空文字列を返す", () => {
    const result = cn();

    expect(result).toBe("");
  });
});
