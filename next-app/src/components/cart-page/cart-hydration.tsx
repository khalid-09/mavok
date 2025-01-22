"use client";

import { useCartStore } from "@/stores/cart-store";
import { useEffect } from "react";

export function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}
