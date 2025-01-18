import Faqs from "@/components/faqs";
import AboutSection from "@/components/home-page/about-section";
import HeroSection from "@/components/home-page/hero-section";
import InsideBoxSection from "@/components/home-page/inisde-box-section";

const Page = () => {
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

// Landing Page
