"use client";

export const dynamic = 'force-dynamic';

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cart = useCart();
  const subtotal = cart.getCartTotal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="container mx-auto px-4 py-16 min-h-[50vh]">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 max-w-7xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-20 bg-neutral-50">
          <p className="text-lg text-muted-foreground mb-6">Your cart is currently empty.</p>
          <Link href="/shop">
            <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-8">
              CONTINUE SHOPPING
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-12 gap-4 border-b pb-4 mb-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="space-y-6">
              {cart.items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b">
                  <div className="col-span-1 md:col-span-6 flex gap-4">
                    <div className="relative h-24 w-20 shrink-0 bg-neutral-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link href={`/product/${item.slug}`} className="font-medium hover:underline">
                        {item.name}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.color && item.size && <span className="mx-2">|</span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                      <button 
                        onClick={() => cart.removeItem(item.id)}
                        className="text-sm text-red-600 hover:underline mt-2 flex items-center gap-1 self-start"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-center hidden md:block">
                    ₹{item.price}
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div className="flex items-center border border-neutral-300">
                      <button 
                        className="p-1 px-2 hover:bg-neutral-100 transition-colors"
                        onClick={() => cart.updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        className="p-1 px-2 hover:bg-neutral-100 transition-colors"
                        onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-left md:text-right font-medium">
                    <span className="md:hidden">Total: </span>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-neutral-50 p-6 border border-neutral-200">
              <h2 className="text-lg font-bold mb-4 border-b pb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Estimated Total</span>
                  <span className="font-bold text-xl">₹{subtotal}</span>
                </div>
              </div>
              
              <Link href="/checkout">
                <Button className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 text-base font-bold">
                  PROCEED TO CHECKOUT <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <div className="mt-4 text-center">
                <Link href="/shop" className="text-sm underline underline-offset-4 text-muted-foreground hover:text-black">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

