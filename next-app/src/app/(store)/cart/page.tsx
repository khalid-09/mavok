import { getFooterData } from "@/lib/queries/home-page-queries";
import CartProducts from "@/components/cart-page/cart-products";
import CartSummary from "@/components/cart-page/cart-summary";
import CartStateWrapper from "@/components/cart-page/cart-state-wrapper";

const CartPage = async () => {
  const data = await getFooterData();

  return (
    <section className="bg-secondaryLight md:px-30 md:pb-20 md:pt-10">
      <div className="content md:space-y-6">
        <h6 className="text-2xl font-bold -tracking--1%">MY CART</h6>
        <CartStateWrapper>
          <div className="flex w-full gap-12">
            <CartProducts />
            <CartSummary data={data} />
          </div>
        </CartStateWrapper>
      </div>
    </section>
  );
};

export default CartPage;
