"use client";

import { useCartStore } from "@/store/cart";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";
import { formatPrice } from "@/core/utils/format";
import { Trash2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl font-bold mb-6">Корзина пуста</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Добавьте понравившуюся мебель из каталога
            </p>
            <Link href="/catalog">
              <Button size="lg">Перейти в каталог</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-5xl font-bold">Корзина</h1>
            <Button variant="outline" onClick={clearCart}>
              Очистить
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.product.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 128px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                            Нет фото
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif font-semibold text-lg sm:text-xl mb-2 line-clamp-2">
                              {item.product.title}
                            </h3>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="p-2 -mr-2 -mt-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive shrink-0"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.product.material && (
                              <span className="text-xs bg-secondary px-2 py-1 rounded">
                                {item.product.material}
                              </span>
                            )}
                            {item.product.color && (
                              <span className="text-xs bg-secondary px-2 py-1 rounded">
                                {item.product.color}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="px-3 py-2 hover:bg-secondary transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="px-3 py-2 hover:bg-secondary transition-colors"
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-left sm:text-right w-full sm:w-auto">
                            <p className="font-serif text-xl sm:text-2xl font-bold text-primary">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {formatPrice(item.product.price)} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-serif text-2xl font-semibold mb-6">Итого</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Товары:</span>
                      <span>{formatPrice(getTotal())}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Доставка:</span>
                      <span>Рассчитается при оформлении</span>
                    </div>
                  </div>

                  <div className="border-t pt-6 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="font-serif text-lg font-semibold">Всего:</span>
                      <span className="font-serif text-3xl font-bold text-primary">
                        {formatPrice(getTotal())}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button size="lg" className="w-full">
                      Оформить заказ
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
