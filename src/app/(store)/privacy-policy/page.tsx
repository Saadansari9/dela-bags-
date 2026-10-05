import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Server } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl">
      <div className="border-b pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">Data Governance</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mt-1">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mt-2">Last Updated: October 2026</p>
      </div>

      <div className="space-y-8 text-neutral-800 leading-relaxed text-sm">
        <div className="bg-neutral-50 border p-6 flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 shrink-0 mt-0.5 text-emerald-600" />
          <div>
            <h3 className="font-bold text-base">Your Privacy & Security Commitment</h3>
            <p className="text-xs text-muted-foreground mt-1">
              At DELA BAGS, we respect your privacy. We store and process your information using 256-bit SSL encryption and strict data security protocols complying with Indian IT Data Protection rules.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">1. Information We Collect</h2>
          <p>When you browse or place an order on DELA BAGS, we collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Information:</strong> Name, Email address, Phone number, Delivery address, and Pincode provided during checkout or account registration.</li>
            <li><strong>Payment Data:</strong> Payment details are securely processed via PCI-DSS compliant gateways (Razorpay, Bank UPI). We do NOT store your credit card PINs or CVVs.</li>
            <li><strong>Technical Data:</strong> IP address, device type, browser information, and cookies to improve browsing speed and site performance.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process, ship, and deliver your orders via our courier partners (Delhivery, BlueDart, India Post).</li>
            <li>To send order status SMS, WhatsApp tracking updates, and invoices.</li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To prevent fraudulent transactions and maintain store security.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">3. Third-Party Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. Information is shared strictly with essential partners required for service delivery (Logistics partners, Razorpay payment gateway, NextAuth authentication).
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">4. Data Protection Officer (DPO) Contact</h2>
          <p>
            If you have questions regarding your data, wish to update your details, or request account deletion, please email our Data Protection team at{' '}
            <a href="mailto:DELAbags.service@gmail.com" className="font-bold text-black underline">
              DELAbags.service@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
