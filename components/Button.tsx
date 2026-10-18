import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "accent" | "white";
  className?: string;
};

/** A10 ボタン（ホバーで左から黒いバーが流れ込む） */
export default function Button({ href, children, variant = "default", className = "" }: Props) {
  const cls = `c-button ${variant === "accent" ? "c-button--accent" : variant === "white" ? "c-button--white" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="c-button__arrow" aria-hidden="true" />
    </>
  );
  if (href.startsWith("tel:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
