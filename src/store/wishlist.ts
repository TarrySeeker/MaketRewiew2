import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/core/types";

interface WishlistState {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                const currentItems = get().items;
                const exists = currentItems.some((item) => item.id === product.id);

                if (!exists) {
                    set({ items: [...currentItems, product] });
                }
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
            },

            isInWishlist: (productId) => {
                return get().items.some((item) => item.id === productId);
            },

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: "wishlist-storage", // stores in localStorage
        }
    )
);
