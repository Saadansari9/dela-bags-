'use client';

import { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CouponItem {
  id: string;
  code: string;
  type: 'PERCENT' | 'FLAT';
  value: number;
  minSubtotal?: number;
  status: 'ACTIVE' | 'EXPIRED';
}

const INITIAL_COUPONS: CouponItem[] = [
  { id: '1', code: 'DELA10', type: 'PERCENT', value: 10, status: 'ACTIVE' },
  { id: '2', code: 'WELCOME200', type: 'FLAT', value: 200, status: 'ACTIVE' },
  { id: '3', code: 'FESTIVE15', type: 'PERCENT', value: 15, status: 'ACTIVE' },
  { id: '4', code: 'LUXURY20', type: 'PERCENT', value: 20, minSubtotal: 3000, status: 'ACTIVE' },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    code: '',
    type: 'PERCENT' as 'PERCENT' | 'FLAT',
    value: 10,
    minSubtotal: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code) return;

    const newCoupon: CouponItem = {
      id: Date.now().toString(),
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      minSubtotal: form.minSubtotal ? Number(form.minSubtotal) : undefined,
      status: 'ACTIVE',
    };

    setCoupons([newCoupon, ...coupons]);
    setShowAdd(false);
    setForm({ code: '', type: 'PERCENT', value: 10, minSubtotal: '' });
  };

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Coupons & Offers</h2>
          <p className="text-muted-foreground text-sm">Create and manage promo discount codes for DELA BAGS.</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="bg-black text-white rounded-none gap-2">
          <Plus className="h-4 w-4" /> CREATE NEW COUPON
        </Button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white p-6 border space-y-4 max-w-xl">
          <h3 className="font-bold text-base border-b pb-2">New Coupon Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Coupon Code</Label>
              <Input
                required
                placeholder="e.g. SUMMER500"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="uppercase font-mono"
              />
            </div>
            <div>
              <Label>Discount Type</Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as 'PERCENT' | 'FLAT' })}
                className="w-full h-10 border bg-white px-3 text-sm"
              >
                <option value="PERCENT">Percentage (% Off)</option>
                <option value="FLAT">Flat Amount (₹ Off)</option>
              </select>
            </div>
            <div>
              <Label>Discount Value</Label>
              <Input
                type="number"
                required
                value={form.value}
                onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Min. Subtotal (₹) (Optional)</Label>
              <Input
                type="number"
                placeholder="e.g. 2000"
                value={form.minSubtotal}
                onChange={(e) => setForm({ ...form, minSubtotal: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button type="submit" className="bg-black text-white">Save Coupon</Button>
          </div>
        </form>
      )}

      <div className="bg-white border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-50 border-b text-xs font-semibold text-muted-foreground uppercase">
            <tr>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Discount</th>
              <th className="px-6 py-3">Min Order</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-mono font-bold flex items-center gap-2">
                  <Tag className="h-4 w-4 text-emerald-600" />
                  {coupon.code}
                </td>
                <td className="px-6 py-4 font-bold">
                  {coupon.type === 'PERCENT' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {coupon.minSubtotal ? `₹${coupon.minSubtotal}` : 'No Minimum'}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle className="h-3 w-3" /> {coupon.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(coupon.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
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
