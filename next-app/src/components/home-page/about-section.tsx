import { getAboutData } from "@/lib/queries/home-page-queries";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

const AboutSection = async () => {
  const data = await getAboutData();

  return (
    <section className="space-y-8 bg-primaryDark px-4 pb-10 pt-20 text-white md:space-y-16 md:p-30">
      <div className="space-y-3 md:space-y-4">
        <h4 className="text-center text-[2rem] font-bold uppercase -tracking-1% md:text-4xl">
          {data.heading}
        </h4>
        <p
          className={`${roboto.className} mx-auto max-w-[51.125rem] text-center text-primaryLight antialiased`}
        >
          {data.description}
        </p>
      </div>
      <div className="relative h-[12.5rem] w-full md:h-[37.5rem]">
        <Image
          src={`${process.env.DIRECTUS_API_ENDPOINT}/assets/${data.video}`}
          alt="video"
          fill
          className="absolute object-cover"
        />
        <div className="absolute inset-0 bg-[hsla(0,0%,4%,0.35)] backdrop-blur-[8px]"></div>
        <div className="absolute inset-0 m-auto flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/25 backdrop-blur-lg md:size-16">
          <FaPlay className="size-4 md:size-6" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
