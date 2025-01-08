import { ReactLenis } from "@/lib/lenis";

const SmoothScrolling = ({ children }: { children: React.ReactNode }) => {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.2,
    smoothTouch: false,
    smooth: true,
  };
  return (
    <ReactLenis options={lenisOptions} root>
      {children}
    </ReactLenis>
  );
};

export default SmoothScrolling;
