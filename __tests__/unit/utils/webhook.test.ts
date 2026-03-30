// @vitest-environment node
import { describe, it, expect } from "vitest";
import crypto from "crypto";
import {
  verifyGitHubSignature,
  verifyGitLabToken,
} from "@/lib/utils/webhook";

describe("verifyGitHubSignature", () => {
  const secret = "test-secret-key";
  const payload = JSON.stringify({ action: "opened", number: 123 });

  it("正しい署名で true を返す", () => {
    const hmac = crypto.createHmac("sha256", secret);
    const expectedSignature = "sha256=" + hmac.update(payload).digest("hex");

    const result = verifyGitHubSignature(payload, expectedSignature, secret);

    expect(result).toBe(true);
  });

  it("不正な署名で false を返す", () => {
    const invalidSignature = "sha256=invalid_signature_hash";

    const result = verifyGitHubSignature(payload, invalidSignature, secret);

    expect(result).toBe(false);
  });

  it("長さが異なる署名で false を返す", () => {
    const shortSignature = "sha256=abc";

    const result = verifyGitHubSignature(payload, shortSignature, secret);

    expect(result).toBe(false);
  });

  it("異なるシークレットキーで false を返す", () => {
    const hmac = crypto.createHmac("sha256", "wrong-secret");
    const wrongSignature = "sha256=" + hmac.update(payload).digest("hex");

    const result = verifyGitHubSignature(payload, wrongSignature, secret);

    expect(result).toBe(false);
  });

  it("プレフィックスなしの署名で false を返す", () => {
    const hmac = crypto.createHmac("sha256", secret);
    const signatureWithoutPrefix = hmac.update(payload).digest("hex");

    const result = verifyGitHubSignature(
      payload,
      signatureWithoutPrefix,
      secret
    );

    expect(result).toBe(false);
  });
});

describe("verifyGitLabToken", () => {
  const expectedToken = "gitlab-webhook-token-12345";

  it("正しいトークンで true を返す", () => {
    const result = verifyGitLabToken(expectedToken, expectedToken);

    expect(result).toBe(true);
  });

  it("不正なトークンで false を返す", () => {
    const invalidToken = "wrong-token";

    const result = verifyGitLabToken(invalidToken, expectedToken);

    expect(result).toBe(false);
  });

  it("長さが異なるトークンで false を返す", () => {
    const shortToken = "short";

    const result = verifyGitLabToken(shortToken, expectedToken);

    expect(result).toBe(false);
  });

  it("空文字列のトークンで false を返す", () => {
    const emptyToken = "";

    const result = verifyGitLabToken(emptyToken, expectedToken);

    expect(result).toBe(false);
  });

  it("大文字小文字の違いで false を返す", () => {
    const upperToken = expectedToken.toUpperCase();

    const result = verifyGitLabToken(upperToken, expectedToken);

    expect(result).toBe(false);
  });
});
