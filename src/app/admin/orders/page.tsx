import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground mt-2">View and manage customer orders.</p>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search orders..." className="pl-8 bg-white" />
        </div>
        <div className="flex gap-2">
          <select className="border border-input rounded-md px-3 py-2 text-sm bg-white">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-50 text-neutral-500 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium">#CB-{1000 + i}</td>
                <td className="px-6 py-4 text-muted-foreground">Oct {i}, 2026</td>
                <td className="px-6 py-4">customer{i}@example.com</td>
                <td className="px-6 py-4 font-medium">₹{1999 * i}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    i % 2 === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {i % 2 === 0 ? 'Processing' : 'Delivered'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-black">
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
