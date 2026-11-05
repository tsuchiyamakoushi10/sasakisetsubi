import { allowRequest, clientIp } from "@/lib/rate-limit";

// CSP の違反の報告を受け取り、Vercel のログに出す（Report-Only で試している間、壊れている箇所がないか確かめるため）
const MAX_BYTES = 8 * 1024;

export async function POST(request: Request) {
  if (allowRequest(`csp:${clientIp(request)}`)) {
    const body = (await request.text().catch(() => "")).slice(0, MAX_BYTES);
    console.warn("[csp-report]", body);
  }
  return new Response(null, { status: 204 });
}
