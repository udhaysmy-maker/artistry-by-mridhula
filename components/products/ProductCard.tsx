import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={600}
            height={600}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-56 w-full items-center justify-center bg-secondary">
            <span className="font-serif text-xl text-primary opacity-50">
              Product
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {product.category && (
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {product.category}
          </span>
        )}
        <h2 className="font-serif text-lg font-semibold text-foreground">
          {product.name}
        </h2>
        {product.description && (
          <p className="flex-1 text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        )}
        {product.affiliate_url && (
          <a
            href={product.affiliate_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Shop Now &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
