import Faqs from "@/components/faqs";
import Footer from "@/components/footer/footer";
import AboutSection from "@/components/home-page/about-section";
import HeroSection from "@/components/home-page/hero-section";

const Page = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Faqs shouldBeDark />
      <Footer />
    </>
  );
};

export default Page;
