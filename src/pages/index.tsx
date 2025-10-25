import { subtitle, title } from "@/components/primitives";
import { DefaultLayout } from "@/layouts/default";

export const IndexPage = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Wat Geef Ik?</h1>
          <h2 className={subtitle()}>
            Vind het juiste bedrag voor elk cadeau. 🎁
          </h2>
        </div>
      </section>
    </DefaultLayout>
  );
};
