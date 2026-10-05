import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Tag,
  Settings,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-neutral-100 font-sans text-neutral-900 overflow-hidden">
      {/* Sleek Luxury Sidebar */}
      <aside className="w-64 bg-stone-950 text-stone-200 flex flex-col h-full shrink-0 border-r border-stone-800 shadow-xl">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-stone-800 bg-stone-900/50">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 bg-amber-500 text-stone-950 font-bold rounded flex items-center justify-center text-xs tracking-wider">
              DB
            </div>
            <span className="font-heading text-lg font-bold tracking-widest text-white">
              DELA <span className="text-amber-500 font-normal text-xs uppercase ml-1">Admin</span>
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
            Main Menu
          </div>

          <Link
            href="/admin"
            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-stone-800/80 hover:text-white transition-all text-stone-300"
          >
            <span className="flex items-center gap-3">
              <LayoutDashboard className="h-4 w-4 text-amber-500" /> Dashboard
            </span>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-stone-800/80 hover:text-white transition-all text-stone-300"
          >
            <span className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4 text-amber-500" /> Products Catalog
            </span>
            <span className="bg-stone-800 text-stone-300 text-[10px] px-2 py-0.5 rounded font-mono">9</span>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-stone-800/80 hover:text-white transition-all text-stone-300"
          >
            <span className="flex items-center gap-3">
              <Package className="h-4 w-4 text-amber-500" /> Live Orders
            </span>
            <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded font-mono">NEW</span>
          </Link>

          <Link
            href="/admin/coupons"
            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-stone-800/80 hover:text-white transition-all text-stone-300"
          >
            <span className="flex items-center gap-3">
              <Tag className="h-4 w-4 text-amber-500" /> Coupons & Offers
            </span>
            <span className="bg-stone-800 text-stone-300 text-[10px] px-2 py-0.5 rounded font-mono">4</span>
          </Link>

          <div className="px-3 pt-6 pb-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
            Management & Stats
          </div>

          <Link
            href="/admin/customers"
            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-stone-800/80 hover:text-white transition-all text-stone-300"
          >
            <span className="flex items-center gap-3">
              <Users className="h-4 w-4 text-amber-500" /> Customer CRM
            </span>
          </Link>

          <Link
            href="/admin/analytics"
            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-stone-800/80 hover:text-white transition-all text-stone-300"
          >
            <span className="flex items-center gap-3">
              <BarChart3 className="h-4 w-4 text-amber-500" /> Revenue Analytics
            </span>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-stone-800/80 hover:text-white transition-all text-stone-300"
          >
            <span className="flex items-center gap-3">
              <Settings className="h-4 w-4 text-amber-500" /> Store Settings
            </span>
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/40">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-md bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-200 text-xs font-semibold transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" /> View Live Store
            </span>
            <span className="text-[10px] uppercase font-mono">Live</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-neutral-100">
        {/* Top Professional Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 shrink-0 shadow-2xs">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" /> Admin Session Active
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Actions */}
            <Link href="/admin/products/new">
              <button className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-3 py-2 rounded transition-all">
                + Add Product
              </button>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full animate-ping" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full" />
              </button>
            </div>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
              <div className="h-9 w-9 rounded-full bg-stone-950 text-amber-500 flex items-center justify-center font-bold text-sm border border-stone-800">
                SA
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-neutral-900 leading-none">Saad Ansari</p>
                <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">DELAbags.service@gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Workspace */}
        <div className="flex-1 overflow-y-auto p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
