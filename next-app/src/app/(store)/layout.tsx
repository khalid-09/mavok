import Navbar from "@/components/navbar";
import { getNavBarData } from "@/lib/queries/home-page-queries";

const StoreLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const data = await getNavBarData();
  return (
    <>
      <Navbar navbarData={data} />
      {children}
    </>
  );
};

export default StoreLayout;
