import { FaTruck } from "react-icons/fa";
import Description from "../description";
import { CalendarIcon, Globe2Icon, ShieldCheckIcon } from "lucide-react";

const features = [
  {
    icon: FaTruck,
    title: "FAST DELIVERY.",
    desc: "We know speed matters. That's why we offer fast shipping solutions to get your order to you as quickly as possible.",
  },
  {
    icon: Globe2Icon,
    title: "LOCAL AUSTRALIAN SUPPORT.",
    desc: "Our customer support team is based right here in Australia. Reach out to us anytime via chat, phone, or email for prompt, friendly assistance.",
  },
  {
    icon: ShieldCheckIcon,
    title: "5 YEAR WARRANTY. PEACE OF MIND.",
    desc: "We stand by the quality of our products. Enjoy a 5-year warranty on all purchases, giving you peace of mind for years to come.",
  },
  {
    icon: CalendarIcon,
    title: "30 DAY RETURNS. STRESS-FREE.",
    desc: "We offer a 30-day return policy to ensure you're completely satisfied with your purchase. Returns are quick, easy, and stress-free.",
  },
];

const ProductFeatures = () => {
  return (
    <section className="md:px-30 md:py-22">
      <div className="content md:space-y-16">
        <div className="space-y-1.5 md:space-y-4">
          <p className="text-center font-bold -tracking--1% md:text-4.5xl">
            MAVOK 220MP
          </p>
          <Description className="mx-auto max-w-[55.5rem]">
            Engineered to deliver a seamless and unparalleled welding and
            cutting experience, the MAVOK 220MP stands in a league of its own.
            Facing the challenge of incorporating every feature our customers
            desire into a single machine, we have achieved the extraordinary.
          </Description>
          <Description className="mx-auto max-w-[51.125rem]">
            The MAVOK 220MP combines all essential processes with innovative
            quick-switch technology, making it the most advanced machine on the
            market.
          </Description>
        </div>
        <div className="grid-row-2 grid grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-6 p-8"
            >
              <feature.icon className="h-12 w-12 text-primaryGreen" />
              <p className="text-lg font-bold">{feature.title}</p>
              <p className="text-center text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
