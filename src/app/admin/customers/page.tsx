'use client';

import { useState } from 'react';
import { Search, Mail, Phone, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'VIP' | 'Regular';
}

const CUSTOMERS: CustomerRecord[] = [
  {
    id: 'CUST-001',
    name: 'Mohammed Saad',
    email: 'DELAbags.service@gmail.com',
    phone: '+91 84258 45342',
    ordersCount: 8,
    totalSpent: 18490,
    joinedDate: 'Jan 2026',
    status: 'VIP',
  },
  {
    id: 'CUST-002',
    name: 'Priya Sharma',
    email: 'priya.s@gmail.com',
    phone: '+91 98201 11234',
    ordersCount: 4,
    totalSpent: 8990,
    joinedDate: 'Mar 2026',
    status: 'Regular',
  },
  {
    id: 'CUST-003',
    name: 'Ananya Verma',
    email: 'ananya.v@yahoo.com',
    phone: '+91 98765 43210',
    ordersCount: 6,
    totalSpent: 14200,
    joinedDate: 'Feb 2026',
    status: 'VIP',
  },
  {
    id: 'CUST-004',
    name: 'Rohan Mehta',
    email: 'rohan.m@hotmail.com',
    phone: '+91 99300 09639',
    ordersCount: 2,
    totalSpent: 4999,
    joinedDate: 'Apr 2026',
    status: 'Regular',
  },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  const filtered = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customer Database</h2>
        <p className="text-muted-foreground text-sm">View customer profiles, order histories, and contact info.</p>
      </div>

      <div className="bg-white p-4 border rounded-md">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by Customer Name, Email, or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>
      </div>

      <div className="bg-white border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-50 border-b text-xs font-semibold text-muted-foreground uppercase">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3">Orders</th>
              <th className="px-6 py-3">Total Spend</th>
              <th className="px-6 py-3">Segment</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((cust) => (
              <tr key={cust.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <p className="font-bold text-sm">{cust.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{cust.id}</p>
                </td>
                <td className="px-6 py-4 text-xs space-y-0.5">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Mail className="h-3 w-3" /> {cust.email}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="h-3 w-3" /> {cust.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{cust.joinedDate}</td>
                <td className="px-6 py-4 font-bold flex items-center gap-1">
                  <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                  {cust.ordersCount} orders
                </td>
                <td className="px-6 py-4 font-bold text-emerald-700">₹{cust.totalSpent.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      cust.status === 'VIP' ? 'bg-purple-100 text-purple-800' : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3" /> {cust.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
