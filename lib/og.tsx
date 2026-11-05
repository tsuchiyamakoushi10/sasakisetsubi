import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/lib/site";

// OGP 画像（SNS・LINE でシェアされたときのサムネイル）。ビルド時に静的に生成される。
// フォントは assets/og-shippori-mincho.ttf（Shippori Mincho を使う文字だけに絞ったもの。SIL OFL）。
// 文言を変えて表示されない文字が出たら、Google Fonts の css2?family=Shippori+Mincho:wght@600&text=<使う文字> からフォントを作り直す。
export const ogSize = { width: 1200, height: 630 };

type Props = {
  /** public/images/ の写真 */
  photo: string;
  /** 写真の切り抜き位置（CSS の object-position） */
  position?: string;
  lead: string;
  sub: string;
};

async function dataUrl(path: string, type: string) {
  return `data:${type};base64,${(await readFile(join(process.cwd(), path))).toString("base64")}`;
}

export async function renderOgImage({ photo, position = "50% 50%", lead, sub }: Props) {
  const [font, bg, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/og-shippori-mincho.ttf")),
    dataUrl(`public/images/${photo}`, "image/jpeg"),
    dataUrl("public/logo-mark.png", "image/png"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Shippori Mincho", color: "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: position }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", backgroundImage: "linear-gradient(90deg, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.75) 50%, rgba(20,20,20,0.15) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* 濃い背景なので白に反転 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" width={64} height={64} style={{ filter: "brightness(0) invert(1)" }} />
            <div style={{ fontSize: 22, letterSpacing: 8, color: "#c1c1c1" }}>SASAKI SETSUBI</div>
          </div>
          <div style={{ marginTop: 36, fontSize: 64, letterSpacing: 6 }}>{company.name}</div>
          <div style={{ marginTop: 28, width: 80, height: 1, background: "#c1c1c1" }} />
          <div style={{ marginTop: 28, fontSize: 40, letterSpacing: 4 }}>{lead}</div>
          <div style={{ marginTop: 18, fontSize: 26, letterSpacing: 3, color: "#dcdcdc" }}>{sub}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Shippori Mincho", data: font, weight: 600, style: "normal" }] },
  );
}
