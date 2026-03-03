import { mockDbInfo } from "@/core/mocks/data";
import { notFound } from "next/navigation";
import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";
import { AddToCart } from "@/features/product/AddToCart";
import { formatPrice } from "@/core/utils/format";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = mockDbInfo.getProductById(id);

  if (!product) {
    return { title: "Товар не найден" };
  }

  return {
    title: product.seo_title || `${product.title} — купить в магазине Мебель`,
    description:
      product.seo_description ||
      product.description ||
      `${product.title}. ${product.material ? `Материал: ${product.material}.` : ""} Доставка СДЭК.`,
    openGraph: {
      title: product.title,
      description: product.description || "",
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = mockDbInfo.getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Галерея */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/20">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground">Нет изображения</span>
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((img: string, i: number) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden bg-secondary/20"
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Информация */}
            <div>
              <h1 className="font-serif text-4xl font-bold mb-4">{product.title}</h1>

              {product.brand && (
                <p className="text-muted-foreground mb-6">
                  Производитель: {product.brand}
                </p>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-5xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.old_price && (
                  <span className="text-xl line-through text-muted-foreground">
                    {formatPrice(product.old_price)}
                  </span>
                )}
              </div>

              {product.stock > 0 ? (
                <p className="text-accent font-medium mb-6">
                  ✓ В наличии: {product.stock} шт.
                </p>
              ) : (
                <p className="text-destructive font-medium mb-6">Нет в наличии</p>
              )}

              <AddToCart product={product} />

              {product.description && (
                <div className="mt-12">
                  <h2 className="font-serif text-2xl font-semibold mb-4">
                    Описание
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Характеристики */}
              <div className="mt-12">
                <h2 className="font-serif text-2xl font-semibold mb-6">
                  Характеристики
                </h2>
                <dl className="space-y-4">
                  {product.sku && (
                    <div className="flex justify-between border-b pb-4">
                      <dt className="text-muted-foreground">Артикул</dt>
                      <dd className="font-medium">{product.sku}</dd>
                    </div>
                  )}
                  {product.material && (
                    <div className="flex justify-between border-b pb-4">
                      <dt className="text-muted-foreground">Материал</dt>
                      <dd className="font-medium">{product.material}</dd>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex justify-between border-b pb-4">
                      <dt className="text-muted-foreground">Цвет</dt>
                      <dd className="font-medium">{product.color}</dd>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between border-b pb-4">
                      <dt className="text-muted-foreground">Размеры (Ш×В×Г)</dt>
                      <dd className="font-medium">
                        {product.dimensions.width}×{product.dimensions.height}×
                        {product.dimensions.depth} {product.dimensions.unit || "см"}
                      </dd>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between border-b pb-4">
                      <dt className="text-muted-foreground">Вес</dt>
                      <dd className="font-medium">{product.weight} кг</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
