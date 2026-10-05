import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, Package, FileText, BarChart3, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col h-full shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-neutral-800">
          <span className="font-heading text-xl font-bold tracking-widest">DELA ADMIN</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded bg-white/10 text-white">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
            <ShoppingBag className="h-5 w-5" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
            <Package className="h-5 w-5" /> Orders
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
            <FileText className="h-5 w-5" /> Coupons
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
            <Users className="h-5 w-5" /> Customers
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
            <BarChart3 className="h-5 w-5" /> Analytics
          </Link>
          <Link href="/admin/pages" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
            <FileText className="h-5 w-5" /> Pages
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
            <Settings className="h-5 w-5" /> Settings
          </Link>
        </div>
        
        <div className="p-4 border-t border-neutral-800">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors w-full">
            <LogOut className="h-5 w-5" /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <h1 className="font-bold text-lg">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
