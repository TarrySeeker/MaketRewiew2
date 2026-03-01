import { createClient } from "@/core/supabase/server";
import { Card, CardContent } from "@/shared/ui/Card";
import { Package, FolderTree, ShoppingBag } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: productsCount },
    { count: categoriesCount },
    { count: ordersCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      title: "Товары",
      value: productsCount || 0,
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Категории",
      value: categoriesCount || 0,
      icon: FolderTree,
      color: "text-accent",
    },
    {
      title: "Заказы",
      value: ordersCount || 0,
      icon: ShoppingBag,
      color: "text-primary",
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-8">Дашборд</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="font-serif text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
