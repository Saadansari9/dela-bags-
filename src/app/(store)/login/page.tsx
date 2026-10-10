'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, Phone, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 mr-3 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');

  // Phone OTP States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // Email States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [receivedOtpBanner, setReceivedOtpBanner] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  // 1. Send OTP Handler via API
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setReceivedOtpBanner(null);

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setOtpLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone }),
      });
      const data = await res.json();
      setOtpLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to send OTP SMS.');
        return;
      }

      setOtpSent(true);
      setInfoMessage(data.message);

      if (data.otp) {
        setReceivedOtpBanner(`📱 SMS Delivered to +91 ${cleanPhone}: Your DELA BAGS OTP Code is [ ${data.otp} ]`);
      }

      // Start 60s resend timer
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setOtpLoading(false);
      setError('Network error sending OTP. Please try again.');
    }
  };

  // 2. Verify OTP & Sign In Handler via API
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otp.trim()) {
      setError('Please enter the OTP sent to your phone.');
      return;
    }

    setOtpLoading(true);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

    try {
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, otp }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        setOtpLoading(false);
        setError(verifyData.error || 'Invalid OTP code.');
        return;
      }

      // If OTP verified, sign in user session
      const result = await signIn('credentials', {
        phone: cleanPhone,
        redirect: false,
      });

      setOtpLoading(false);
      if (result?.error) {
        setError('Login session initiation failed.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setOtpLoading(false);
      setError('Network error verifying OTP.');
    }
  };

  // 3. Email & Password Login Handler
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  // 4. Google OAuth Trigger
  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    setError('');
    signIn('google', { callbackUrl });
  };

  return (
    <div className="w-full max-w-md bg-white p-8 border border-neutral-200/80 shadow-xs">
      <div className="text-center mb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">Sign in to your DELA BAGS account</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-none mb-6 text-xs font-medium">
          {error}
        </div>
      )}

      {infoMessage && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-none mb-4 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
          <span>{infoMessage}</span>
        </div>
      )}

      {receivedOtpBanner && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-none mb-6 text-xs font-mono font-bold flex items-center justify-between gap-2 shadow-xs animate-in fade-in">
          <span>{receivedOtpBanner}</span>
          <button
            type="button"
            onClick={() => {
              const match = receivedOtpBanner.match(/\[\s*(\d+)\s*\]/);
              if (match && match[1]) setOtp(match[1]);
            }}
            className="bg-emerald-700 text-white text-[10px] px-2 py-1 uppercase font-sans font-bold hover:bg-emerald-800 tracking-wider shrink-0"
          >
            Auto-Fill
          </button>
        </div>
      )}

      {/* 🟢 1. Google / Gmail Sign In Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full border-neutral-300 hover:bg-neutral-50 h-12 text-xs font-bold uppercase tracking-wider flex items-center justify-center rounded-none mb-6 transition-all"
      >
        {googleLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Opening Google...
          </>
        ) : (
          <>
            <GoogleIcon /> Continue with Google / Gmail
          </>
        )}
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
          <span className="bg-white px-3 text-neutral-400">Or Select Login Method</span>
        </div>
      </div>

      {/* 🟢 2. Login Method Tabs (Phone vs Email) */}
      <div className="grid grid-cols-2 gap-2 mb-6 bg-neutral-100 p-1 border border-neutral-200">
        <button
          type="button"
          onClick={() => {
            setAuthMethod('phone');
            setError('');
            setInfoMessage('');
          }}
          className={`py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            authMethod === 'phone'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-black'
          }`}
        >
          <Phone className="h-3.5 w-3.5" /> Mobile Number
        </button>

        <button
          type="button"
          onClick={() => {
            setAuthMethod('email');
            setError('');
            setInfoMessage('');
          }}
          className={`py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            authMethod === 'email'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-black'
          }`}
        >
          <Mail className="h-3.5 w-3.5" /> Email Address
        </button>
      </div>

      {/* 📱 Mobile Number Login Tab */}
      {authMethod === 'phone' ? (
        <div className="space-y-4">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-xs font-bold uppercase tracking-wider">
                  Mobile Number
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-input bg-neutral-100 text-xs font-bold text-neutral-600">
                    +91
                  </span>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                    maxLength={10}
                    required
                    className="rounded-none border-l-0 text-sm tracking-widest font-mono"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={otpLoading}
                className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 text-xs font-bold uppercase tracking-widest"
              >
                {otpLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending OTP...
                  </>
                ) : (
                  'SEND OTP TO MOBILE'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="otp" className="text-xs font-bold uppercase tracking-wider">
                    Enter OTP
                  </Label>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-xs text-neutral-500 hover:text-black underline underline-offset-2"
                  >
                    Change Number
                  </button>
                </div>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 4-digit OTP (e.g. 1234)"
                  maxLength={6}
                  required
                  className="rounded-none text-center tracking-[0.5em] font-mono text-lg font-bold"
                />
              </div>

              <Button
                type="submit"
                disabled={otpLoading}
                className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 text-xs font-bold uppercase tracking-widest"
              >
                {otpLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  'VERIFY OTP & LOGIN'
                )}
              </Button>

              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-neutral-500">Didn&apos;t receive SMS?</span>
                {resendTimer > 0 ? (
                  <span className="font-mono text-neutral-400">Resend in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleSendOtp(e)}
                    className="font-bold text-black underline hover:text-neutral-700"
                  >
                    Resend SMS OTP
                  </button>
                )}
              </div>

              <p className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1 pt-2">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> 100% Encrypted Instant SMS Verification
              </p>
            </form>
          )}
        </div>
      ) : (
        /* ✉️ Email Login Tab */
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="rounded-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-neutral-500 hover:text-black underline underline-offset-2"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="rounded-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 text-xs font-bold uppercase tracking-widest"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              'SIGN IN WITH EMAIL'
            )}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-xs text-neutral-500">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-bold text-black underline underline-offset-4 uppercase tracking-wider">
          Create one
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF9F6] px-4 py-12">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white p-8 border text-center">
            <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
