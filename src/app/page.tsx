import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { createClient } from "@/core/supabase/server";
import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";
import { formatPrice } from "@/core/utils/format";
import { 
  Sofa, 
  Armchair, 
  Bed,
  Lamp,
  ShoppingBag,
  Truck,
  Shield,
  Heart
} from "lucide-react";

const categories = [
  { name: "Диваны и кресла", icon: Sofa, slug: "divany", color: "text-rose-400" },
  { name: "Спальная мебель", icon: Bed, slug: "spalnya", color: "text-blue-300" },
  { name: "Гостиная", icon: Lamp, slug: "gostinaya", color: "text-amber-300" },
  { name: "Кухни", icon: Armchair, slug: "kuhni", color: "text-green-300" },
];

const features = [
  {
    icon: Truck,
    title: "Бесплатная доставка",
    description: "При заказе от 50 000 ₽",
  },
  {
    icon: Shield,
    title: "Гарантия 2 года",
    description: "На всю мебель",
  },
  {
    icon: Heart,
    title: "Собственное производство",
    description: "Качество под контролем",
  },
  {
    icon: ShoppingBag,
    title: "Удобная оплата",
    description: "Наличными или картой",
  },
];

export default async function HomePage() {
  const supabase = await createClient();

  // Получаем избранные товары
  const { data: featured } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("featured", true)
    .limit(6);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-secondary/30 to-background py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-5xl lg:text-7xl font-bold mb-6 text-balance">
                Уютная мебель для вашего дома
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 text-balance">
                Качественная мебель с доставкой по всей России. Создайте интерьер вашей мечты вместе с нами.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/catalog">
                  <Button size="lg" className="w-full sm:w-auto">
                    Смотреть каталог
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    О нас
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12">
              Категории мебели
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link key={cat.slug} href={`/catalog/${cat.slug}`}>
                    <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full">
                      <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                        <div className={`p-4 rounded-2xl bg-secondary/50 ${cat.color}`}>
                          <Icon className="h-10 w-10" />
                        </div>
                        <h3 className="font-serif font-semibold text-lg">{cat.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featured && featured.length > 0 && (
          <section className="py-16 lg:py-24 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-4xl font-bold text-center mb-12">
                Избранное
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featured.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden">
                      <div className="aspect-square bg-secondary/30 flex items-center justify-center overflow-hidden">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <span className="text-muted-foreground">Нет изображения</span>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-serif font-semibold text-xl mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        {product.material && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {product.material}
                          </p>
                        )}
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
            </div>
          </section>
        )}

        {/* Features */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="text-center">
                    <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl font-bold mb-4">
              Не нашли то, что искали?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами, и мы поможем подобрать идеальную мебель для вашего интерьера
            </p>
            <Link href="/contacts">
              <Button size="lg" variant="primary">
                Связаться с нами
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
