/** A7 写真の上の帯。画面に入ると 1 本ずつずれて下へ抜ける（親は position: relative / overflow: hidden） */
export default function Cover({ color }: { color?: string }) {
  return (
    <div className="c-cover js-reveal" aria-hidden="true" style={color ? ({ "--cover-color": color } as React.CSSProperties) : undefined}>
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
