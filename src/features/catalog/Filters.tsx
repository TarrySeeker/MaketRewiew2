"use client";

import { Button } from "@/shared/ui/Button";

interface FiltersProps {
  materials: string[];
  colors: string[];
  selectedMaterials: string[];
  selectedColors: string[];
  priceMin: number;
  priceMax: number;
  minPrice: number;
  maxPrice: number;
  onMaterialToggle: (material: string) => void;
  onColorToggle: (color: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onReset: () => void;
}

export function Filters({
  materials,
  colors,
  selectedMaterials,
  selectedColors,
  priceMin,
  priceMax,
  minPrice,
  maxPrice,
  onMaterialToggle,
  onColorToggle,
  onPriceChange,
  onReset,
}: FiltersProps) {
  return (
    <div className="sticky top-32 w-full space-y-12 pr-6">

      {/* Price Section */}
      <div className="border-b border-border/50 pb-8">
        <h4 className="font-serif text-xl tracking-wide uppercase mb-6 text-foreground">Цена</h4>
        <div className="space-y-6">
          <div className="relative h-1 bg-secondary rounded-full">
            {/* Custom styled range inputs for a sleek look could go here. Keeping standard for logic simplicity, styled structurally. */}
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceMin}
              onChange={(e) => onPriceChange(parseInt(e.target.value), priceMax)}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceMax}
              onChange={(e) => onPriceChange(priceMin, parseInt(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-20"
            />
            {/* Track highlight logic */}
            <div
              className="absolute h-full bg-primary pointer-events-none"
              style={{
                left: `${((priceMin - minPrice) / (maxPrice - minPrice)) * 100}%`,
                right: `${100 - ((priceMax - minPrice) / (maxPrice - minPrice)) * 100}%`
              }}
            />
          </div>
          <div className="flex items-center gap-4 justify-between font-mono text-sm tracking-widest text-muted-foreground">
            <input
              type="number"
              value={priceMin}
              onChange={(e) => onPriceChange(parseInt(e.target.value) || minPrice, priceMax)}
              className="w-24 bg-transparent border-b border-border/50 pb-1 focus:outline-none focus:border-primary text-left"
            />
            <span className="text-border">—</span>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => onPriceChange(priceMin, parseInt(e.target.value) || maxPrice)}
              className="w-24 bg-transparent border-b border-border/50 pb-1 focus:outline-none focus:border-primary text-right"
            />
          </div>
        </div>
      </div>

      {/* Materials Section */}
      {materials.length > 0 && (
        <div className="border-b border-border/50 pb-8">
          <h4 className="font-serif text-xl tracking-wide uppercase mb-6 text-foreground">Материал</h4>
          <div className="flex flex-col gap-3">
            {materials.map((material) => {
              const isActive = selectedMaterials.includes(material);
              return (
                <button
                  key={material}
                  onClick={() => onMaterialToggle(material)}
                  className={`text-left text-sm tracking-widest uppercase transition-colors flex items-center gap-3 group ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <span className={`w-3 h-3 border transition-colors ${isActive ? "bg-primary border-primary" : "border-muted-foreground group-hover:border-foreground"}`} />
                  {material}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Colors Section */}
      {colors.length > 0 && (
        <div className="border-b border-border/50 pb-8">
          <h4 className="font-serif text-xl tracking-wide uppercase mb-6 text-foreground">Цвет</h4>
          <div className="flex gap-3 flex-wrap">
            {colors.map((color) => {
              const isActive = selectedColors.includes(color);
              return (
                <button
                  key={color}
                  onClick={() => onColorToggle(color)}
                  className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all ${isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button variant="outline" onClick={onReset} className="w-full tracking-widest uppercase text-xs rounded-none border-border py-6 hover:bg-foreground hover:text-background transition-colors">
        Сбросить всё
      </Button>
    </div>
  );
}
