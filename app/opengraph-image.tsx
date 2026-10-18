import { ImageResponse } from "next/og";

// OGP 画像（日本語フォントを同梱しないため英字のみ。写真が届いたら静的画像への差し替えも可）
export const alt = "株式会社佐々木設備｜ダクト工事・重量鳶〔埼玉県八潮市〕";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#222222",
          color: "#ffffff",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 8, color: "#989898", fontStyle: "italic" }}>Build trust, pass it on.</div>
        <div style={{ marginTop: 28, fontSize: 84, letterSpacing: 10 }}>SASAKI SETSUBI</div>
        <div style={{ marginTop: 28, width: 80, height: 1, background: "#c1c1c1" }} />
        <div style={{ marginTop: 28, fontSize: 28, letterSpacing: 4, color: "#c1c1c1" }}>
          Duct work / Heavy equipment — Yashio, Saitama
        </div>
      </div>
    ),
    size,
  );
}
