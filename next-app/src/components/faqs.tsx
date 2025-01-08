import { getFaqData } from "@/lib/queries/home-page-queries";
import { cn } from "@/lib/utils";
import Description from "./description";

interface FaqsProps {
  shouldBeDark?: boolean;
}

/**
 * FAQS Component
 * Displays the FAQS (coming form directus), component can be dark or light
 */

const Faqs = async ({ shouldBeDark = false }: FaqsProps) => {
  const { content } = await getFaqData();

  return (
    <section
      className={cn(
        "px-4 py-10 text-white md:px-30 md:py-22",
        shouldBeDark && "bg-primaryDark",
      )}
    >
      <div className="content space-y-6 md:space-y-16">
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase text-primaryGreen md:text-base">
            FAQS
          </p>
          <h4
            className={cn(
              "text-3.5xl font-bold uppercase leading-10 -tracking--1% md:text-4.5xl",
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
                  "text-base font-bold leading-5 -tracking--1% md:text-2xl",
                  !shouldBeDark && "text-black",
                )}
              >
                {faq.question}
              </h6>
              <Description className="text-start text-lg">
                {faq.answer}
              </Description>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
