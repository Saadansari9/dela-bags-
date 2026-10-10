'use client';

import { use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Package, CheckCircle2, Truck, Clock, Printer, MapPin, ArrowLeft, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const lat = latParam ? parseFloat(latParam) : 18.9696;
  const lng = lngParam ? parseFloat(lngParam) : 72.8193;

  const order = {
    id: id.toUpperCase(),
    date: 'Oct 5, 2026',
    status: 'Shipped',
    expectedDelivery: 'Oct 8, 2026',
    trackingNumber: 'DELA-EXP-98742',
    courier: 'Delhivery Express',
    paymentMethod: 'Cash on Delivery (COD)',
    items: [
      {
        name: 'Classic Leather Handbag',
        color: 'Black',
        price: 2499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    shippingAddress: {
      name: 'Mohammed Saad',
      street: 'Haji Chawl, Morland Road',
      city: 'Mumbai Central',
      state: 'Maharashtra',
      pincode: '400008',
      phone: '+91 84258 45342',
    },
    subtotal: 2499,
    discount: 250,
    shipping: 0,
    grandTotal: 2249,
  };

  const STEPS = [
    { title: 'Order Placed', desc: 'Oct 5, 10:30 AM', done: true },
    { title: 'Processing', desc: 'Oct 5, 02:15 PM', done: true },
    { title: 'Shipped', desc: 'Oct 6, 09:00 AM', done: true, active: true },
    { title: 'Out for Delivery', desc: 'Expected Oct 8', done: false },
    { title: 'Delivered', desc: 'Pending', done: false },
  ];

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Link href="/account" className="text-xs font-semibold text-muted-foreground hover:text-black flex items-center gap-1 mb-2">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Account
          </Link>
          <h1 className="font-heading text-3xl font-bold flex items-center gap-3">
            Order #{order.id}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Placed on {order.date}</p>
        </div>

        <Button onClick={handlePrintInvoice} variant="outline" className="rounded-none gap-2">
          <Printer className="h-4 w-4" /> Download / Print Invoice
        </Button>
      </div>

      {/* Visual Stepper */}
      <div className="bg-neutral-50 p-6 border mb-8">
        <h2 className="font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
          <Truck className="h-4 w-4 text-emerald-600" /> Order Tracking Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STEPS.map((step, index) => (
            <div key={index} className="flex flex-col items-start md:items-center text-left md:text-center space-y-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.done
                    ? 'bg-emerald-600 text-white'
                    : step.active
                    ? 'bg-black text-white ring-4 ring-neutral-200'
                    : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {step.done ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
              </div>
              <div>
                <p className="font-bold text-xs">{step.title}</p>
                <p className="text-[11px] text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t flex flex-wrap justify-between text-xs text-neutral-600 gap-2">
          <div>
            <strong>Tracking AWB:</strong> <span className="font-mono">{order.trackingNumber}</span> ({order.courier})
          </div>
          <div>
            <strong>Expected Delivery:</strong> <span className="text-emerald-700 font-bold">{order.expectedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Shipping Address & Map */}
        <div className="border p-6 bg-white space-y-3 text-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-2">
              <MapPin className="h-4 w-4 text-emerald-600" /> Delivery Location Pin
            </h3>
            <p className="font-bold">{order.shippingAddress.name}</p>
            <p className="text-muted-foreground">{order.shippingAddress.street}</p>
            <p className="text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-muted-foreground text-xs mt-1">Phone: {order.shippingAddress.phone}</p>
          </div>

          {/* Interactive Map Embed */}
          <div className="relative aspect-[16/9] w-full border border-neutral-300 overflow-hidden bg-neutral-100 rounded-none mt-2">
            <iframe
              title="Order Delivery Pin Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
              className="w-full h-full"
            />
            <div className="absolute bottom-1 left-1 bg-black text-white text-[9px] font-mono px-1.5 py-0.5 uppercase tracking-widest font-bold">
              📍 Destination Pin
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border p-6 bg-white space-y-2 text-sm">
          <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" /> Payment Details
          </h3>
          <p className="font-bold">{order.paymentMethod}</p>
          <p className="text-emerald-600 font-medium">Status: Authorized / Pending COD</p>
          <p className="text-xs text-muted-foreground mt-2">
            Invoice Number: <span className="font-mono">DELA-INV-2026-904</span>
          </p>
        </div>

        {/* Need Help */}
        <div className="border p-6 bg-white space-y-2 text-sm">
          <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Package className="h-4 w-4" /> Customer Support
          </h3>
          <p className="text-xs text-muted-foreground">Need help with your shipment?</p>
          <p className="font-bold text-xs">+91 84258 45342</p>
          <p className="text-xs text-muted-foreground">DELAbags.service@gmail.com</p>
          <a
            href="https://wa.me/919930009639"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 text-xs font-bold text-emerald-600 underline"
          >
            WhatsApp Support →
          </a>
        </div>
      </div>

      {/* Invoice Items Table */}
      <div className="border bg-white p-6">
        <h2 className="font-bold text-base mb-4">Items in this Order</h2>
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-14 bg-neutral-100 border relative shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Color: {item.color} | Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-bold text-sm">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Total Calculation */}
        <div className="mt-6 pt-4 border-t space-y-2 text-sm max-w-xs ml-auto">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Discount (DELA10)</span>
            <span>-₹{order.discount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-emerald-600">Free</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t pt-2">
            <span>Grand Total</span>
            <span>₹{order.grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
