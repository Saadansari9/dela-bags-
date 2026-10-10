import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, AlertTriangle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | DELA BAGS',
  description: 'Privacy policy and data collection transparency for DELA BAGS customers.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl">
      {/* Template Review Warning Header */}
      <div className="bg-amber-50 border-2 border-amber-400 p-4 mb-8 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold uppercase tracking-wider block mb-1">
            [TEMPLATE - REVIEW REQUIRED]
          </strong>
          <span>
            This privacy policy is tailored specifically to what DELA BAGS collects in code. Please review and verify your official business address, contact email, and legal company entity before public launch.
          </span>
        </div>
      </div>

      <div className="border-b border-neutral-200 pb-6 mb-8">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 border border-amber-200">
          Data Governance & Security
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-3 text-black">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 mt-2 font-mono">Last Updated: October 2026</p>
      </div>

      <div className="space-y-8 text-neutral-800 leading-relaxed text-xs sm:text-sm">
        {/* CODE AUDIT SUMMARY */}
        <div className="bg-[#FAF9F6] border border-neutral-300 p-6 space-y-4">
          <div className="flex items-center gap-2 font-heading font-bold text-base uppercase text-black">
            <FileText className="h-5 w-5 text-black" />
            <span>Code Audit Summary (Data Collected On Site)</span>
          </div>
          <p className="text-xs text-neutral-600">
            Below is the full technical inventory of forms, cookies, local storage items, analytics, and third-party tools operating on DELA BAGS:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="bg-white border border-neutral-200 p-3 space-y-1">
              <span className="font-bold text-black uppercase block">1. Forms Active</span>
              <ul className="list-disc pl-4 text-neutral-600 space-y-0.5">
                <li>Contact Form (`/contact`)</li>
                <li>Newsletter Subscription Form</li>
                <li>Customer Review Form (`/reviews`)</li>
                <li>Checkout Address Form (`/checkout`)</li>
              </ul>
            </div>

            <div className="bg-white border border-neutral-200 p-3 space-y-1">
              <span className="font-bold text-black uppercase block">2. Cookies & LocalStorage</span>
              <ul className="list-disc pl-4 text-neutral-600 space-y-0.5">
                <li>`DELA-cart-storage` (Cart state)</li>
                <li>`DELA-reviews-storage` (Reviews state)</li>
                <li>`DELA_COOKIE_CONSENT` (Consent)</li>
                <li>`next-auth.session-token` (Login session)</li>
              </ul>
            </div>

            <div className="bg-white border border-neutral-200 p-3 space-y-1 sm:col-span-2">
              <span className="font-bold text-black uppercase block">3. Analytics & Third-Party Integrations</span>
              <ul className="list-disc pl-4 text-neutral-600 space-y-0.5">
                <li><strong>Google Analytics 4:</strong> Measures site traffic & `/thank-you` key conversion events (loaded after cookie consent).</li>
                <li><strong>Razorpay Gateway:</strong> PCI-DSS compliant payment processing for UPI, Cards, NetBanking.</li>
                <li><strong>Unsplash CDN:</strong> High-resolution product & model photoshoot imagery.</li>
                <li><strong>WhatsApp API:</strong> Click-to-chat customer support (`wa.me`).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* POLICY SECTIONS */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-black border-b border-neutral-200 pb-2 font-heading">
            1. Personal Information We Collect
          </h2>
          <p>
            When you visit or place an order on DELA BAGS, we collect necessary personal details provided directly by you through our online forms:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Order & Contact Details:</strong> Full name, delivery address, pincode, email address, and phone number.</li>
            <li><strong>Review Submissions:</strong> Customer name, star ratings, and review comments submitted via our review wall.</li>
            <li><strong>Inquiries & Messages:</strong> Messages sent via our `/contact` lead form.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-black border-b border-neutral-200 pb-2 font-heading">
            2. Payment Data & Security
          </h2>
          <p>
            Payment transactions are processed securely via <strong>Razorpay</strong>. DELA BAGS does NOT store or have access to your credit card PINs, CVVs, or NetBanking passwords. All payment transmissions use 256-bit SSL encryption.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-black border-b border-neutral-200 pb-2 font-heading">
            3. Cookies & Analytics Choice
          </h2>
          <p>
            We use Google Analytics 4 to understand visitor traffic and optimize website performance. For visitors subject to GDPR, UK, or Swiss privacy laws, analytics scripts execute only after explicit consent is granted via our Cookie Consent banner.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-black border-b border-neutral-200 pb-2 font-heading">
            4. Contact & Data Protection Officer
          </h2>
          <p>
            If you wish to access, update, or request deletion of your personal information stored with us, please contact our atelier support team:
          </p>
          <div className="bg-[#FAF9F6] border border-neutral-300 p-4 font-mono text-xs text-neutral-800 space-y-1">
            <p><strong>DELA BAGS Atelier Support</strong></p>
            <p>Email: DELAbags.service@gmail.com</p>
            <p>Address: Haji Chawl, Morland Road, Mumbai Central, Mumbai - 400008, Maharashtra, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
