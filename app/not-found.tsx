import Button from "@/components/Button";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero en="404 Not Found" ja="ページが見つかりません" />
      <section className="l-section">
        <div className="l-container text-center">
          <p className="leading-loose">お探しのページは移動または削除された可能性があります。</p>
          <div className="mt-10">
            <Button href="/">トップへ戻る</Button>
          </div>
        </div>
      </section>
    </>
  );
}
