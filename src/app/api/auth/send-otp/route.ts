import { NextResponse } from 'next/server';
import { generateOtp, sendSmsOtp } from '@/lib/otpStore';

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Mobile phone number is required.' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      return NextResponse.json({ success: false, error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }

    // Generate random 4-digit OTP
    const otp = generateOtp(cleanPhone);

    // Dispatch SMS via Gateway
    const smsResult = await sendSmsOtp(cleanPhone, otp);

    const message = smsResult.notice || `SMS OTP dispatched to +91 ${cleanPhone.slice(0, 2)}*****${cleanPhone.slice(-3)}. Please enter the OTP code received on your mobile phone.`;

    return NextResponse.json({
      success: true,
      message,
      phone: cleanPhone,
      gateway: smsResult.gateway,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to send OTP SMS. Please try again.' }, { status: 500 });
  }
}
