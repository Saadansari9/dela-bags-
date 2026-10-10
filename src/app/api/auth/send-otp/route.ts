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

    // Send SMS via Gateway (or SMS simulation)
    const smsResult = await sendSmsOtp(cleanPhone, otp);

    return NextResponse.json({
      success: true,
      message: `SMS OTP dispatched to +91 ${cleanPhone.slice(0, 2)}*****${cleanPhone.slice(-3)}.`,
      phone: cleanPhone,
      otp: otp, // Returned for simulated SMS banner display when live SMS gateway key is not set
      gateway: smsResult.gateway,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to send OTP SMS. Please try again.' }, { status: 500 });
  }
}
