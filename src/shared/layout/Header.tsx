"use client";

import Link from "next/link";
import { Home, ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const wishlistItems = useWishlistStore((state) => state.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-serif text-2xl font-semibold text-foreground">
              Мебель
            </span>
          </Link>

          {/* Search - desktop */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Найти мебель..."
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background/50 focus:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/catalog"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Каталог
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                О нас
              </Link>
              <Link
                href="/contacts"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Контакты
              </Link>
            </nav>

            <Link href="/wishlist" className="relative group">
              <Heart className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
              {isMounted && wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative group">
              <ShoppingBag className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
              {isMounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Link>

            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-20 left-0 right-0 bottom-0 bg-background/98 backdrop-blur-md border-t border-border flex flex-col p-6 gap-6 z-[100] overflow-y-auto">
            <form onSubmit={(e) => { handleSearch(e); setIsMobileMenuOpen(false); }} className="w-full mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Найти мебель..."
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-secondary/50 focus:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <nav className="flex flex-col gap-6 text-xl font-serif">
              <Link
                href="/catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors"
              >
                Каталог
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors"
              >
                О нас
              </Link>
              <Link
                href="/contacts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors"
              >
                Контакты
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors flex items-center justify-between"
              >
                <span>Избранное</span>
                {isMounted && wishlistItems.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">{wishlistItems.length}</span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
