import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: { default: "Admin — Artistry by Mridhula", template: "%s — Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Fixed overlay covers the entire viewport, hiding the public Header/Footer
    <div className="fixed inset-0 z-50 flex bg-background">
      <AdminNav />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
