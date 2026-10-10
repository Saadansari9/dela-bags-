import { NextResponse } from 'next/server';
import { verifyOtp } from '@/lib/otpStore';

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ success: false, error: 'Phone number and OTP code are required.' }, { status: 400 });
    }

    const isValid = verifyOtp(phone, otp);

    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid or expired OTP code. Please check SMS or try again.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Mobile number verified successfully via SMS OTP!',
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to verify OTP. Please try again.' }, { status: 500 });
  }
}
