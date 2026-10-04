"use client";

export const dynamic = 'force-dynamic';

import Image from "next/image";
import Link from "next/link";
import { Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const cart = useCart();
  const subtotal = cart.getCartTotal();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (cart.items.length === 0) {
      router.push("/cart");
    }
  }, [cart.items.length, router]);

  if (!mounted || cart.items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Checkout</h1>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-green-600 font-medium">
          <Lock className="h-4 w-4" /> Secure Payment
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-12">
        {/* Order Summary (Right side on desktop) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-neutral-50 p-6 border sticky top-24">
            <h2 className="font-bold text-lg mb-4 pb-4 border-b">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-12 bg-white border shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-black text-white h-5 w-5 flex items-center justify-center rounded-full text-xs font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.color} / {item.size}</p>
                  </div>
                  <div className="text-sm font-medium">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-bold text-lg">Total</span>
              <div className="text-right">
                <span className="text-xs text-muted-foreground block">INR</span>
                <span className="font-bold text-2xl">₹{subtotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form (Left side on desktop) */}
        <div className="w-full lg:w-2/3">
          <form className="space-y-10">
            {/* Contact Info */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Contact</h2>
                <Link href="/login" className="text-sm text-blue-600 hover:underline">Log in</Link>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-1" required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="newsletter" className="rounded border-neutral-300" defaultChecked />
                  <Label htmlFor="newsletter" className="text-sm font-normal text-muted-foreground">Email me with news and offers</Label>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" required />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-1">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="House number, Street name" required />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-1">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">State</Label>
                  <select id="state" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
                    <option value="">Select State</option>
                    <option value="MH">Maharashtra</option>
                    <option value="DL">Delhi</option>
                    <option value="KA">Karnataka</option>
                    {/* Add more states */}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input id="pincode" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>
              
              <div className="border rounded-md overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b bg-neutral-50">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="razorpay" name="payment" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="razorpay" className="font-medium cursor-pointer">Pay with Razorpay (Cards, UPI, NetBanking)</Label>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="p-4 bg-white text-center text-sm text-muted-foreground">
                  <p>After clicking "Pay now", you will be redirected to Razorpay to complete your purchase securely.</p>
                </div>
                <div className="p-4 flex items-center justify-between border-t bg-neutral-50">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="cod" name="payment" className="h-4 w-4" />
                    <Label htmlFor="cod" className="font-medium cursor-pointer">Cash on Delivery (COD)</Label>
                  </div>
                </div>
              </div>
            </div>

            <Button type="button" className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-14 text-lg font-bold">
              PAY NOW (MOCK)
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
