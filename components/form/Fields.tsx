import Link from "next/link";
import { HONEYPOT_FIELD } from "@/lib/form";

const inputCls =
  "mt-2 block w-full rounded-none border border-line bg-white px-4 py-3.5 text-base leading-normal text-ink placeholder:text-sub/70 focus:border-ink focus:outline-none aria-[invalid=true]:border-red-700";

type BaseProps = {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
};

function Label({ name, label, required, hint }: Omit<BaseProps, "error">) {
  return (
    <label htmlFor={`f-${name}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-medium">
      {label}
      <span className={`px-2 py-px text-[11px] leading-5 tracking-[0.1em] ${required ? "bg-accent text-white" : "bg-mist text-sub"}`}>
        {required ? "必須" : "任意"}
      </span>
      {hint && <span className="text-xs font-normal text-sub">{hint}</span>}
    </label>
  );
}

function ErrorText({ name, error }: { name: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`f-${name}-error`} className="mt-2 text-sm text-red-700">
      {error}
    </p>
  );
}

export function TextField({
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  className = "",
  ...props
}: BaseProps & {
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label {...props} />
      <input
        id={`f-${props.name}`}
        name={props.name}
        type={type}
        required={props.required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `f-${props.name}-error` : undefined}
        className={inputCls}
      />
      <ErrorText name={props.name} error={props.error} />
    </div>
  );
}

export function TextArea({ rows = 6, placeholder, ...props }: BaseProps & { rows?: number; placeholder?: string }) {
  return (
    <div>
      <Label {...props} />
      <textarea
        id={`f-${props.name}`}
        name={props.name}
        rows={rows}
        required={props.required}
        placeholder={placeholder}
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `f-${props.name}-error` : undefined}
        className={inputCls}
      />
      <ErrorText name={props.name} error={props.error} />
    </div>
  );
}

export function RadioGroup({
  options,
  defaultValue,
  ...props
}: BaseProps & { options: readonly { value: string; label: string }[]; defaultValue?: string }) {
  return (
    <fieldset aria-describedby={props.error ? `f-${props.name}-error` : undefined}>
      <legend className="flex items-center gap-3 text-[15px] font-medium">
        {props.label}
        <span className={`px-2 py-px text-[11px] leading-5 tracking-[0.1em] ${props.required ? "bg-accent text-white" : "bg-mist text-sub"}`}>
          {props.required ? "必須" : "任意"}
        </span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name={props.name} value={o.value} defaultChecked={defaultValue === o.value} className="peer sr-only" />
            <span className="inline-block border border-line bg-white px-5 py-3 text-[15px] transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <ErrorText name={props.name} error={props.error} />
    </fieldset>
  );
}

/** プライバシーポリシーへの同意 */
export function Agree({ error }: { error?: string }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed">
        <input
          type="checkbox"
          name="agree"
          className="mt-1 h-5 w-5 flex-none accent-[var(--color-accent)]"
          aria-invalid={!!error}
          aria-describedby={error ? "f-agree-error" : undefined}
        />
        <span>
          <Link href="/privacy" target="_blank" className="c-link">
            プライバシーポリシー
          </Link>
          に同意する
        </span>
      </label>
      <ErrorText name="agree" error={error} />
    </div>
  );
}

/** ハニーポット（人には見えない項目。ボットが入力したら破棄する） */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        ウェブサイト
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={sending} className="c-button c-button--accent w-full justify-center disabled:opacity-60 sm:w-auto sm:min-w-[20rem]">
      <span>{sending ? "送信中…" : children}</span>
    </button>
  );
}

export function FormMessage({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-800">
      {message}
    </p>
  );
}
