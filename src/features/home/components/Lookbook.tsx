"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

const hotspots = [
    { id: 1, x: 30, y: 40, title: "Lounge Chair", price: "120 000 ₽", productId: "prod-cat-2-1" },
    { id: 2, x: 70, y: 60, title: "Marble Table", price: "240 000 ₽", productId: "prod-cat-3-1" },
    { id: 3, x: 80, y: 30, title: "Arc Lamp", price: "85 000 ₽", productId: "prod-cat-4-1" },
];

export function Lookbook() {
    const [activeSpot, setActiveSpot] = useState<number | null>(null);

    return (
        <section className="relative w-full py-32 px-4 md:px-10 lg:px-20 bg-background overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-8">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-4xl md:text-6xl max-w-lg leading-tight"
                    >
                        Контекст <br /> имеет значение
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-sm md:mt-4"
                    >
                        Исследуйте нашу мебель в естественной среде обитания. Нажмите на точки, чтобы узнать больше.
                    </motion.p>
                </div>

                <div className="relative w-full aspect-[4/5] md:aspect-[21/9] bg-secondary/20 overflow-hidden">
                    {/* Fallback image or High-res Render */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-80 mix-blend-luminosity brightness-75 transition-all duration-700 hover:grayscale-0 hover:brightness-100" />

                    {/* Dark Overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

                    {/* Hotspots */}
                    {hotspots.map((spot) => (
                        <div
                            key={spot.id}
                            className="absolute z-10"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                            onPointerEnter={(e) => {
                                if (e.pointerType !== "touch") setActiveSpot(spot.id);
                            }}
                            onPointerLeave={(e) => {
                                if (e.pointerType !== "touch") setActiveSpot(null);
                            }}
                            onClick={() => setActiveSpot(activeSpot === spot.id ? null : spot.id)}
                        >
                            <div className="relative group cursor-pointer">
                                {/* Ping animation backing */}
                                <span className="absolute -inset-2 rounded-full bg-primary/20 animate-ping opacity-75" />

                                {/* Exact Dot */}
                                <div className="relative w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-glow">
                                    <Plus className="w-4 h-4" />
                                </div>

                                {/* Tooltip Popup */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{
                                        opacity: activeSpot === spot.id ? 1 : 0,
                                        y: activeSpot === spot.id ? 0 : 10,
                                        scale: activeSpot === spot.id ? 1 : 0.95,
                                        pointerEvents: activeSpot === spot.id ? "auto" : "none"
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute bottom-full mb-4 w-[160px] max-w-[80vw] bg-card/80 backdrop-blur-md border border-border p-3 md:p-4 shadow-intense ${spot.x >= 70 ? 'right-0' : spot.x <= 30 ? 'left-0' : 'left-1/2 -translate-x-1/2'
                                        }`}
                                >
                                    <h4 className="font-serif font-semibold text-base md:text-lg mb-1 leading-tight">{spot.title}</h4>
                                    <p className="text-muted-foreground text-xs md:text-sm mb-3">{spot.price}</p>
                                    <Link href={`/product/${spot.productId}`} className="text-[10px] md:text-xs uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors">
                                        Посмотреть
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
