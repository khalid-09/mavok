import { getAboutData } from "@/lib/queries/home-page-queries";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import {
  Box,
  BoxContent,
  BoxDescription,
  BoxHeader,
  BoxTitle,
} from "../ui/box";

/**
 * About Section
 * Displays a title and description with a video (no video in directus currently so showing an image).
 */

const AboutSection = async () => {
  const data = await getAboutData();

  return (
    <section className="bg-primaryDark px-4 pb-10 pt-20 text-white md:p-30">
      <Box>
        <BoxHeader>
          <BoxTitle>{data.heading}</BoxTitle>
          <BoxDescription className="mx-auto max-w-[51.125rem]">
            {data.description}
          </BoxDescription>
        </BoxHeader>
        <BoxContent className="relative h-[12.5rem] w-full md:h-[37.5rem]">
          <Image
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${data.video}`}
            alt="video"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute object-cover"
          />
          <div className="absolute inset-0 bg-[hsla(0,0%,4%,0.35)] backdrop-blur-[8px]"></div>
          <div className="absolute inset-0 m-auto flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/25 backdrop-blur-lg md:size-16">
            <FaPlay className="size-4 md:size-6" />
          </div>
        </BoxContent>
      </Box>
    </section>
  );
};

export default AboutSection;
