'use client';

import { useState } from 'react';
import { Search, Package, Truck, ShieldCheck, CheckCircle2, Clock, MapPin, ArrowRight, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TrackingDetails {
  orderId: string;
  status: 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  customerName: string;
  items: string;
  amount: number;
  courier: string;
  awb: string;
  estimatedDelivery: string;
  currentLocation: string;
  timeline: { title: string; time: string; done: boolean; current?: boolean }[];
}

export default function TrackOrderPage() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<TrackingDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const demoOrders: Record<string, TrackingDetails> = {
    'DELA-8942': {
      orderId: 'DELA-8942',
      status: 'shipped',
      customerName: 'Mohammed Saad',
      items: 'Classic Leather Handbag (Black) x 1',
      amount: 2499,
      courier: 'Express Courier (Delhivery / Bluedart)',
      awb: 'DELA849201948IN',
      estimatedDelivery: 'Tomorrow by 7:00 PM',
      currentLocation: 'Mumbai Central Hub → Out for Transit',
      timeline: [
        { title: 'Order Placed & Confirmed', time: 'Yesterday, 10:30 AM', done: true },
        { title: 'Quality Check & Packed in Luxury Box', time: 'Yesterday, 04:15 PM', done: true },
        { title: 'Shipped & In Transit', time: 'Today, 08:00 AM', done: true, current: true },
        { title: 'Out for Delivery', time: 'Expected Tomorrow', done: false },
        { title: 'Delivered', time: 'Expected Tomorrow', done: false },
      ],
    },
    'DELA-7741': {
      orderId: 'DELA-7741',
      status: 'out_for_delivery',
      customerName: 'Ananya Sharma',
      items: 'Premium Women\'s Sling Bag (Tan) x 1',
      amount: 1299,
      courier: 'Blue Dart Air Express',
      awb: 'BD998241029IN',
      estimatedDelivery: 'Today by 5:00 PM',
      currentLocation: 'Out for Delivery with Delivery Executive',
      timeline: [
        { title: 'Order Placed & Confirmed', time: '2 Days Ago, 11:00 AM', done: true },
        { title: 'Packed & Sealed', time: '2 Days Ago, 03:00 PM', done: true },
        { title: 'Shipped & Arrived at Destination Hub', time: 'Yesterday, 07:30 PM', done: true },
        { title: 'Out for Delivery with Courier Executive', time: 'Today, 09:15 AM', done: true, current: true },
        { title: 'Delivered', time: 'Expected Today', done: false },
      ],
    },
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    const cleanId = orderIdInput.trim().toUpperCase();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (demoOrders[cleanId]) {
        setTrackingResult(demoOrders[cleanId]);
      } else {
        // Dynamic generated tracking details for custom IDs
        setTrackingResult({
          orderId: cleanId,
          status: 'shipped',
          customerName: 'Valued Customer',
          items: 'DELA Premium Handbag',
          amount: 2249,
          courier: 'Pan-India Express Logistics',
          awb: `DELA${cleanId.replace(/[^0-9]/g, '') || '98742'}IN`,
          estimatedDelivery: 'In 2-3 Business Days',
          currentLocation: 'Regional Dispatch Center → Destination Hub',
          timeline: [
            { title: 'Order Placed & Payment Verified', time: '1 Day Ago', done: true },
            { title: 'Quality Check & Luxury Box Sealed', time: 'Yesterday', done: true },
            { title: 'Dispatched via Express Delivery', time: 'In Transit', done: true, current: true },
            { title: 'Out for Delivery', time: 'Upcoming', done: false },
            { title: 'Delivered', time: 'Upcoming', done: false },
          ],
        });
      }
    }, 600);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="h-12 w-12 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <Truck className="h-6 w-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold">Real-time Order Status</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">Track Your Order</h1>
          <div className="h-0.5 w-10 bg-black mx-auto mt-2" />
          <p className="text-xs text-neutral-500 leading-relaxed max-w-md mx-auto">
            Enter your Order ID (e.g. <strong className="text-black font-mono">DELA-8942</strong> or <strong className="text-black font-mono">DELA-7741</strong>) to view live shipment progress & AWB tracking.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="orderId" className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Order ID / AWB Tracking Number
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  id="orderId"
                  type="text"
                  placeholder="Try typing DELA-8942 or DELA-7741"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="pl-10 h-12 rounded-none uppercase text-xs sm:text-sm font-mono tracking-widest border-neutral-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 font-bold text-xs uppercase tracking-[0.2em]"
            >
              {loading ? 'LOOKING UP SHIPMENT...' : 'TRACK LIVE SHIPMENT STATUS'}
            </Button>
          </form>

          {/* Quick Demo Badges */}
          <div className="mt-4 pt-4 border-t border-neutral-100 text-xs flex flex-wrap items-center justify-between gap-2 text-neutral-500">
            <span>Quick Demo Order IDs:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput('DELA-8942');
                  setTrackingResult(demoOrders['DELA-8942']);
                }}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-black hover:text-white font-mono font-bold text-[11px] transition-colors border"
              >
                DELA-8942
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput('DELA-7741');
                  setTrackingResult(demoOrders['DELA-7741']);
                }}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-black hover:text-white font-mono font-bold text-[11px] transition-colors border"
              >
                DELA-7741
              </button>
            </div>
          </div>
        </div>

        {/* Live Tracking Result Output */}
        {trackingResult && (
          <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in duration-500">
            {/* Summary Strip */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400">Order Reference</span>
                <h2 className="font-heading text-2xl font-bold text-black flex items-center gap-2">
                  {trackingResult.orderId}
                  <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-none">
                    {trackingResult.status.replace(/_/g, ' ')}
                  </span>
                </h2>
                <p className="text-xs text-neutral-500 mt-1">{trackingResult.items}</p>
              </div>

              <div className="bg-[#FAF9F6] border border-neutral-200 p-3 sm:text-right w-full md:w-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">Expected Delivery</span>
                <span className="font-bold text-sm text-green-700 flex items-center gap-1 sm:justify-end">
                  <Clock className="h-4 w-4" /> {trackingResult.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Courier Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-neutral-50 border p-4">
              <div>
                <span className="text-neutral-400 uppercase font-bold tracking-wider text-[10px] block">Courier Partner</span>
                <span className="font-bold text-neutral-800">{trackingResult.courier}</span>
              </div>
              <div>
                <span className="text-neutral-400 uppercase font-bold tracking-wider text-[10px] block">AWB Tracking Number</span>
                <span className="font-mono font-bold text-black">{trackingResult.awb}</span>
              </div>
              <div>
                <span className="text-neutral-400 uppercase font-bold tracking-wider text-[10px] block">Current Location</span>
                <span className="font-semibold text-neutral-800 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-black shrink-0" /> {trackingResult.currentLocation}
                </span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 border-b pb-2">
                Shipment Journey Timeline
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {trackingResult.timeline.map((item, idx) => (
                  <div key={idx} className="relative flex items-start justify-between gap-4">
                    {/* Circle Node */}
                    <span
                      className={`absolute -left-6 top-0.5 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        item.done
                          ? item.current
                            ? 'bg-black text-white ring-4 ring-neutral-200 animate-pulse'
                            : 'bg-black text-white'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      {item.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                    </span>

                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${item.done ? 'text-black' : 'text-neutral-400'}`}>
                        {item.title}
                      </p>
                      <p className="text-[11px] text-neutral-500">{item.time}</p>
                    </div>

                    {item.current && (
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shrink-0">
                        ACTIVE STATUS
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support Actions */}
            <div className="pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <span className="text-neutral-500">Need assistance with this shipment?</span>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '919930009639'}?text=Hi%20DELA%20BAGS,%20I%20need%20help%20tracking%20my%20order:%20${trackingResult.orderId}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="rounded-none border-black h-9 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <PhoneCall className="h-3.5 w-3.5" /> CONTACT WHATSAPP SUPPORT <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* Feature Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-neutral-600 pt-6">
          <div className="border border-neutral-200 p-5 bg-white space-y-2">
            <Package className="h-6 w-6 mx-auto text-black" />
            <p className="font-bold text-black text-xs uppercase tracking-wider">Fast Dispatch</p>
            <p className="text-neutral-500 font-light">Dispatched within 24 hours of order confirmation.</p>
          </div>
          <div className="border border-neutral-200 p-5 bg-white space-y-2">
            <Truck className="h-6 w-6 mx-auto text-black" />
            <p className="font-bold text-black text-xs uppercase tracking-wider">Pan-India Express</p>
            <p className="text-neutral-500 font-light">Delivery in 3-5 business days across 25,000+ pincodes.</p>
          </div>
          <div className="border border-neutral-200 p-5 bg-white space-y-2">
            <ShieldCheck className="h-6 w-6 mx-auto text-black" />
            <p className="font-bold text-black text-xs uppercase tracking-wider">7-Day Easy Returns</p>
            <p className="text-neutral-500 font-light">Hassle-free return and exchange policy for all items.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
