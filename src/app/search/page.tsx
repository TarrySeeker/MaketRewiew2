import { createClient } from "@/core/supabase/server";
import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";
import { ProductGrid } from "@/features/catalog/ProductGrid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  const supabase = await createClient();

  let products = [];

  if (query.length >= 2) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .or(`title.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%,material.ilike.%${query}%`)
      .limit(50);

    products = data || [];
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl font-bold mb-8">Поиск</h1>

          <form action="/search" method="GET" className="mb-12">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Найти мебель..."
              className="w-full max-w-2xl px-6 py-4 border rounded-xl bg-background/50 focus:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg"
              autoFocus
            />
          </form>

          {query.length < 2 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Введите минимум 2 символа для поиска
              </p>
            </div>
          ) : products.length > 0 ? (
            <div>
              <p className="text-muted-foreground mb-8">
                Найдено: <span className="font-semibold text-foreground">{products.length}</span>
              </p>

              <ProductGrid products={products} />
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                По запросу &quot;{query}&quot; ничего не найдено
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
