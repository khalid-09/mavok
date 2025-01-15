import Faqs from "@/components/faqs";
import AboutSection from "@/components/home-page/about-section";
import HeroSection from "@/components/home-page/hero-section";
import InsideBoxSection from "@/components/home-page/inisde-box-section";
import { medusa } from "@/lib/medusa";

const Page = () => {
  medusa.store.product.list().then(({ products }) => {
    console.log(products[2].metadata);
  });
  return (
    <>
      <HeroSection />
      <AboutSection />
      <InsideBoxSection />
      <Faqs shouldBeDark />
    </>
  );
};

export default Page;
