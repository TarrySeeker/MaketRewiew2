"use client";

import { useWishlistStore } from "@/store/wishlist";
import { ProductGrid } from "@/features/catalog/ProductGrid";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";

export default function WishlistPage() {
    const { items, clearWishlist } = useWishlistStore();

    return (
        <main className="min-h-screen bg-background pt-32 pb-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Избранное</h1>
                        <p className="text-muted-foreground text-lg">
                            {items.length} {items.length === 1 ? 'товар' : (items.length > 1 && items.length < 5) ? 'товара' : 'товаров'}
                        </p>
                    </div>

                    {items.length > 0 && (
                        <Button variant="outline" onClick={clearWishlist}>
                            Очистить список
                        </Button>
                    )}
                </div>

                {items.length > 0 ? (
                    <ProductGrid products={items} />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-secondary/20 rounded-2xl border border-border"
                    >
                        <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">
                            Ваш список пуст
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Добавляйте понравившиеся товары в избранное, чтобы легко находить их позже.
                        </p>
                        <Link href="/catalog">
                            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-white/90">
                                Перейти в каталог
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
