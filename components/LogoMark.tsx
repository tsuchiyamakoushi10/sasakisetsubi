import Image from "next/image";

/** ロゴマーク（透過PNG・#222）。white を付けると白で表示する */
export default function LogoMark({ size, white = false, className = "", preload = false }: { size: number; white?: boolean; className?: string; preload?: boolean }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={size}
      height={size}
      preload={preload}
      className={`flex-none transition-[filter] duration-500 ${white ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
