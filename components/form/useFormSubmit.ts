"use client";

import { useState } from "react";
import type { FieldErrors } from "@/lib/form";

type Status = "idle" | "sending" | "done" | "error";

export function useFormSubmit(endpoint: string, validate: (input: Record<string, unknown>) => { errors: FieldErrors }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    // サンクス表示に切り替わっても同じ DOM が使われるので、先に取っておく
    const root = form.closest<HTMLElement>("[data-form-root]");
    const input: Record<string, unknown> = Object.fromEntries(new FormData(form).entries());
    input.agree = input.agree === "on";

    const { errors: clientErrors } = validate(input);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setMessage("入力内容をご確認ください。");
      setStatus("error");
      // 最初のエラー項目へフォーカス
      const first = Object.keys(clientErrors)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus?.();
      return;
    }

    setStatus("sending");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors; message?: string };
      if (res.ok && json.ok) {
        setStatus("done");
        form.reset();
        // サンクス表示が見える位置へ
        requestAnimationFrame(() => root?.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
      setErrors(json.errors ?? {});
      setMessage(json.message ?? "送信できませんでした。お手数ですが、お電話でご連絡ください。");
      setStatus("error");
    } catch {
      setMessage("通信に失敗しました。電波の良い場所で再度お試しいただくか、お電話でご連絡ください。");
      setStatus("error");
    }
  }

  return { status, errors, message, onSubmit };
}
