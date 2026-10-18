import Image from "next/image";
import { images, type ImageName } from "@/lib/images";
import { imageExists } from "@/lib/image-exists";

type Props = {
  name: ImageName;
  sizes: string;
  className?: string;
  /** LCP になる画像だけ true にする */
  preload?: boolean;
  /** 暗い背景の上で使う仮画像 */
  tone?: "light" | "dark";
};

/**
 * 親要素（position: relative）いっぱいに写真を表示する。
 * ファイルが未着のあいだは、何の写真が入るかを書いたグレーの仮画像を出す。
 */
export default function Photo({ name, sizes, className = "", preload = false, tone = "light" }: Props) {
  const meta: { alt: string; label: string; position?: string } = images[name];

  if (imageExists(name)) {
    return (
      <Image
        src={`/images/${name}`}
        alt={meta.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={`object-cover ${className}`}
        style={meta.position ? { objectPosition: meta.position } : undefined}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={meta.alt}
      className={`c-placeholder ${tone === "dark" ? "c-placeholder--dark" : ""} ${className}`}
    >
      <span className="c-placeholder__text">
        写真：{meta.label}
        <small>{name}</small>
      </span>
    </div>
  );
}
