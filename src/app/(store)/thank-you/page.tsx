import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, ShoppingBag, MessageCircle, ShieldCheck } from 'lucide-react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Thank You | DELA BAGS',
  description: 'Thank you for your submission to DELA BAGS.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF9F6] px-4 py-16 text-center">
      {/* Google Analytics Key Event Trigger Script */}
      <Script
        id="ga4-thank-you-key-event"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'form_submission_success', {
                event_category: 'Lead',
                event_label: 'Thank You Page Loaded',
                value: 1
              });
              window.gtag('event', 'page_view', {
                page_title: 'Thank You Confirmation Page',
                page_location: window.location.href,
                page_path: '/thank-you'
              });
            }
          `,
        }}
      />

      <div className="max-w-md bg-white border border-neutral-300 p-8 sm:p-10 space-y-6 shadow-sm">
        <div className="h-16 w-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-green-800 bg-green-50 px-2.5 py-1 border border-green-200">
            ✓ Submission Confirmed
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-black pt-1">
            Thank You For Reaching Out!
          </h1>
          <p className="text-xs text-neutral-600 leading-relaxed font-light">
            Your inquiry has been successfully received by our atelier support team. Here is what happens next:
          </p>
        </div>

        <div className="bg-[#FAF9F6] border border-neutral-200 p-4 text-left space-y-2.5 text-xs text-neutral-700">
          <div className="flex items-start gap-2">
            <span className="font-bold text-black">1. Review:</span>
            <span>Our team reviews your request within 2 to 4 business hours.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-black">2. Response:</span>
            <span>You will receive a confirmation response directly to your email address.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-black">3. WhatsApp:</span>
            <span>For urgent order modifications, contact +91 99300 09639.</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link href="/shop">
            <Button className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-11 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Continue Shopping <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <a
            href="https://wa.me/919930009639"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#25D366] text-black font-bold text-xs py-3 rounded-none hover:bg-[#20ba5a] transition-all uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" /> Open WhatsApp Support
          </a>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 uppercase tracking-widest pt-2">
          <ShieldCheck className="h-3.5 w-3.5 text-green-700" />
          <span>100% Secure & Confidential</span>
        </div>
      </div>
    </div>
  );
}
