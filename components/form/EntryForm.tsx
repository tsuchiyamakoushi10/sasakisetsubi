"use client";

import { experienceOptions, jobOptions, validateEntry } from "@/lib/form";
import { company } from "@/lib/site";
import { Agree, FormMessage, Honeypot, RadioGroup, SubmitButton, TextArea, TextField } from "./Fields";
import { useFormSubmit } from "./useFormSubmit";

export default function EntryForm() {
  const { status, errors, message, onSubmit } = useFormSubmit("/api/entry", validateEntry);

  if (status === "done") {
    return (
      <div data-form-root className="scroll-mt-28 bg-white px-6 py-14 text-center md:px-12 md:py-20" role="status">
        <p className="c-en text-sub">Thank you</p>
        <p className="c-mincho mt-4 text-[19px] font-semibold tracking-[0.04em] md:text-[28px] md:tracking-[0.06em]">エントリーを受け付けました</p>
        <p className="mt-6 leading-loose">
          ご応募ありがとうございます。
          <br />
          担当者より、ご入力いただいた電話番号へご連絡します。
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
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <TextField name="name" label="お名前" required autoComplete="name" placeholder="例）佐々木 太郎" error={errors.name} />
          <TextField name="age" label="年齢" required type="text" inputMode="numeric" placeholder="例）25" error={errors.age} />
        </div>
        <TextField name="tel" label="電話番号" required type="tel" autoComplete="tel" inputMode="tel" placeholder="例）090-1234-5678" error={errors.tel} />
        <RadioGroup name="job" label="希望職種" options={jobOptions} defaultValue="any" error={errors.job} />
        <RadioGroup name="experience" label="経験の有無" options={experienceOptions} error={errors.experience} />
        <TextField
          name="email"
          label="メールアドレス"
          type="email"
          autoComplete="email"
          inputMode="email"
          hint="入力いただくと受付確認メールをお送りします"
          error={errors.email}
        />
        <TextArea name="message" label="メッセージ" rows={4} placeholder="聞いてみたいことなど、お気軽にどうぞ" error={errors.message} />
        <Agree error={errors.agree} />

        <div className="space-y-5 border-t border-line pt-8 text-center">
          <FormMessage message={message} />
          <p className="c-mincho text-lg font-semibold tracking-[0.06em] md:text-xl">まずは話を聞くだけでもOKです</p>
          <SubmitButton sending={status === "sending"}>エントリーする</SubmitButton>
        </div>
      </form>
    </div>
  );
}
