"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { formatPrice } from "@/core/utils/format";

export function FeaturedSlider({ products }: { products: any[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the background text
    const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden bg-background">
            {/* Huge Background Typography */}
            <motion.div
                style={{ y }}
                className="absolute top-1/4 left-0 w-full text-center pointer-events-none opacity-[0.03] flex items-center justify-center whitespace-nowrap overflow-visible z-0"
            >
                <h2 className="font-serif text-[15vw] font-bold tracking-tighter uppercase leading-none">
                    Exclusive New Arrivals
                </h2>
            </motion.div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex justify-between items-end mb-16">
                    <h3 className="font-serif text-4xl md:text-5xl font-bold">Избранное</h3>
                    <Link href="/catalog" className="text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors hidden md:block">
                        Смотреть всё
                    </Link>
                </div>

                {/* Horizontal scroll container */}
                <div className="flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar">
                    {products.map((product, index) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="group min-w-[300px] md:min-w-[400px] snap-center snap-always flex-shrink-0"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative aspect-[3/4] bg-secondary/30 mb-6 overflow-hidden"
                            >
                                {product.images?.[0] ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif">
                                        Нет изображения
                                    </div>
                                )}

                                {/* Glitch Overlay Effect */}
                                <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                            </motion.div>

                            <div className="flex flex-col gap-2 relative z-10">
                                <h4 className="font-serif text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                                    {product.title}
                                </h4>
                                {product.material && (
                                    <p className="text-sm text-muted-foreground">
                                        {product.material}
                                    </p>
                                )}
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="font-serif text-lg tracking-wider text-foreground">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.old_price && (
                                        <span className="text-sm line-through text-muted-foreground opacity-50">
                                            {formatPrice(product.old_price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
}
