"use client";

import { useEffect, useState } from "react";
import { mockDbInfo } from "@/core/mocks/data";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { Category } from "@/core/types";
import { Pencil, Trash2, Plus, MoveUp, MoveDown } from "lucide-react";
import Image from "next/image";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 200));
    setCategories([...mockDbInfo.getCategories()].sort((a, b) => a.sort_order - b.sort_order));
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить категорию? Все товары в ней будут недоступны.")) return;
    mockDbInfo.deleteCategory(id);
    fetchCategories();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: (formData.get("description") as string) || null,
      image: (formData.get("image") as string) || null,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    };

    if (editingCategory) {
      mockDbInfo.updateCategory(editingCategory.id, data);
    } else {
      mockDbInfo.addCategory(data);
    }

    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
  };

  const moveCategory = async (id: string, direction: "up" | "down") => {
    const index = categories.findIndex((c) => c.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === categories.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newCategories = [...categories];
    [newCategories[index], newCategories[newIndex]] = [
      newCategories[newIndex],
      newCategories[index],
    ];

    newCategories.forEach((cat, i) => {
      mockDbInfo.updateCategory(cat.id, { sort_order: i });
    });

    fetchCategories();
  };

  if (loading) {
    return <div className="text-center py-20">Загрузка...</div>;
  }

  if (showForm || editingCategory) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-4xl font-bold">
            {editingCategory ? "Редактирование категории" : "Новая категория"}
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(false);
              setEditingCategory(null);
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
                    name="name"
                    defaultValue={editingCategory?.name}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingCategory?.slug}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Описание</label>
                <textarea
                  name="description"
                  defaultValue={editingCategory?.description || ""}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">URL изображения</label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={editingCategory?.image || ""}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Порядок сортировки</label>
                  <input
                    type="number"
                    name="sort_order"
                    defaultValue={editingCategory?.sort_order || 0}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit">Сохранить</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCategory(null);
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
        <h1 className="font-serif text-4xl font-bold">Категории ({categories.length})</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить категорию
        </Button>
      </div>

      <div className="space-y-4">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Card key={category.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {category.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">/{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveCategory(category.id, "up")}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveCategory(category.id, "down")}
                        disabled={index === categories.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
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
            <p className="text-muted-foreground mb-4">Категорий пока нет</p>
            <Button onClick={() => setShowForm(true)}>Добавить первую категорию</Button>
          </div>
        )}
      </div>
    </div>
  );
}
