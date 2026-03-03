"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";
import { formatPrice } from "@/core/utils/format";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockOrderNumber = 'ORD-' + Date.now().toString().slice(-6);

      clearCart();
      alert(`Заказ ${mockOrderNumber} успешно оформлен!\n\nМы свяжемся с вами в ближайшее время.`);
      router.push("/");
    } catch (error: any) {
      console.error("Order creation error:", error);
      alert("Ошибка при создании заказа: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl font-bold mb-12 text-center">
            Оформление заказа
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Контактные данные</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">ФИО *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+7 (XXX) XXX-XX-XX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Город *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Адрес доставки
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                        rows={3}
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="Укажите адрес или выберите пункт выдачи СДЭК"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Ваш заказ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="flex-1">
                          {item.product.title} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Товары:</span>
                        <span>{formatPrice(getTotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Доставка:</span>
                        <span>Рассчитается менеджером</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-baseline mb-6">
                        <span className="font-serif text-lg font-semibold">Итого:</span>
                        <span className="font-serif text-3xl font-bold text-primary">
                          {formatPrice(getTotal())}
                        </span>
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? "Оформляем..." : "Подтвердить заказ"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
