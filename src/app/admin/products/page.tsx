import { createClient } from "@/core/supabase/server";
import { Card, CardContent } from "@/shared/ui/Card";
import Link from "next/link";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-8">Товары</h1>

      <div className="space-y-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        Нет фото
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-lg mb-1">
                      {product.title}
                    </h3>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      {product.material && <span>{product.material}</span>}
                      {product.color && <span>• {product.color}</span>}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-serif text-xl font-bold text-primary">
                      {product.price.toLocaleString()} ₽
                    </p>
                    <p className="text-sm text-muted-foreground">
                      В наличии: {product.stock}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Товаров пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
}
