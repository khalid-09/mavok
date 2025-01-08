import { getFaqData } from "@/lib/queries/home-page-queries";
import { cn } from "@/lib/utils";
import { roboto } from "./home-page/about-section";

interface FaqsProps {
  shouldBeDark?: boolean;
}

const Faqs = async ({ shouldBeDark = false }: FaqsProps) => {
  const { content } = await getFaqData();

  return (
    <section
      className={cn(
        "space-y-6 px-4 py-10 text-white md:space-y-16 md:px-30 md:py-[5.5rem]",
        shouldBeDark && "bg-primaryDark",
      )}
    >
      <div className="space-y-2">
        <p className="text-sm font-bold uppercase text-primaryGreen md:text-base">
          FAQS
        </p>
        <h4
          className={cn(
            "text-[2rem] font-bold uppercase leading-10 -tracking-1% md:text-[2.5rem]",
            !shouldBeDark && "text-black",
          )}
        >
          frequently asked questions
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-6 md:gap-16 customFooter:grid-cols-1">
        {content.map((faq, index) => (
          <div key={index} className="space-y-2">
            <h6
              className={cn(
                "text-base font-bold leading-5 -tracking-1% md:text-2xl",
                !shouldBeDark && "text-black",
              )}
            >
              {faq.question}
            </h6>
            <p
              className={`text-primaryLight ${roboto.className} text-lg antialiased`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
