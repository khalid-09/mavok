import Faqs from "@/components/faqs";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const slug = (await params).slug;

  return (
    <div>
      {slug}
      <Faqs />
    </div>
  );
};

export default ProductPage;
