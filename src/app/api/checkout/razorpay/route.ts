import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', customerName, customerEmail, customerPhone } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid order amount.' }, { status: 400 });
    }

    // Convert amount to paise (e.g. ₹2,249 -> 224900 paise)
    const amountInPaise = Math.round(amount * 100);
    const orderId = `order_dela_${Date.now()}`;

    // Active Razorpay key ID (read from ENV or use active test key fallback)
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_DELABags2026';

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountInPaise,
      currency,
      key: razorpayKey,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to initiate Razorpay order.' }, { status: 500 });
  }
}
