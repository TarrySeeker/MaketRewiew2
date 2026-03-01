"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/core/supabase/client";
import { Header } from "@/shared/layout/Header";
import { Footer } from "@/shared/layout/Footer";
import { ProductGrid } from "@/features/catalog/ProductGrid";
import { Filters } from "@/features/catalog/Filters";
import { Product, Category } from "@/core/types";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Фильтры
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [sortBy, setSortBy] = useState("created_at_desc");

  const [materials, setMaterials] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    setLoading(true);

    const { data: cat } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!cat) {
      setLoading(false);
      return;
    }

    setCategory(cat);

    const { data: prods } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", cat.id)
      .eq("is_active", true);

    if (prods) {
      setProducts(prods);

      const uniqueMaterials = Array.from(
        new Set(prods.map((p) => p.material).filter(Boolean))
      ) as string[];
      setMaterials(uniqueMaterials.sort());

      const uniqueColors = Array.from(
        new Set(prods.map((p) => p.color).filter(Boolean))
      ) as string[];
      setColors(uniqueColors.sort());

      const prices = prods.map((p) => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setMinPrice(min);
      setMaxPrice(max);
      setPriceMin(min);
      setPriceMax(max);
    }

    setLoading(false);
  };

  const filteredProducts = products
    .filter((p) => {
      if (p.price < priceMin || p.price > priceMax) return false;
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.material || "")) return false;
      if (selectedColors.length > 0 && !selectedColors.includes(p.color || "")) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "created_at_desc":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const handleReset = () => {
    setSelectedMaterials([]);
    setSelectedColors([]);
    setPriceMin(minPrice);
    setPriceMax(maxPrice);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!category) {
    return (
      <>
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Категория не найдена</h1>
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
          <h1 className="font-serif text-5xl font-bold mb-8">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground text-lg mb-12 max-w-3xl">
              {category.description}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Фильтры */}
            <aside className="lg:col-span-1">
              <Filters
                materials={materials}
                colors={colors}
                selectedMaterials={selectedMaterials}
                selectedColors={selectedColors}
                priceMin={priceMin}
                priceMax={priceMax}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMaterialToggle={(material) =>
                  setSelectedMaterials((prev) =>
                    prev.includes(material)
                      ? prev.filter((m) => m !== material)
                      : [...prev, material]
                  )
                }
                onColorToggle={(color) =>
                  setSelectedColors((prev) =>
                    prev.includes(color)
                      ? prev.filter((c) => c !== color)
                      : [...prev, color]
                  )
                }
                onPriceChange={(min, max) => {
                  setPriceMin(min);
                  setPriceMax(max);
                }}
                onReset={handleReset}
              />
            </aside>

            {/* Товары */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Найдено: <span className="font-semibold text-foreground">{filteredProducts.length}</span>
                </p>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg bg-card text-sm"
                >
                  <option value="created_at_desc">Сначала новые</option>
                  <option value="price_asc">Сначала дешёвые</option>
                  <option value="price_desc">Сначала дорогие</option>
                </select>
              </div>

              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
