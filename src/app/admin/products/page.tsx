"use client";

import { useEffect, useState } from "react";
import { mockDbInfo } from "@/core/mocks/data";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { Product, Category } from "@/core/types";
import { Pencil, Trash2, Plus } from "lucide-react";
import { formatPrice } from "@/core/utils/format";
import Image from "next/image";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));
    setProducts([...mockDbInfo.getProducts()]);
    setCategories([...mockDbInfo.getCategories()]);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить товар?")) return;
    mockDbInfo.deleteProduct(id);
    fetchData();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const images = formData.get("images") as string;
    const imagesArray = images ? images.split("\n").filter((url) => url.trim()) : [];

    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      old_price: formData.get("old_price") ? parseFloat(formData.get("old_price") as string) : null,
      stock: parseInt(formData.get("stock") as string),
      category_id: formData.get("category_id") as string,
      material: (formData.get("material") as string) || null,
      color: (formData.get("color") as string) || null,
      brand: (formData.get("brand") as string) || null,
      sku: (formData.get("sku") as string) || null,
      images: imagesArray,
      is_active: formData.get("is_active") === "on",
      featured: formData.get("featured") === "on",
    };

    if (editingProduct) {
      mockDbInfo.updateProduct(editingProduct.id, data);
    } else {
      mockDbInfo.addProduct(data);
    }

    setShowForm(false);
    setEditingProduct(null);
    fetchData();
  };

  if (loading) {
    return <div className="text-center py-20">Загрузка...</div>;
  }

  if (showForm || editingProduct) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-4xl font-bold">
            {editingProduct ? "Редактирование товара" : "Новый товар"}
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          >
            Отмена
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Название *</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingProduct?.title}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingProduct?.slug}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Описание</label>
                <textarea
                  name="description"
                  defaultValue={editingProduct?.description || ""}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Цена *</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingProduct?.price}
                    required
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Старая цена</label>
                  <input
                    type="number"
                    name="old_price"
                    defaultValue={editingProduct?.old_price || ""}
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Остаток *</label>
                  <input
                    type="number"
                    name="stock"
                    defaultValue={editingProduct?.stock || 0}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Категория *</label>
                  <select
                    name="category_id"
                    defaultValue={editingProduct?.category_id || ""}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium">Бренд</label>
                  <input
                    type="text"
                    name="brand"
                    defaultValue={editingProduct?.brand || ""}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Артикул</label>
                  <input
                    type="text"
                    name="sku"
                    defaultValue={editingProduct?.sku || ""}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Материал</label>
                  <input
                    type="text"
                    name="material"
                    defaultValue={editingProduct?.material || ""}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Цвет</label>
                  <input
                    type="text"
                    name="color"
                    defaultValue={editingProduct?.color || ""}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Изображения (по одной ссылке на строку)
                </label>
                <textarea
                  name="images"
                  defaultValue={editingProduct?.images?.join("\n") || ""}
                  rows={4}
                  placeholder="https://example.com/image1.jpg"
                  className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked={editingProduct?.is_active ?? true}
                    className="w-5 h-5"
                  />
                  <span>Активен</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={editingProduct?.featured}
                    className="w-5 h-5"
                  />
                  <span>Рекомендуемый</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit">Сохранить</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl font-bold">Товары ({products.length})</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
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
                      {!product.is_active && <span className="text-destructive">• Не активен</span>}
                      {product.featured && <span className="text-accent">• ⭐ Рекомендуемый</span>}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-serif text-xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-sm text-muted-foreground">В наличии: {product.stock}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">Товаров пока нет</p>
            <Button onClick={() => setShowForm(true)}>Добавить первый товар</Button>
          </div>
        )}
      </div>
    </div>
  );
}
