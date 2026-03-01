"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
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
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-xl">Фильтры</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Цена */}
        <div>
          <h4 className="font-semibold mb-3">Цена</h4>
          <div className="space-y-3">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceMin}
              onChange={(e) => onPriceChange(parseInt(e.target.value), priceMax)}
              className="w-full accent-primary"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceMax}
              onChange={(e) => onPriceChange(priceMin, parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceMin}
                onChange={(e) => onPriceChange(parseInt(e.target.value) || minPrice, priceMax)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
              />
              <span className="text-muted-foreground">—</span>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => onPriceChange(priceMin, parseInt(e.target.value) || maxPrice)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
              />
            </div>
          </div>
        </div>

        {/* Материал */}
        {materials.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Материал</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {materials.map((material) => (
                <label key={material} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material)}
                    onChange={() => onMaterialToggle(material)}
                    className="rounded accent-primary"
                  />
                  <span className="text-sm">{material}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Цвет */}
        {colors.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Цвет</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {colors.map((color) => (
                <label key={color} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => onColorToggle(color)}
                    className="rounded accent-primary"
                  />
                  <span className="text-sm">{color}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <Button variant="outline" size="sm" onClick={onReset} className="w-full">
          Сбросить фильтры
        </Button>
      </CardContent>
    </Card>
  );
}
