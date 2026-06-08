import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteProduct } from "./actions";

export const metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const supabase = createSupabaseServerClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, category, affiliate_url")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          + Add Product
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <p className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
          No products yet.{" "}
          <Link href="/admin/products/new" className="text-primary hover:underline">
            Add your first product.
          </Link>
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="border-b border-border bg-secondary/50">
              <tr>
                <th className="px-5 py-3 text-left font-semibold text-foreground">
                  Name
                </th>
                <th className="px-5 py-3 text-left font-semibold text-foreground">
                  Category
                </th>
                <th className="px-5 py-3 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/30">
                  <td className="px-5 py-4">
                    <div className="font-medium text-foreground">
                      {product.name}
                    </div>
                    <div className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                      {product.affiliate_url}
                    </div>
                  </td>
                  <td className="px-5 py-4 capitalize text-muted-foreground">
                    {product.category ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteProduct(product.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="text-xs text-destructive hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
