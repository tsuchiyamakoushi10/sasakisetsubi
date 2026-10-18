import type { WorkIcon } from "@/data/works";

// 事業紹介（Works01〜04）のイラスト。4:3（400×300）で、枠いっぱいに表示する。
const c = {
  bg: "#e9edf2",
  far: "#d5dbe3",
  window: "#c3ccd6",
  ground: "#cbd3dc",
  ink: "#222222",
  navy: "#1e3a5f",
  steel: "#8a96a3",
  steelLight: "#b9c3cd",
  dark: "#4a5866",
  white: "#ffffff",
  skin: "#efc9a8",
  orange: "#e5813a",
  wool: "#f0cf6e",
};

/** 職人（足元が原点、高さ約 76） */
function Worker({ x, y, scale = 1, arm = "down" }: { x: number; y: number; scale?: number; arm?: "down" | "up" | "forward" }) {
  const hand = { down: "M9 -50 L14 -30", up: "M9 -52 L20 -76", forward: "M9 -50 L26 -46" }[arm];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-9" y="-30" width="7" height="30" fill={c.ink} />
      <rect x="2" y="-30" width="7" height="30" fill={c.ink} />
      <rect x="-12" y="-58" width="24" height="31" rx="4" fill={c.navy} />
      <path d="M-12 -32h24" stroke={c.orange} strokeWidth="3" />
      <path d="M-9 -50 L-14 -30" stroke={c.navy} strokeWidth="6" strokeLinecap="round" />
      <path d={hand} stroke={c.navy} strokeWidth="6" strokeLinecap="round" />
      <circle cx="0" cy="-66" r="8" fill={c.skin} />
      <path d="M-10 -67a10 10 0 0 1 20 0z" fill={c.white} stroke={c.ink} strokeWidth="2" strokeLinejoin="round" />
      <path d="M-12 -67h24" stroke={c.ink} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Windows({ x0, y0, cols, rows }: { x0: number; y0: number; cols: number; rows: number }) {
  return (
    <>
      {Array.from({ length: rows * cols }, (_, i) => (
        <rect key={i} x={x0 + (i % cols) * 34} y={y0 + Math.floor(i / cols) * 40} width="20" height="24" fill={c.window} />
      ))}
    </>
  );
}

// ダクト工事：厨房のフードから天井を通して、外へ排気するダクトを施工する
function Duct() {
  const seams = Array.from({ length: 12 }, (_, i) => 104 + i * 22);
  return (
    <>
      <rect width="400" height="300" fill={c.bg} />
      <rect width="400" height="30" fill={c.far} />
      <path d="M0 30h400" stroke={c.steel} strokeWidth="2" />
      <rect x="372" y="30" width="28" height="232" fill={c.far} />
      <rect y="262" width="400" height="38" fill={c.ground} />

      {/* 厨房（コンロとフード） */}
      <rect x="28" y="196" width="104" height="66" fill={c.white} stroke={c.ink} strokeWidth="2.5" />
      <path d="M28 212h104" stroke={c.ink} strokeWidth="2" />
      <ellipse cx="58" cy="196" rx="14" ry="4" fill={c.dark} />
      <ellipse cx="102" cy="196" rx="14" ry="4" fill={c.dark} />
      <path d="M36 150h88l-14-30H50z" fill={c.steelLight} stroke={c.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M80 182v-22M74 166l6-7 6 7" fill="none" stroke={c.orange} strokeWidth="2" strokeLinecap="round" />

      {/* ダクト（立ち上がり → エルボ → 横引き） */}
      <rect x="68" y="70" width="24" height="50" fill={c.steelLight} stroke={c.dark} strokeWidth="2" />
      <path d="M68 86l24 -8M68 104l24 -8" stroke={c.steel} strokeWidth="1.5" />
      <path d="M68 70a24 24 0 0 1 24 -24v24z" fill={c.steelLight} stroke={c.dark} strokeWidth="2" strokeLinejoin="round" />
      <rect x="92" y="46" width="282" height="24" fill={c.steelLight} stroke={c.dark} strokeWidth="2" />
      {seams.map((x) => (
        <path key={x} d={`M${x} 46l8 24`} stroke={c.steel} strokeWidth="1.5" />
      ))}
      <path d="M380 58h14M388 52l7 6-7 6" fill="none" stroke={c.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* 吊りバンド */}
      {[150, 270, 350].map((x) => (
        <g key={x}>
          <path d={`M${x} 30v16`} stroke={c.dark} strokeWidth="3" />
          <path d={`M${x - 3} 44h6v28h-6z`} fill={c.navy} />
        </g>
      ))}

      {/* 脚立と職人 */}
      <path d="M228 262L244 150M272 262L256 150" stroke={c.orange} strokeWidth="4" strokeLinecap="round" />
      <path d="M239.7 180h20.6M235.4 210h29.2M231.1 240h37.8" stroke={c.orange} strokeWidth="3" />
      <rect x="238" y="146" width="24" height="6" fill={c.dark} />
      <Worker x={250} y={146} arm="up" />

      {/* 床に置いたダクト材 */}
      <rect x="304" y="236" width="52" height="26" fill={c.steelLight} stroke={c.dark} strokeWidth="2" />
      <ellipse cx="356" cy="249" rx="5" ry="13" fill={c.dark} />
      <path d="M318 236l6 26M336 236l6 26" stroke={c.steel} strokeWidth="1.5" />
    </>
  );
}

// 重量機器搬入・据付：吊り上げた空調機を、架台へ誘導して据え付ける
function Heavy() {
  return (
    <>
      <rect width="400" height="300" fill={c.bg} />
      <rect x="262" y="120" width="138" height="150" fill={c.far} />
      <Windows x0={276} y0={136} cols={4} rows={3} />
      <rect y="262" width="400" height="38" fill={c.ground} />
      <path d="M0 262h400" stroke={c.steel} strokeWidth="2" />

      {/* ワイヤーとフック */}
      <path d="M170 0v68" stroke={c.ink} strokeWidth="3" />
      <rect x="158" y="66" width="24" height="18" rx="3" fill={c.orange} />
      <path d="M170 84v8a6 6 0 1 1 -6 6" fill="none" stroke={c.ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M170 100L126 128M170 100L214 128" stroke={c.ink} strokeWidth="2.5" />

      {/* 空調機（室外機） */}
      <rect x="118" y="126" width="104" height="74" rx="4" fill={c.white} stroke={c.ink} strokeWidth="3" />
      <circle cx="152" cy="163" r="25" fill={c.bg} stroke={c.ink} strokeWidth="2.5" />
      <circle cx="152" cy="163" r="6" fill={c.ink} />
      <path d="M152 138v50M127 163h50M134 145l36 36M170 145l-36 36" stroke={c.steel} strokeWidth="1.5" />
      <path d="M190 140h22M190 150h22M190 160h22M190 170h22M190 180h22" stroke={c.steel} strokeWidth="2" />

      {/* 据付位置（架台）と誘導線 */}
      <path d="M170 206v26" stroke={c.navy} strokeWidth="2" strokeDasharray="4 5" />
      <path d="M162 226l8 10 8-10" fill="none" stroke={c.navy} strokeWidth="2" />
      <rect x="108" y="240" width="124" height="22" fill={c.steel} />
      <path d="M118 240v22M222 240v22" stroke={c.dark} strokeWidth="3" />
      <path d="M222 196C240 206 250 214 266 214" fill="none" stroke={c.orange} strokeWidth="2" />
      <Worker x={278} y={262} arm="forward" />
      <Worker x={64} y={262} arm="up" />
    </>
  );
}

// 足場組立：建物の外周に足場を組む
function Scaffold() {
  const cols = [40, 120, 200, 280, 360];
  const levels = [90, 150, 210];
  return (
    <>
      <rect width="400" height="300" fill={c.bg} />
      <rect x="64" y="36" width="272" height="234" fill={c.far} />
      <Windows x0={92} y0={56} cols={7} rows={5} />
      <rect y="268" width="400" height="32" fill={c.ground} />

      {/* 筋かい */}
      {cols.slice(0, -1).map((x, i) =>
        [30, ...levels].slice(0, -1).map((y, j) => (
          <path key={`${i}-${j}`} d={`M${x} ${y + 60}L${x + 80} ${y}`} stroke={c.steelLight} strokeWidth="2" />
        )),
      )}
      {/* 手すり */}
      {[70, 130, 190].map((y) => (
        <path key={y} d={`M36 ${y}H364`} stroke={c.steel} strokeWidth="2" />
      ))}
      {/* 建地 */}
      {cols.map((x) => (
        <path key={x} d={`M${x} 24V268`} stroke={c.navy} strokeWidth="5" />
      ))}
      {/* 作業床 */}
      {levels.map((y) => (
        <rect key={y} x="32" y={y} width="336" height="7" fill={c.dark} />
      ))}
      {cols.map((x) => (
        <rect key={x} x={x - 6} y="264" width="12" height="6" fill={c.ink} />
      ))}

      <rect x="166" y="40" width="68" height="24" fill={c.orange} />
      <text x="200" y="57" textAnchor="middle" fontSize="13" fontWeight="700" fill={c.white} letterSpacing="2">
        安全第一
      </text>

      <Worker x={160} y={150} scale={0.78} arm="up" />
      <Worker x={316} y={90} scale={0.78} arm="forward" />
      <Worker x={84} y={210} scale={0.78} />
    </>
  );
}

// 保温工事：ダクト（金属）→ 保温材 → 外装の順に巻いて、結露を防ぐ
function Insulation() {
  return (
    <>
      <rect width="400" height="300" fill={c.bg} />
      <rect width="400" height="28" fill={c.far} />
      <path d="M0 28h400" stroke={c.steel} strokeWidth="2" />

      {/* 吊りボルト */}
      <path d="M86 28v96M306 28v76" stroke={c.dark} strokeWidth="3" />

      {/* 裸のダクト（結露している） */}
      <rect x="40" y="124" width="104" height="52" fill={c.steelLight} />
      <ellipse cx="40" cy="150" rx="9" ry="26" fill={c.steel} />
      <path d="M40 124h104M40 176h104" stroke={c.dark} strokeWidth="2" />
      {[
        [66, 140],
        [100, 156],
        [124, 136],
      ].map(([x, y]) => (
        <path key={x} d={`M${x} ${y}c-4 6-5 9-5 11a5 5 0 0 0 10 0c0-2-1-5-5-11z`} fill={c.navy} opacity="0.75" />
      ))}

      {/* 保温材 */}
      <rect x="144" y="112" width="100" height="76" fill={c.wool} />
      <path d="M154 112v76M172 112v76M190 112v76M208 112v76M226 112v76" stroke="#e2b94e" strokeWidth="2" />
      <path d="M144 112h100M144 188h100" stroke={c.ink} strokeWidth="2" />

      {/* 外装 */}
      <rect x="244" y="104" width="104" height="92" fill={c.white} stroke={c.ink} strokeWidth="2" />
      <path d="M276 104v92M316 104v92" stroke={c.navy} strokeWidth="4" />

      {/* 断面 */}
      <ellipse cx="348" cy="150" rx="15" ry="46" fill={c.white} stroke={c.ink} strokeWidth="2" />
      <ellipse cx="348" cy="150" rx="12" ry="38" fill={c.wool} />
      <ellipse cx="348" cy="150" rx="8" ry="26" fill={c.steel} />
      <ellipse cx="348" cy="150" rx="6" ry="22" fill={c.dark} />

      {/* ラベル */}
      <g fontSize="13" fill={c.ink} fontWeight="700" textAnchor="middle">
        <path d="M92 182v40M194 194v28M296 202v20" stroke={c.ink} strokeWidth="1.5" />
        <circle cx="92" cy="182" r="3" fill={c.ink} />
        <circle cx="194" cy="194" r="3" fill={c.ink} />
        <circle cx="296" cy="202" r="3" fill={c.ink} />
        <text x="92" y="240">ダクト</text>
        <text x="194" y="240">保温材</text>
        <text x="296" y="240">外装</text>
      </g>
      <path d="M40 266h320" stroke={c.steel} strokeWidth="1.5" />
      <path d="M352 260l8 6-8 6" fill="none" stroke={c.steel} strokeWidth="1.5" />
    </>
  );
}

const scenes: Record<WorkIcon, () => React.ReactNode> = {
  duct: Duct,
  heavy: Heavy,
  scaffold: Scaffold,
  insulation: Insulation,
};

export default function WorkIllust({ name, label }: { name: WorkIcon; label: string }) {
  const Scene = scenes[name];
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} className="h-full w-full">
      <Scene />
    </svg>
  );
}
