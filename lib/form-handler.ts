import "server-only";
import { HONEYPOT_FIELD, type FieldErrors } from "@/lib/form";
import { MailConfigError } from "@/lib/mail";
import { allowRequest, clientIp } from "@/lib/rate-limit";
import { TURNSTILE_FIELD, verifyTurnstile } from "@/lib/turnstile";

// 受け付ける本文の上限（文字数の上限より十分大きく、巨大なデータは読まない）
const MAX_BODY_BYTES = 32 * 1024;

type Handler<T> = {
  validate: (input: Record<string, unknown>) => { data: T; errors: FieldErrors };
  send: (data: T) => Promise<void>;
  label: string;
};

/** 他のサイトからの送信は受け付けない（ブラウザは Origin を付けて送ってくる。付いていない送信はブラウザ以外なので通す） */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host"));
  } catch {
    return false;
  }
}

/** /api/entry・/api/contact 共通の処理（送信元の確認 → ハニーポット判定 → 検証 → 回数制限 → ロボット判定 → 送信） */
export function createFormHandler<T>({ validate, send, label }: Handler<T>) {
  return async function POST(request: Request) {
    if (!isSameOrigin(request)) {
      return Response.json({ ok: false, message: "送信できませんでした。" }, { status: 403 });
    }
    if (!request.headers.get("content-type")?.startsWith("application/json")) {
      return Response.json({ ok: false, message: "送信内容を読み取れませんでした。" }, { status: 415 });
    }
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
      return Response.json({ ok: false, message: "送信内容が長すぎます。" }, { status: 413 });
    }

    let input: Record<string, unknown>;
    try {
      const raw = await request.text();
      if (raw.length > MAX_BODY_BYTES) throw new Error("body too large");
      const body = JSON.parse(raw);
      if (!body || typeof body !== "object") throw new Error("invalid body");
      input = body as Record<string, unknown>;
    } catch {
      return Response.json({ ok: false, message: "送信内容を読み取れませんでした。" }, { status: 400 });
    }

    // ハニーポットに値が入っていたらボットとみなし、送信したふりをする
    if (typeof input[HONEYPOT_FIELD] === "string" && input[HONEYPOT_FIELD] !== "") {
      return Response.json({ ok: true });
    }

    const { data, errors } = validate(input);
    // 自動返信メールを悪用した大量送信を防ぐ（入力エラーの送信は数えない）
    if (Object.keys(errors).length === 0 && !allowRequest(`${label}:${clientIp(request)}`)) {
      return Response.json(
        { ok: false, message: "短時間に何度も送信されたため、受け付けを一時的に止めています。お手数ですが、お電話でご連絡ください。" },
        { status: 429 },
      );
    }
    if (Object.keys(errors).length > 0) {
      return Response.json({ ok: false, errors, message: "入力内容をご確認ください。" }, { status: 422 });
    }

    if (!(await verifyTurnstile(input[TURNSTILE_FIELD], clientIp(request)))) {
      return Response.json(
        { ok: false, message: "ロボットではないことを確認できませんでした。もう一度お試しいただくか、お電話でご連絡ください。" },
        { status: 403 },
      );
    }

    try {
      await send(data);
      return Response.json({ ok: true });
    } catch (err) {
      console.error(`[${label}] send failed`, err);
      const status = err instanceof MailConfigError ? 503 : 502;
      return Response.json(
        { ok: false, message: "送信できませんでした。お手数ですが、お電話でご連絡ください。" },
        { status },
      );
    }
  };
}
