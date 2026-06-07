import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export const metadata = { title: "Add Product" };

export default function NewProductPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Add Product
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Share a makeup product you recommend with an affiliate link.
        </p>
      </div>
      <ProductForm action={createProduct} />
    </div>
  );
}
