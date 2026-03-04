"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button";
import Link from "next/link";

function AbstractShape() {
    return (
        <Float floatIntensity={2} speed={1.5} rotationIntensity={1}>
            <mesh>
                <torusKnotGeometry args={[1, 0.3, 256, 64]} />
                <MeshDistortMaterial
                    color="#18181B"
                    roughness={0.1}
                    metalness={0.8}
                    distort={0.4}
                    speed={2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </Float>
    );
}

export function WebGLHero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-background flex items-center justify-center">
            {/* 3D Canvas Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <PresentationControls
                        global
                        rotation={[0, 0.3, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]}
                        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                    >
                        <AbstractShape />
                    </PresentationControls>
                    <ContactShadows position={[0, -2, 0]} opacity={0.7} scale={20} blur={2.5} far={4} />
                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* Hero Overlay */}
            <div className="z-10 container mx-auto px-4 pointer-events-none mt-20">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
                    >
                        Искусство <br /> в каждой детали
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl"
                    >
                        Эксклюзивная коллекция мебели, созданная для подлинных ценителей абсолютного качества и авангардного дизайна.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="pointer-events-auto flex items-center gap-6"
                    >
                        <Link href="/catalog">
                            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-white/90 rounded-none px-10 py-6 text-lg tracking-widest uppercase font-medium">
                                Перейти в каталог
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <div className="w-[1px] h-12 bg-muted-foreground/30 relative overflow-hidden">
                    <motion.div
                        className="w-full h-full bg-primary absolute top-0"
                        animate={{ top: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
