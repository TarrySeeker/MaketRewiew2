import { createClient } from "@/core/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/shared/ui/Card";
import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";

export default async function CatalogPage() {
  const supabase = await createClient();
  
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .order("sort_order");

  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl font-bold mb-12 text-center">
            Каталог мебели
          </h1>

          {categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link key={category.id} href={`/catalog/${category.slug}`}>
                  <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden group">
                    {category.image && (
                      <div className="aspect-video bg-secondary/20 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h2 className="font-serif text-2xl font-semibold mb-2">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      <p className="text-primary font-medium mt-4 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Смотреть товары
                        <span>→</span>
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Категории пока не добавлены
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
