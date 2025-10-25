import { h1, intro } from "@/components/typography";
import { DefaultLayout } from "@/layouts/default";

export const IndexPage = () => {
  return (
    <DefaultLayout>
      <section className="py-8 md:py-10">
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <h1 className={h1()}>Wat Geef Ik?</h1>
          <p className={intro()}>Vind het juiste bedrag voor elk cadeau. 🎁</p>
        </div>
      </section>
    </DefaultLayout>
  );
};
