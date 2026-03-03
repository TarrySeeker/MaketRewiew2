import { mockDbInfo } from "@/core/mocks/data";
import { Package, FolderTree, ShoppingBag, ArrowUpRight, Activity } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const productsCount = mockDbInfo.getProducts().length;
  const categoriesCount = mockDbInfo.getCategories().length;
  const ordersCount = 0;

  const stats = [
    {
      title: "Товары",
      value: productsCount || 0,
      icon: Package,
      href: "/admin/products",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
    },
    {
      title: "Категории",
      value: categoriesCount || 0,
      icon: FolderTree,
      href: "/admin/categories",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
    },
    {
      title: "Заказы",
      value: ordersCount || 0,
      icon: ShoppingBag,
      href: "/admin/orders",
      colSpan: "col-span-1 md:col-span-4 lg:col-span-6",
    },
  ];

  return (
    <div className="space-y-12">
      <header className="flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-white mb-2">Обзор</h1>
          <p className="text-white/40 tracking-widest uppercase text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Системная аналитика
          </p>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className={`group relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 p-8 transition-all hover:bg-white/[0.04] hover:border-white/20 backdrop-blur-xl ${stat.colSpan}`}
            >
              {/* Subtle top glare */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex flex-col h-full justify-between gap-12">
                <div className="flex items-start justify-between">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <Icon className="h-6 w-6 text-white/80" />
                  </div>
                  <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors h-6 w-6" />
                </div>

                <div>
                  <p className="text-white/40 uppercase tracking-widest text-xs mb-2 font-medium">
                    {stat.title}
                  </p>
                  <p className="font-serif text-5xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Placeholder widget for more aesthetics */}
        <div className="col-span-1 md:col-span-4 lg:col-span-6 rounded-3xl bg-primary/5 border border-primary/20 p-8 relative overflow-hidden flex items-center justify-center min-h-[400px]">
          {/* Animated decorative graph or text */}
          <div className="z-10 text-center">
            <h3 className="font-serif text-3xl font-bold text-white mb-4">Система активна</h3>
            <p className="text-primary/70 max-w-sm mx-auto">
              Архитектура магазина работает в штатном режиме. Ожидаются поступления новых эксклюзивных товаров коллекции Авангард.
            </p>
          </div>
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}
