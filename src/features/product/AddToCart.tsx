"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/shared/ui/Button";
import { ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { Product } from "@/core/types";
import { motion, AnimatePresence } from "framer-motion";
import { WishlistButton } from "./WishlistButton";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [flyImages, setFlyImages] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { addItem, hasItem } = useCartStore();

  const inCart = hasItem(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    addItem(product, quantity);
    setAdded(true);

    // Trigger levitating animation
    const id = Date.now();
    setFlyImages(prev => [...prev, id]);

    setTimeout(() => {
      setFlyImages(prev => prev.filter(imgId => imgId !== id));
      setAdded(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center gap-6">
        {/* Quantity Controls */}
        <div className="flex items-center border border-border/50 rounded-none bg-background">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-4 hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-6 py-4 font-serif text-lg font-bold min-w-[4rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-4 py-4 hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Wishlist Heart */}
        <WishlistButton product={product} />
      </div>

      <div className="relative">
        <Button
          size="lg"
          onClick={handleAdd}
          disabled={product.stock === 0 || added}
          className="w-full relative overflow-hidden group bg-primary text-primary-foreground tracking-widest uppercase text-sm font-medium py-8 rounded-none transition-all duration-500 hover:bg-foreground hover:text-background"
        >
          {added ? (
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center"
            >
              <Check className="mr-3 h-5 w-5" />
              Добавлено
            </motion.span>
          ) : isMounted && inCart ? (
            <span className="flex items-center">
              <ShoppingBag className="mr-3 h-5 w-5 opacity-70" />
              Добавить ещё
            </span>
          ) : (
            <span className="flex items-center">
              <ShoppingBag className="mr-3 h-5 w-5" />
              В корзину
            </span>
          )}

          {/* Subtle Hover Glare */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>

        {/* Levitating Image Catcher */}
        <AnimatePresence>
          {flyImages.map(id => (
            <motion.img
              key={id}
              src={product.images?.[0] || ""}
              initial={{
                opacity: 1,
                scale: 0.5,
                x: 0,
                y: 0,
                position: "absolute",
                top: "50%",
                left: "20%",
                zIndex: 50,
                borderRadius: "10%"
              }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0.5, 0.8, 0.2],
                x: [0, 200, 500], // Random estimation towards top right
                y: [0, -200, -800],
                rotate: [0, 45, 90]
              }}
              transition={{ duration: 1.2, ease: "anticipate" }}
              className="w-24 h-24 object-cover shadow-2xl pointer-events-none"
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
