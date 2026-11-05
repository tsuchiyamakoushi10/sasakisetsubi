import { sendGAEvent } from "@next/third-parties/google";

/** GA4 にイベントを送る（計測タグが入っていないとき＝本番以外・測定 ID 未設定のときは何もしない） */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  sendGAEvent("event", name, params);
}
