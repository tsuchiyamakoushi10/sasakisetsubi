"use client";

import { validateContact } from "@/lib/form";
import { company } from "@/lib/site";
import { Agree, FormMessage, Honeypot, SubmitButton, TextArea, TextField } from "./Fields";
import { useFormSubmit } from "./useFormSubmit";

export default function ContactForm() {
  const { status, errors, message, onSubmit } = useFormSubmit("/api/contact", validateContact);

  if (status === "done") {
    return (
      <div data-form-root className="scroll-mt-28 bg-white px-6 py-14 text-center md:px-12 md:py-20" role="status">
        <p className="c-en text-sub">Thank you</p>
        <p className="c-mincho mt-4 text-[19px] font-semibold tracking-[0.04em] md:text-[28px] md:tracking-[0.06em]">お問い合わせを受け付けました</p>
        <p className="mt-6 leading-loose">
          お問い合わせありがとうございます。
          <br />
          内容を確認のうえ、担当者よりご連絡します。
        </p>
        <p className="mt-6 text-sm text-sub">
          お急ぎの方はお電話でもどうぞ：<a href={company.telHref} className="c-link whitespace-nowrap">{company.tel}</a>
        </p>
      </div>
    );
  }

  return (
    <div data-form-root className="scroll-mt-28">
      <form onSubmit={onSubmit} noValidate className="relative space-y-8 bg-white px-5 py-10 md:px-12 md:py-14">
        <Honeypot />
        <TextField name="company" label="会社名" autoComplete="organization" error={errors.company} />
        <TextField name="name" label="お名前" required autoComplete="name" error={errors.name} />
        <div className="grid gap-8 md:grid-cols-2">
          <TextField name="tel" label="電話番号" required type="tel" autoComplete="tel" inputMode="tel" error={errors.tel} />
          <TextField name="email" label="メールアドレス" required type="email" autoComplete="email" inputMode="email" error={errors.email} />
        </div>
        <TextArea
          name="message"
          label="お問い合わせ内容"
          required
          rows={7}
          placeholder="工事の内容・場所・時期など、わかる範囲でご記入ください"
          error={errors.message}
        />
        <Agree error={errors.agree} />
        <div className="space-y-5 border-t border-line pt-8 text-center">
          <FormMessage message={message} />
          <SubmitButton sending={status === "sending"}>送信する</SubmitButton>
        </div>
      </form>
    </div>
  );
}
