import "server-only";

// フォーム送信の回数制限（同じ IP から短時間に大量送信されるのを防ぐ）。
// サーバーのインスタンスごとのメモリで数えるので完全ではない。Vercel の Firewall のレート制限と併用する（README 参照）
const WINDOW_MS = 10 * 60 * 1000;
const MAX_IN_WINDOW = 5;
const hits = new Map<string, number[]>();

export function clientIp(request: Request): string {
  return request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

/** 制限内なら true（呼ぶたびに 1 回と数える） */
export function allowRequest(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_IN_WINDOW) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  // 古い記録が溜まり続けないよう、ときどき掃除する
  if (hits.size > 1000) {
    for (const [k, ts] of hits) if (ts.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return true;
}
