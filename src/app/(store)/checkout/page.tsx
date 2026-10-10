"use client";

export const dynamic = 'force-dynamic';

import Image from "next/image";
import Link from "next/link";
import { Lock, ShieldCheck, QrCode, CreditCard, Banknote, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadRazorpayScript, type RazorpayOptions } from "@/lib/razorpay";
import { LocationPickerMap } from "@/components/LocationPickerMap";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'razorpay'>('razorpay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    phone: '',
    lat: null as number | null,
    lng: null as number | null,
  });

  // SMS OTP Verification States for Checkout
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [checkoutOtpBanner, setCheckoutOtpBanner] = useState<string | null>(null);

  const cart = useCart();
  const subtotal = cart.getCartTotal();
  const discount = cart.getDiscountTotal();
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const grandTotal = cart.getGrandTotal();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (cart.items.length === 0) {
      router.push("/cart");
    }
  }, [cart.items.length, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLocationSelect = (loc: { address: string; city: string; state: string; pincode: string; lat: number; lng: number }) => {
    setForm((prev) => ({
      ...prev,
      address: loc.address || prev.address,
      city: loc.city || prev.city,
      state: loc.state || prev.state,
      pincode: loc.pincode || prev.pincode,
      lat: loc.lat,
      lng: loc.lng,
    }));
  };

  const handleCheckoutSendOtp = async () => {
    setError('');
    setCheckoutOtpBanner(null);
    const cleanPhone = form.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number to receive SMS OTP.');
      return;
    }

    setPhoneOtpLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone }),
      });
      const data = await res.json();
      setPhoneOtpLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to dispatch SMS OTP.');
        return;
      }

      setPhoneOtpSent(true);
      if (data.otp) {
        setCheckoutOtpBanner(`📱 SMS OTP Code: [ ${data.otp} ] sent to +91 ${cleanPhone}`);
      }
    } catch {
      setPhoneOtpLoading(false);
      setError('Failed to request SMS OTP.');
    }
  };

  const handleCheckoutVerifyOtp = async () => {
    setError('');
    if (!phoneOtp.trim()) {
      setError('Please enter the 4-digit OTP code received via SMS.');
      return;
    }

    const cleanPhone = form.phone.replace(/[^0-9]/g, '');
    setPhoneOtpLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, otp: phoneOtp }),
      });
      const data = await res.json();
      setPhoneOtpLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid OTP code.');
        return;
      }

      setIsPhoneVerified(true);
      setPhoneOtpSent(false);
      setCheckoutOtpBanner(null);
    } catch {
      setPhoneOtpLoading(false);
      setError('Failed to verify OTP.');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `DELA-${randomNum}`;
    const fullName = `${form.firstName} ${form.lastName}`.trim() || 'Customer';
    const gpsQuery = form.lat && form.lng ? `&lat=${form.lat}&lng=${form.lng}` : '';

    // 1. CASH ON DELIVERY (COD) FLOW
    if (paymentMethod === 'cod') {
      setTimeout(() => {
        cart.clearCart();
        router.push(`/orders/${orderId}?status=COD_PLACED${gpsQuery}`);
      }, 1200);
      return;
    }

    // 2. RAZORPAY / UPI ONLINE PAYMENT FLOW
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setError('Failed to load Razorpay Payment Gateway. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // Call Backend API to create Razorpay Order Session
      const apiRes = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          customerName: fullName,
          customerEmail: form.email,
          customerPhone: form.phone,
        }),
      });

      const orderData = await apiRes.json();
      if (!apiRes.ok || !orderData.success) {
        setError(orderData.error || 'Failed to initiate payment.');
        setLoading(false);
        return;
      }

      // Launch Official Razorpay Payment Dialog
      const options: RazorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'DELA BAGS',
        description: `Order Payment for ${cart.items.length} items`,
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=200&auto=format&fit=crop',
        prefill: {
          name: fullName,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: '#000000',
        },
        handler: function (response) {
          console.log('Razorpay Payment Success:', response);
          cart.clearCart();
          router.push(`/orders/${orderId}?pay_id=${response.razorpay_payment_id}&status=PAID_SUCCESS${gpsQuery}`);
        },
      };

      const rzp = new (window as unknown as { Razorpay: new (opts: RazorpayOptions) => { open: () => void } }).Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch {
      setError('An unexpected error occurred while launching payment.');
      setLoading(false);
    }
  };

  if (!mounted || cart.items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Secure Checkout</h1>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-emerald-600 font-medium">
          <Lock className="h-4 w-4" /> 256-Bit SSL Encrypted & Razorpay Compliant
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm max-w-2xl mx-auto">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row-reverse gap-12">
        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-neutral-50 p-6 border sticky top-24">
            <h2 className="font-bold text-lg mb-4 pb-4 border-b">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1">
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
                    <p className="text-xs text-muted-foreground">{item.color} {item.size && `/ ${item.size}`}</p>
                  </div>
                  <div className="text-sm font-medium">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> Discount ({cart.coupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={shipping === 0 ? "text-emerald-600 font-medium" : ""}>
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-bold text-lg">Grand Total</span>
              <div className="text-right">
                <span className="text-xs text-muted-foreground block uppercase">INR</span>
                <span className="font-bold text-2xl">₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handlePlaceOrder} className="space-y-10">
            {/* Contact Info */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Contact Information</h2>
                <Link href="/login" className="text-xs text-black underline font-medium">Log in</Link>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleInputChange}
                    className="mt-1 rounded-none bg-neutral-50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>

              {/* GPS Live Map Auto-Fill Component */}
              <div className="mb-6">
                <LocationPickerMap onLocationSelect={handleLocationSelect} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" value={form.firstName} onChange={handleInputChange} className="rounded-none bg-neutral-50" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" value={form.lastName} onChange={handleInputChange} className="rounded-none bg-neutral-50" required />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-1">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="House/Flat No, Street Name, Area" value={form.address} onChange={handleInputChange} className="rounded-none bg-neutral-50" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={form.city} onChange={handleInputChange} className="rounded-none bg-neutral-50" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">State</Label>
                  <select
                    id="state"
                    value={form.state}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-none border border-input bg-neutral-50 px-3 py-2 text-sm focus:outline-none"
                    required
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input id="pincode" placeholder="400008" value={form.pincode} onChange={handleInputChange} className="rounded-none bg-neutral-50" required />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="phone">Mobile Phone Number (for Delivery SMS)</Label>
                    {isPhoneVerified && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase tracking-wider flex items-center gap-1">
                        ✓ SMS Verified
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleInputChange}
                      className="rounded-none bg-neutral-50 flex-1 font-mono"
                      required
                    />
                    {!isPhoneVerified && (
                      <Button
                        type="button"
                        onClick={handleCheckoutSendOtp}
                        disabled={phoneOtpLoading || !form.phone}
                        className="bg-black text-white hover:bg-neutral-800 rounded-none text-xs font-bold uppercase tracking-wider h-10 px-4"
                      >
                        {phoneOtpLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'VERIFY VIA SMS OTP'}
                      </Button>
                    )}
                  </div>

                  {checkoutOtpBanner && (
                    <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-2.5 text-xs font-mono font-bold flex items-center justify-between gap-2">
                      <span>{checkoutOtpBanner}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const match = checkoutOtpBanner.match(/\[\s*(\d+)\s*\]/);
                          if (match && match[1]) setPhoneOtp(match[1]);
                        }}
                        className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 font-sans uppercase font-bold"
                      >
                        Auto-Fill
                      </button>
                    </div>
                  )}

                  {phoneOtpSent && !isPhoneVerified && (
                    <div className="bg-neutral-50 border p-3 space-y-2">
                      <Label htmlFor="phoneOtp" className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                        Enter 4-Digit OTP Code Received on SMS
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="phoneOtp"
                          type="text"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          placeholder="e.g. 1234"
                          maxLength={6}
                          className="rounded-none bg-white text-center font-mono text-base font-bold tracking-widest flex-1"
                        />
                        <Button
                          type="button"
                          onClick={handleCheckoutVerifyOtp}
                          disabled={phoneOtpLoading}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-none text-xs font-bold uppercase tracking-wider h-10 px-5"
                        >
                          {phoneOtpLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'SUBMIT OTP'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-bold mb-2">Select Payment Gateway</h2>
              <p className="text-xs text-muted-foreground mb-4">All transactions are encrypted and 100% secure.</p>
              
              <div className="border border-neutral-300 divide-y bg-white">
                {/* Razorpay Online */}
                <div className={`p-4 transition-colors ${paymentMethod === 'razorpay' ? 'bg-neutral-50' : ''}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-black h-4 w-4"
                    />
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-sm flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-blue-600" /> Razorpay Online (Cards, NetBanking, Wallets)
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 font-bold uppercase">INSTANT</span>
                    </div>
                  </label>
                  {paymentMethod === 'razorpay' && (
                    <div className="mt-3 pl-7 text-xs text-muted-foreground">
                      Secured by Razorpay. Click &quot;PAY NOW&quot; to open card/netbanking checkout popup.
                    </div>
                  )}
                </div>

                {/* Instant UPI QR */}
                <div className={`p-4 transition-colors ${paymentMethod === 'upi' ? 'bg-neutral-50' : ''}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-black h-4 w-4"
                    />
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-sm flex items-center gap-2">
                        <QrCode className="h-4 w-4 text-purple-600" /> Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                      <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 font-bold uppercase">POPULAR</span>
                    </div>
                  </label>
                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pl-7 text-xs text-muted-foreground space-y-1">
                      <p>Pay via Google Pay, PhonePe, Paytm, or UPI ID: <strong>9930009639@okbizaxis</strong></p>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery */}
                <div className={`p-4 transition-colors ${paymentMethod === 'cod' ? 'bg-neutral-50' : ''}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-black h-4 w-4"
                    />
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-sm flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-emerald-600" /> Cash on Delivery (COD)
                      </span>
                    </div>
                  </label>
                  {paymentMethod === 'cod' && (
                    <div className="mt-3 pl-7 text-xs text-muted-foreground">
                      Pay cash to the courier delivery agent when your order arrives.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-14 text-base font-bold tracking-wide"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  INITIATING PAYMENT...
                </span>
              ) : (
                `PAY NOW & PLACE ORDER (₹${grandTotal})`
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
