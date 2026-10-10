import { NextResponse } from 'next/server';

// In-memory rate limiting map (IP -> timestamp)
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
    const { firstName, email, message, hp_field } = body;

    // Honeypot spam check (if hp_field is filled by a bot, reject silently)
    if (hp_field && hp_field.trim().length > 0) {
      console.warn(`Spam submission blocked by honeypot from IP: ${ip}`);
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // Server-side validation
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a valid first name (min 2 characters).' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ error: 'Please enter a message (min 5 characters).' }, { status: 400 });
    }

    // Update rate limit timestamp
    rateLimitMap.set(ip, now);

    console.log('Valid Contact Lead Received:', { firstName, email, message, ip, timestamp: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received.',
      redirectUrl: '/thank-you?type=contact',
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
