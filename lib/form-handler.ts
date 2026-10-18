import "server-only";
import { HONEYPOT_FIELD, type FieldErrors } from "@/lib/form";
import { MailConfigError } from "@/lib/mail";

type Handler<T> = {
  validate: (input: Record<string, unknown>) => { data: T; errors: FieldErrors };
  send: (data: T) => Promise<void>;
  label: string;
};

/** /api/entry・/api/contact 共通の処理（検証 → ハニーポット判定 → 送信） */
export function createFormHandler<T>({ validate, send, label }: Handler<T>) {
  return async function POST(request: Request) {
    let input: Record<string, unknown>;
    try {
      const body = await request.json();
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
    if (Object.keys(errors).length > 0) {
      return Response.json({ ok: false, errors, message: "入力内容をご確認ください。" }, { status: 422 });
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
