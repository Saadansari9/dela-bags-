import { NextResponse } from 'next/server';

const rateLimitMap = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);

    // Rate Limiting: 1 request every 10 seconds per IP
    if (lastRequest && now - lastRequest < 10000) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few seconds before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, hp_field } = body;

    // Honeypot check
    if (hp_field && hp_field.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Subscribed.' });
    }

    // Email validation
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    rateLimitMap.set(ip, now);

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!',
      redirectUrl: '/thank-you?type=newsletter',
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
