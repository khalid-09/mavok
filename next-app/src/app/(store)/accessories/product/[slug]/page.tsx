interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const slug = (await params).slug;

  return <div>{slug}</div>;
};

export default ProductPage;
