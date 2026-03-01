"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/shared/ui/Button";
import { ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { Product } from "@/core/types";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, hasItem } = useCartStore();
  const inCart = hasItem(product.id);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 hover:bg-secondary transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-6 py-3 font-semibold min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-4 py-3 hover:bg-secondary transition-colors"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Button
        size="lg"
        onClick={handleAdd}
        disabled={product.stock === 0 || added}
        className="w-full"
      >
        {added ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Добавлено
          </>
        ) : inCart ? (
          <>
            <ShoppingBag className="mr-2 h-5 w-5" />
            Добавить ещё
          </>
        ) : (
          <>
            <ShoppingBag className="mr-2 h-5 w-5" />
            В корзину
          </>
        )}
      </Button>
    </div>
  );
}
