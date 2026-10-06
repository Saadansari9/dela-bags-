'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function CartDrawer({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  const {
    items,
    removeItem,
    updateQuantity,
    getCartTotal,
    getDiscountTotal,
    getGrandTotal,
    getCartCount,
    applyCoupon,
    removeCoupon,
    coupon,
  } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartTotal = getCartTotal();
  const discountTotal = getDiscountTotal();
  const grandTotal = getGrandTotal();
  const cartCount = getCartCount();

  const freeShippingThreshold = 2000;
  const progressToFreeShipping = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) setCouponInput('');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        {children ? (
          children
        ) : (
          <Button variant="ghost" size="icon" className="relative text-neutral-700 hover:text-black hover:bg-neutral-100">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            {mounted && cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-white text-neutral-900 border-l border-neutral-200">
        {/* Drawer Header */}
        <SheetHeader className="p-4 sm:p-6 border-b border-neutral-200/80 bg-[#FAF9F6]">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-lg font-bold tracking-wider uppercase flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" /> Shopping Bag ({cartCount})
            </SheetTitle>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-[11px] font-medium tracking-wide">
              {amountForFreeShipping > 0 ? (
                <span>Add <strong className="text-black">₹{amountForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong className="text-green-700 uppercase font-bold">FREE Express Shipping</strong></span>
              ) : (
                <span className="text-green-700 font-bold flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" /> Congratulations! You unlocked FREE Express Shipping 🎉</span>
              )}
            </div>
            <div className="h-1.5 w-full bg-neutral-200 overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        </SheetHeader>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-neutral-100">
          {!mounted || items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-neutral-400" />
              </div>
              <div className="space-y-1">
                <p className="font-heading text-lg font-bold">Your Bag is Empty</p>
                <p className="text-xs text-neutral-500 max-w-xs">Discover our luxury collection of handcrafted handbags & slings.</p>
              </div>
              <Link href="/shop" onClick={() => setOpen(false)}>
                <Button className="bg-black text-white hover:bg-neutral-800 rounded-none h-11 px-6 text-xs font-bold uppercase tracking-widest">
                  EXPLORE COLLECTIONS
                </Button>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                {/* Item Thumbnail */}
                <Link
                  href={`/product/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="relative h-20 w-16 bg-neutral-100 shrink-0 border border-neutral-200 overflow-hidden"
                >
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-medium text-xs sm:text-sm line-clamp-1 hover:underline text-black"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="Remove Item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {(item.color || item.size || item.monogram) && (
                      <div className="space-y-0.5 text-[11px] text-neutral-500">
                        {(item.color || item.size) && (
                          <p>
                            {item.color && <span>Color: {item.color}</span>}
                            {item.color && item.size && <span> • </span>}
                            {item.size && <span>Size: {item.size}</span>}
                          </p>
                        )}
                        {item.monogram && (
                          <p className="text-amber-800 font-semibold flex items-center gap-1 text-[10px]">
                            <Sparkles className="h-3 w-3 text-amber-600" /> Monogram: <span className="font-mono bg-amber-50 px-1 border border-amber-200 uppercase">{item.monogram.text}</span> ({item.monogram.style})
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-200">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="h-7 w-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="h-7 px-2 flex items-center justify-center text-xs font-mono font-bold text-black min-w-[24px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-bold text-xs sm:text-sm text-black">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {mounted && items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-neutral-200 bg-[#FAF9F6] space-y-4">
            {/* Coupon Code Input */}
            <div>
              {coupon ? (
                <div className="flex justify-between items-center bg-green-50 border border-green-200 px-3 py-2 text-xs text-green-800">
                  <span className="font-bold flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-green-600" /> Coupon &apos;{coupon.code}&apos; Applied!
                  </span>
                  <button onClick={removeCoupon} className="text-red-600 underline font-semibold text-[11px]">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Coupon (e.g. DELA10)"
                    value={couponInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCouponInput(e.target.value)}
                    className="bg-white text-xs h-9 rounded-none uppercase tracking-wider border-neutral-300"
                  />
                  <Button type="submit" variant="outline" className="h-9 rounded-none text-xs font-bold uppercase px-3">
                    APPLY
                  </Button>
                </form>
              )}
              {couponMessage && !coupon && (
                <p className={`text-[11px] mt-1 ${couponMessage.success ? 'text-green-600' : 'text-red-600'}`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-black font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Discount</span>
                  <span className="font-mono">-₹{discountTotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono text-black font-medium">
                  {cartTotal >= freeShippingThreshold ? 'FREE' : '₹99'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black border-t pt-2 mt-2">
                <span>Grand Total</span>
                <span className="font-mono text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Button */}
            <Link href="/checkout" onClick={() => setOpen(false)}>
              <Button className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-sm">
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
              <span>100% Encrypted & Safe Checkout</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
