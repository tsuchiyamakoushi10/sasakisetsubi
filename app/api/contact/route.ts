import { validateContact } from "@/lib/form";
import { createFormHandler } from "@/lib/form-handler";
import { adminAddress, sendMail } from "@/lib/mail";
import { contactAdminMail, contactReplyMail } from "@/lib/mail-templates";

export const POST = createFormHandler({
  label: "contact",
  validate: validateContact,
  async send(data) {
    await sendMail({ to: adminAddress(), replyTo: data.email, ...contactAdminMail(data) });
    // 自動返信に返信されたら、佐々木設備に届くようにする
    await sendMail({ to: data.email, replyTo: adminAddress(), ...contactReplyMail(data) }).catch((err) => console.error("[contact] auto reply failed", err));
  },
});
