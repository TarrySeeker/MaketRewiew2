"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/core/supabase/client";
import { Button } from "@/shared/ui/Button";
import { Home, Package, FolderTree, ShoppingBag, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/admin", label: "Дашборд", icon: Home },
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/categories", label: "Категории", icon: FolderTree },
  { href: "/admin/orders", label: "Заказы", icon: ShoppingBag },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  if (pathname === "/admin/login") {
    return children;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex bg-[#030303] text-foreground font-sans overflow-hidden">
      {/* Background Glows for Glassmorphism */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Sidebar - Glassmorphism */}
      <aside className="w-72 bg-white/[0.02] backdrop-blur-3xl border-r border-white/5 flex flex-col relative z-20">
        <div className="p-8 border-b border-white/5">
          <h2 className="font-serif text-2xl tracking-widest uppercase font-bold text-white flex items-center gap-2">
            Control
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </h2>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="block relative group"
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-active-nav"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center justify-between px-4 py-3 rounded-xl transition-colors z-10 ${isActive ? "text-white" : "text-white/40 hover:text-white/80"
                  }`}>
                  <div className="flex items-center gap-4">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium tracking-wide text-sm">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent border-white/10 text-white/50 hover:text-white hover:bg-white/5 tracking-widest uppercase text-xs rounded-xl h-12"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Выйти
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 px-10 py-12 scroll-smooth">
        <div className="max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
