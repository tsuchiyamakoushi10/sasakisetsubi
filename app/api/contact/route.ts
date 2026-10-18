import { validateContact } from "@/lib/form";
import { createFormHandler } from "@/lib/form-handler";
import { adminAddress, sendMail } from "@/lib/mail";
import { contactAdminMail, contactReplyMail } from "@/lib/mail-templates";

export const POST = createFormHandler({
  label: "contact",
  validate: validateContact,
  async send(data) {
    await sendMail({ to: adminAddress(), replyTo: data.email, ...contactAdminMail(data) });
    await sendMail({ to: data.email, ...contactReplyMail(data) }).catch((err) => console.error("[contact] auto reply failed", err));
  },
});
