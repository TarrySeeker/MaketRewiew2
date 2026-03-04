"use client";

import Link from "next/link";
import { formatPrice } from "@/core/utils/format";
import { Product } from "@/core/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-40 border border-border bg-secondary/5">
        <p className="text-muted-foreground font-serif tracking-widest uppercase text-sm">
          Ничего не найдено
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
      {products.map((product, i) => (
        <Link key={product.id} href={`/product/${product.id}`} className="group">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="flex flex-col"
          >
            <div className="relative aspect-[3/4] w-full bg-secondary/10 overflow-hidden isolate mb-6">
              {product.images[0] ? (
                <>
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  {/* Glitch Overlay Effect */}
                  <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-10" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground/50 tracking-widest uppercase text-xs font-serif">Empty</span>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <h3 className="font-serif text-2xl font-bold mb-1 tracking-tight group-hover:text-primary transition-colors">
                {product.title}
              </h3>

              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground mb-4">
                {product.material && <span>{product.material}</span>}
                {product.material && product.color && <span>&mdash;</span>}
                {product.color && <span>{product.color}</span>}
              </div>

              <div className="flex items-end gap-3">
                <span className="font-serif text-xl text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.old_price && (
                  <span className="text-sm line-through text-muted-foreground/50">
                    {formatPrice(product.old_price)}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
