import { validateEntry } from "@/lib/form";
import { createFormHandler } from "@/lib/form-handler";
import { adminAddress, sendMail } from "@/lib/mail";
import { entryAdminMail, entryReplyMail } from "@/lib/mail-templates";

export const POST = createFormHandler({
  label: "entry",
  validate: validateEntry,
  async send(data) {
    await sendMail({ to: adminAddress(), replyTo: data.email || undefined, ...entryAdminMail(data) });
    // 応募者への自動返信（メールアドレスの入力があるときのみ。失敗しても応募自体は成功扱い）
    if (data.email) {
      await sendMail({ to: data.email, ...entryReplyMail(data) }).catch((err) => console.error("[entry] auto reply failed", err));
    }
  },
});
