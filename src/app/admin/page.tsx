import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  PackageCheck,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Eye,
  Plus
} from "lucide-react";
import { getAllProducts } from "@/lib/data/products";

export default async function AdminDashboardPage() {
  const products = await getAllProducts();
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  const RECENT_ORDERS = [
    { id: "DELA-98742", customer: "Mohammed Saad", email: "DELAbags.service@gmail.com", amount: "₹2,249", status: "Shipped", time: "10 mins ago" },
    { id: "DELA-89412", customer: "Priya Sharma", email: "priya.s@gmail.com", amount: "₹3,499", status: "Processing", time: "1 hour ago" },
    { id: "DELA-78231", customer: "Ananya Verma", email: "ananya.v@yahoo.com", amount: "₹1,299", status: "Delivered", time: "3 hours ago" },
    { id: "DELA-65109", customer: "Rohan Mehta", email: "rohan.m@hotmail.com", amount: "₹4,999", status: "Delivered", time: "Yesterday" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-stone-950 text-white p-6 rounded-lg shadow-md border border-stone-800 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-amber-500 font-bold">Store Command Center</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold mt-1">Welcome back, Saad! 👋</h1>
          <p className="text-stone-400 text-xs mt-1">Here is a quick snapshot of DELA BAGS revenue, orders, and catalog stock today.</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/products/new">
            <button className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs px-4 py-2.5 rounded transition-all flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Add New Product
            </button>
          </Link>
          <Link href="/admin/orders">
            <button className="bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold px-4 py-2.5 rounded transition-all flex items-center gap-1.5 border border-stone-700">
              <Eye className="h-4 w-4" /> View Orders
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-600 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-neutral-500">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">₹4,60,300</div>
            <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5" /> +24.5% vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">1,420</div>
            <p className="text-xs text-blue-700 font-medium mt-1 flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5" /> +18.2% vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Products</CardTitle>
            <PackageCheck className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{products.length} Items</div>
            <p className="text-xs text-neutral-500 font-medium mt-1">
              {totalStock} total units in stock
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-neutral-500">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">4,890</div>
            <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center">
              <ShieldCheck className="h-3.5 w-3.5" /> 38% repeat buyers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Recent Orders & Catalog Highlights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders List */}
        <Card className="col-span-4 bg-white border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle className="text-base font-bold">Recent Customer Orders</CardTitle>
              <p className="text-xs text-neutral-500 mt-0.5">Live transactions processed in real-time</p>
            </div>
            <Link href="/admin/orders" className="text-xs font-bold text-black hover:underline flex items-center">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {RECENT_ORDERS.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded border transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-neutral-900">{order.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 font-medium mt-0.5">{order.customer} ({order.email})</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-neutral-900">{order.amount}</p>
                    <p className="text-[10px] text-neutral-400">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card className="col-span-3 bg-white border shadow-xs">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-base font-bold">Top Performing Bags</CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">Bestsellers by revenue and sales volume</p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded border transition-colors">
                  <div className="h-12 w-10 bg-neutral-100 border relative shrink-0">
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-xs text-neutral-900 truncate">{product.name}</p>
                    <p className="text-[11px] text-neutral-500">{product.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-xs text-neutral-900">₹{product.price}</p>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
