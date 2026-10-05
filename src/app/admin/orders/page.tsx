'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, Filter, CheckCircle2, Clock, Truck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OrderRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'DELA-98742',
    customerName: 'Mohammed Saad',
    customerEmail: 'DELAbags.service@gmail.com',
    date: 'Oct 5, 2026',
    total: 2249,
    paymentMethod: 'COD',
    status: 'Shipped',
  },
  {
    id: 'DELA-89412',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.s@gmail.com',
    date: 'Oct 4, 2026',
    total: 3499,
    paymentMethod: 'UPI',
    status: 'Processing',
  },
  {
    id: 'DELA-78231',
    customerName: 'Ananya Verma',
    customerEmail: 'ananya.v@yahoo.com',
    date: 'Oct 3, 2026',
    total: 1299,
    paymentMethod: 'Razorpay',
    status: 'Delivered',
  },
  {
    id: 'DELA-65109',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.m@hotmail.com',
    date: 'Oct 2, 2026',
    total: 4999,
    paymentMethod: 'COD',
    status: 'Delivered',
  },
  {
    id: 'DELA-54098',
    customerName: 'Sneha Patel',
    customerEmail: 'sneha.p@gmail.com',
    date: 'Oct 1, 2026',
    total: 1899,
    paymentMethod: 'UPI',
    status: 'Pending',
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleStatusChange = (id: string, newStatus: OrderRecord['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Pending':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Order Management</h2>
          <p className="text-muted-foreground text-sm">View, track, and update live customer orders.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 border rounded-md">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search Order ID, Name, Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 border bg-white px-3 text-sm rounded-md font-medium"
          >
            <option value="All">All Order Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-50 border-b text-xs font-semibold text-muted-foreground uppercase">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-muted-foreground">
                  No orders match your search filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-mono font-bold">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className="bg-neutral-100 border px-2 py-0.5 rounded text-xs font-mono">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderRecord['status'])
                      }
                      className={`text-xs font-bold px-2 py-1 border rounded focus:outline-none cursor-pointer ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/orders/${order.id}`} target="_blank">
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Eye className="h-3.5 w-3.5" /> Invoice
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
