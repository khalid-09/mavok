import {
  getFooterLinksData,
  getPaymentOptionsData,
} from "@/lib/queries/home-page-queries";
import NewsletterForm from "./newsletter-form";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { ChevronDown, LucideCopyright } from "lucide-react";
import instaIcon from "../../../public/socials/instaLogo.png";
import fbIcon from "../../../public/socials/fbLogo.png";
import tiktokIcon from "../../../public/socials/tiktokLogo.png";
import youtubeIcon from "../../../public/socials/youtubeLogo.png";
import Description from "../description";

const socials = [
  {
    icon: instaIcon,
    url: "https://www.instagram.com/",
    alt: "Instagram Icon",
  },
  {
    icon: fbIcon,
    url: "https://www.facebook.com/",
    alt: "Facebook Icon",
  },
  {
    icon: tiktokIcon,
    url: "https://www.tiktok.com/",
    alt: "Tiktok Icon",
  },
  {
    icon: youtubeIcon,
    url: "https://www.youtube.com/",
    alt: "Youtube Icon",
  },
];

/**
 * Footer component
 * shows the footer links and a newsletter form and social icons
 */

const Footer = async () => {
  const [footerLinks, data] = await Promise.all([
    getFooterLinksData(),
    getPaymentOptionsData(),
  ]);
  return (
    <footer className="px-4 py-10 md:px-30 md:pb-12 md:pt-20">
      <div className="content space-y-8 md:space-y-16">
        {/* Footer links  */}
        <div className="flex w-full flex-row gap-8 md:gap-14 customFooter:flex-col">
          <div className="grid w-full grid-cols-2 gap-8 lg:grid-cols-4">
            {footerLinks.map((link) => (
              <div
                key={link.id}
                className="flex w-full flex-col gap-3 md:gap-4"
              >
                <p className="font-bold uppercase -tracking-1%">{link.title}</p>
                <ul className="flex flex-col gap-3 text-primaryLight">
                  {link.links.map((link, index) => (
                    <li
                      className="transition-all duration-300 hover:scale-105 hover:text-primaryGreen"
                      key={index}
                    >
                      <Link href={link.url}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <NewsletterForm />
        </div>

        {/* Payment method images with social icons */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-3">
            <p className="text-xs font-bold -tracking-1%">
              PAYMENT METHODS WE ACCEPT
            </p>
            <div className="flex items-center gap-1.5">
              {data.paymentOptionImage.map((image) => (
                <div key={image.id} className="relative h-5 w-8 md:w-7">
                  <Image
                    src={`${process.env.DIRECTUS_API_ENDPOINT}/assets/${image.directus_files_id}`}
                    alt="Logo"
                    fill
                    className="absolute object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {socials.map((social, index) => (
              <Button key={index} variant="outline" size="icon" asChild>
                <Link href={social.url}>
                  <Image
                    src={social.icon}
                    alt={social.alt}
                    height={20}
                    width={20}
                  />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Current year */}
        <div className="space-y-8 md:space-y-10">
          <Separator className="border-[#E5E5E5]" />
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-1 text-primaryLight">
              <LucideCopyright size={16} />{" "}
              <Description>
                {new Date().getFullYear()} MAVOK. All right reserved
              </Description>
            </div>
            <div className="flex items-center gap-1 font-bold uppercase -tracking-1%">
              <span>English/Australia</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
