import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHeroData } from "@/lib/queries/home-page-queries";
import Navbar from "../navbar";
import { Button } from "../ui/button";

/**
 * HeroSection component
 * returns the hero section of the home page with the data fetched from the directus SDK from home_section collection
 */

const HeroSection = async () => {
  const data = await getHeroData();

  return (
    <section className="relative flex h-[56.25rem] w-full flex-col text-white customNav:justify-between">
      <Navbar navLinks={data.navLinks} />
      <div className="px-30 space-y-6 py-[13.125rem] customNav:space-y-4 customNav:px-4 customNav:pb-6 customNav:pt-20">
        <div className="max-w-[39.75rem] space-y-2">
          <h5 className="-tracking--1% line-clamp-1 text-2xl font-bold text-primaryGreen">
            {data.description}
          </h5>
          <h3 className="-tracking--1% line-clamp-3 text-5xl font-bold leading-[3.75rem] customNav:text-[2rem] customNav:leading-10">
            {data.heading}
          </h3>
        </div>
        <div className="flex gap-2 customNav:flex-col">
          {data.heroButton.map((button, index) => (
            <Button
              key={index}
              asChild
              className="group h-10 w-[8.75rem] rounded-[8px] bg-primaryGreen px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-primaryGreen/50 customNav:w-full"
            >
              <Link
                href={button.buttonLink}
                className="-tracking--1% text-sm font-bold uppercase"
              >
                {button.buttonText}
                <ArrowRight
                  className="transition-transform group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="px-30 flex justify-center py-8 customNav:hidden">
        {data.features.map((feature, index) => (
          <div key={index} className="w-full max-w-60 space-y-1 text-center">
            <h5 className="line-clamp-1 text-2xl font-bold uppercase leading-10">
              {feature.title}
            </h5>
            <p className="line-clamp-1 font-bold uppercase">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      <Image
        src={`${process.env.DIRECTUS_API_ENDPOINT}/assets/${data.heroImage}`}
        alt="Hero Background Image"
        fill
        className="absolute -z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black to-transparent opacity-70" />
    </section>
  );
};

export default HeroSection;
