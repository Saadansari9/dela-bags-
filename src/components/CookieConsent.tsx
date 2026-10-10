'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('DELA_COOKIE_CONSENT');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('DELA_COOKIE_CONSENT', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 bg-neutral-900 text-white border border-neutral-800 p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="space-y-3 text-left">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
          <ShieldCheck className="h-4 w-4 text-amber-400" /> Privacy & Cookies Notice
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed font-light">
          We use cookies and Google Analytics to optimize your luxury shopping experience, analyze traffic, and process secure Razorpay payments.
        </p>
        <div className="flex items-center justify-between gap-3 pt-1">
          <Link href="/privacy-policy" className="text-[11px] text-neutral-400 hover:text-white underline">
            Privacy Policy
          </Link>
          <Button
            onClick={acceptCookies}
            className="bg-amber-400 text-black hover:bg-amber-300 rounded-none text-xs font-bold uppercase tracking-wider h-8 px-4"
          >
            Accept & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
