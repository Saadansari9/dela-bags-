'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift, Copy, CheckCircle2, Sparkles, X, Tag } from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function CouponModal() {
  const [open, setOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { applyCoupon } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const coupons = [
    {
      code: 'DELA10',
      title: '10% OFF ON FIRST ORDER',
      desc: 'Valid on all handcrafted handbags, slings & totes.',
      tag: 'POPULAR CHOICE',
    },
    {
      code: 'WELCOME200',
      title: 'FLAT ₹200 INSTANT DISCOUNT',
      desc: 'Get flat ₹200 off on your order cart subtotal.',
      tag: 'SPECIAL OFFER',
    },
    {
      code: 'LUXURY20',
      title: '20% OFF ON ORDERS ABOVE ₹3,000',
      desc: 'Save big when you purchase executive & travel duffel bags.',
      tag: 'BEST VALUE',
    },
  ];

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
      setOpen(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Bottom-Left Trigger Pill */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-black text-white px-4 py-2.5 rounded-full shadow-2xl hover:bg-neutral-800 transition-all flex items-center gap-2 border border-neutral-700 animate-bounce-slow text-xs font-bold uppercase tracking-wider"
      >
        <Gift className="h-4 w-4 text-amber-400" />
        <span>Claim ₹200 OFF Coupon</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white text-neutral-900 border-neutral-200 rounded-none shadow-2xl">
          <DialogTitle className="sr-only">Exclusive Offers & Coupons</DialogTitle>

          {/* Modal Header */}
          <div className="p-6 bg-stone-950 text-white border-b border-stone-800 relative space-y-2 text-center">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400 block">DELA BAGS Rewards</span>
            <h3 className="font-heading text-2xl font-bold">Exclusive Discount Codes</h3>
            <p className="text-xs text-stone-300 max-w-xs mx-auto leading-relaxed">
              Copy and apply any of the codes below for instant checkout savings.
            </p>
          </div>

          {/* Coupons List */}
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto bg-[#FAF9F6]">
            {coupons.map((c) => (
              <div key={c.code} className="bg-white border border-neutral-200 p-4 space-y-3 relative shadow-xs">
                <div className="flex justify-between items-start">
                  <span className="bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                    {c.tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-black border border-dashed border-black px-2 py-0.5 uppercase tracking-wider">
                    {c.code}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-black">{c.title}</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">{c.desc}</p>
                </div>

                <Button
                  onClick={() => handleCopyAndApply(c.code)}
                  className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-10 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {copiedCode === c.code ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-400" /> APPLIED TO CART!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> COPY & APPLY CODE
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
