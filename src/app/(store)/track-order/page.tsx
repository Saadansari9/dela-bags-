'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Package, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    const cleanId = orderId.trim().toUpperCase();
    router.push(`/orders/${cleanId}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
      <div className="text-center mb-10">
        <div className="h-12 w-12 bg-neutral-100 border rounded-full flex items-center justify-center mx-auto mb-4">
          <Truck className="h-6 w-6 text-black" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold">Track Your Order</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Enter your Order ID (e.g. <code>DELA-8942</code>) to check live shipment status & invoice.
        </p>
      </div>

      <div className="bg-white border p-8 shadow-sm mb-12">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Order ID / Tracking Number
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g. DELA-8942 or DELA-EXP-98742"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="pl-10 h-12 rounded-none uppercase text-sm font-mono"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 font-bold text-sm">
            TRACK SHIPMENT STATUS
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t text-xs text-muted-foreground text-center">
          💡 Found in your order confirmation SMS or WhatsApp update.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-muted-foreground">
        <div className="border p-4 bg-neutral-50">
          <Package className="h-6 w-6 mx-auto mb-2 text-black" />
          <p className="font-bold text-black text-sm mb-1">Fast Dispatch</p>
          <p>Orders dispatched within 24 hours of confirmation.</p>
        </div>
        <div className="border p-4 bg-neutral-50">
          <Truck className="h-6 w-6 mx-auto mb-2 text-black" />
          <p className="font-bold text-black text-sm mb-1">Pan-India Express</p>
          <p>Delivered in 3-5 business days across India.</p>
        </div>
        <div className="border p-4 bg-neutral-50">
          <ShieldCheck className="h-6 w-6 mx-auto mb-2 text-black" />
          <p className="font-bold text-black text-sm mb-1">Hassle-Free Returns</p>
          <p>7-day easy exchange policy for all orders.</p>
        </div>
      </div>
    </div>
  );
}
