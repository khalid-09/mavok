import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  medusaId: string;
  directusId?: string;
  productTitle: string;
  variantTitle: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  addToCart: (
    medusaId: string,
    variantTitle: string,
    price: number,
    productTitle: string,
    directusId?: string,
  ) => void;
  removeFromCart: (medusaId: string, variantTitle: string) => void;
  updateQuantity: (
    medusaId: string,
    variantTitle: string,
    quantity: number,
  ) => void;
  getItemQuantity: (medusaId: string, variantTitle: string) => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          hasHydrated: state,
        });
      },

      addToCart: (medusaId, variantTitle, price, productTitle, directusId) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.medusaId === medusaId && item.variantTitle === variantTitle,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.medusaId === medusaId && item.variantTitle === variantTitle
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                medusaId,
                directusId,
                variantTitle,
                price,
                productTitle,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeFromCart: (medusaId, variantTitle) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.medusaId === medusaId && item.variantTitle === variantTitle
              ),
          ),
        }));
      },

      updateQuantity: (medusaId, variantTitle, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.medusaId === medusaId &&
                    item.variantTitle === variantTitle
                  ),
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.medusaId === medusaId && item.variantTitle === variantTitle
                ? { ...item, quantity }
                : item,
            ),
          };
        });
      },

      getItemQuantity: (medusaId, variantTitle) => {
        return (
          get().items.find(
            (item) =>
              item.medusaId === medusaId && item.variantTitle === variantTitle,
          )?.quantity || 0
        );
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        return state;
      },
    },
  ),
);
