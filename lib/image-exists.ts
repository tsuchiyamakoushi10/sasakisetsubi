import "server-only";
import fs from "node:fs";
import path from "node:path";

// ビルド時（静的生成時）に /public/images/ にファイルがあるかを確認する
export function imageExists(name: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "images", name));
  } catch {
    return false;
  }
}
