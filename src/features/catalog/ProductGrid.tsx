"use client";

import Link from "next/link";
import { Card, CardContent } from "@/shared/ui/Card";
import { formatPrice } from "@/core/utils/format";
import { Product } from "@/core/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          Товары не найдены
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden group">
            <div className="aspect-square bg-secondary/20 overflow-hidden">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">Нет фото</span>
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <h3 className="font-serif font-semibold text-xl mb-2 line-clamp-2">
                {product.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {product.material && (
                  <span className="text-xs bg-secondary px-2 py-1 rounded">
                    {product.material}
                  </span>
                )}
                {product.color && (
                  <span className="text-xs bg-secondary px-2 py-1 rounded">
                    {product.color}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.old_price && (
                  <span className="text-sm line-through text-muted-foreground">
                    {formatPrice(product.old_price)}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
