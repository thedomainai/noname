import { describe, it, expect } from "vitest";
import { getFileExtension, formatFileSize } from "@/lib/utils/file";

describe("getFileExtension", () => {
  it("should return extension for simple filename", () => {
    expect(getFileExtension("document.pdf")).toBe("pdf");
  });

  it("should return lowercase extension", () => {
    expect(getFileExtension("photo.JPG")).toBe("jpg");
  });

  it("should return empty string for no extension", () => {
    expect(getFileExtension("README")).toBe("");
  });

  it("should handle multiple dots", () => {
    expect(getFileExtension("archive.tar.gz")).toBe("gz");
  });

  it("should handle dotfiles", () => {
    expect(getFileExtension(".gitignore")).toBe("gitignore");
  });

  it("should handle empty string", () => {
    expect(getFileExtension("")).toBe("");
  });
});

describe("formatFileSize", () => {
  it("should return '0 B' for 0 bytes", () => {
    expect(formatFileSize(0)).toBe("0 B");
  });

  it("should format bytes", () => {
    expect(formatFileSize(500)).toBe("500.00 B");
  });

  it("should format kilobytes", () => {
    expect(formatFileSize(1024)).toBe("1.00 KB");
  });

  it("should format megabytes", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
  });

  it("should format gigabytes", () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe("1.00 GB");
  });

  it("should format terabytes", () => {
    expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe("1.00 TB");
  });

  it("should handle fractional sizes", () => {
    expect(formatFileSize(1536)).toBe("1.50 KB");
  });

  it("should handle large megabyte values", () => {
    expect(formatFileSize(5.5 * 1024 * 1024)).toBe("5.50 MB");
  });
});
