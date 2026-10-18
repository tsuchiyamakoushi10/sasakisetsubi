type Props = {
  en: string;
  ja: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** 「英字ラベル（イタリック）＋日本語見出し（明朝）」のセット */
export default function SectionHeading({ en, ja, as: Tag = "h2", align = "left", tone = "dark", className = "" }: Props) {
  return (
    <div className={`js-reveal js-fade ${align === "center" ? "text-center" : ""} ${className}`}>
      <p className={`c-en text-[15px] md:text-base ${tone === "light" ? "text-white/70" : "text-sub"}`}>{en}</p>
      <Tag className="c-mincho mt-3 text-[26px] font-semibold leading-[1.5] tracking-[0.08em] md:mt-4 md:text-[34px]">{ja}</Tag>
    </div>
  );
}
