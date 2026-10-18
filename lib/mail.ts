import "server-only";

type Mail = {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
};

const DEFAULT_FROM = "株式会社佐々木設備 <noreply@x-edge-mail.jp>";

export class MailConfigError extends Error {}

/** Resend の API でメールを送る（RESEND_API_KEY は Vercel の環境変数で管理） */
export async function sendMail({ to, subject, text, replyTo }: Mail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // ローカル開発中はキーがなくても動作確認できるよう、内容をログに出すだけにする
      console.info("[mail:dev] RESEND_API_KEY が未設定のため送信をスキップ", { to, subject, text });
      return;
    }
    throw new MailConfigError("RESEND_API_KEY is not set");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || DEFAULT_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend error ${res.status}: ${body.slice(0, 500)}`);
  }
}

export function adminAddress(): string {
  const to = process.env.MAIL_TO;
  if (!to) {
    if (process.env.NODE_ENV !== "production") return "dev@example.com";
    throw new MailConfigError("MAIL_TO is not set");
  }
  return to;
}
