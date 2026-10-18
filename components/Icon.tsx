import type { BenefitIcon } from "@/data/recruit";

export type IconName = BenefitIcon | "eye" | "layers" | "flex";

const paths: Record<IconName, React.ReactNode> = {
  insurance: (
    <>
      <path d="M24 5l15 6v11c0 10-6.5 17-15 21-8.5-4-15-11-15-21V11z" />
      <path d="M17 24l5 5 9-10" />
    </>
  ),
  license: (
    <>
      <rect x="7" y="9" width="34" height="26" />
      <circle cx="18" cy="20" r="4" />
      <path d="M12 30c1.5-3 3.5-4 6-4s4.5 1 6 4M28 17h8M28 23h8" />
      <path d="M20 35v6l4-2 4 2v-6" />
    </>
  ),
  uniform: (
    <>
      <path d="M17 6l-10 6 3 9 5-2v23h18V19l5 2 3-9-10-6c-1 3-3.5 5-7 5s-6-2-7-5z" />
      <path d="M24 11v31M28 22h5" />
    </>
  ),
  holiday: (
    <>
      <rect x="7" y="10" width="34" height="31" />
      <path d="M7 18h34M16 6v8M32 6v8" />
      <path d="M17 29l5 5 9-9" />
    </>
  ),
  eye: (
    <>
      <path d="M4 24c5-8 12-12 20-12s15 4 20 12c-5 8-12 12-20 12S9 32 4 24z" />
      <circle cx="24" cy="24" r="6" />
    </>
  ),
  layers: (
    <>
      <path d="M24 6l18 9-18 9-18-9z" />
      <path d="M6 24l18 9 18-9M6 33l18 9 18-9" />
    </>
  ),
  flex: (
    <>
      <path d="M8 18h26l-6-6M40 30H14l6 6" />
    </>
  ),
};

export default function Icon({ name, className = "h-12 w-12" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
