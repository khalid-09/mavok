"use client";

import { useCartStore } from "@/stores/cart-store";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect } from "react";

const CartStateWrapper = ({ children }: { children: ReactNode }) => {
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  // Handle rehydration
  useEffect(() => {
    // Trigger rehydration
    useCartStore.persist.rehydrate();

    // Set hydrated state after rehydration
    const unsubFinishHydration = useCartStore.persist.onFinishHydration(() => {
      useCartStore.getState().setHasHydrated(true);
    });

    return () => {
      unsubFinishHydration();
    };
  }, []);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default CartStateWrapper;
