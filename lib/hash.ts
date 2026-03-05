import crypto from "crypto";

export function generateSHA256Hash(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}
