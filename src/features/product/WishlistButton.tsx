"use client";

import { useState, useEffect } from "react";
import { useWishlistStore } from "@/store/wishlist";
import { Product } from "@/core/types";
import { Button } from "@/shared/ui/Button";
import { Heart } from "lucide-react";

export function WishlistButton({ product }: { product: Product }) {
    const { addItem, removeItem, isInWishlist } = useWishlistStore();

    // To avoid hydration mismatch, check if mounted
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const inWishlist = isInWishlist(product.id);

    const toggleWishlist = () => {
        if (inWishlist) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    };

    return (
        <Button
            variant="outline"
            size="lg"
            onClick={toggleWishlist}
            className={`relative overflow-hidden transition-all duration-300 w-14 p-0 flex items-center justify-center ${inWishlist ? "border-primary bg-primary/10" : ""
                }`}
        >
            <Heart
                className={`w-6 h-6 transition-colors duration-300 ${inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
            />
        </Button>
    );
}
