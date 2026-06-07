"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

const ALL = "All";

interface ProductsGridProps {
  products: Product[];
  categories: string[];
}

export function ProductsGrid({ products, categories }: ProductsGridProps) {
  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      active === ALL
        ? products
        : products.filter((p) => p.category === active),
    [products, active],
  );

  const allCategories = [ALL, ...categories];

  return (
    <div>
      {/* Filter pills */}
      <div
        role="group"
        aria-label="Filter by category"
        className="mb-8 flex flex-wrap justify-center gap-2"
      >
        {allCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={[
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              active === cat
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-foreground hover:bg-secondary",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No products in this category yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
