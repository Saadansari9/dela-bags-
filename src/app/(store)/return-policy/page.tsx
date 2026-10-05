import Link from 'next/link';
import { RotateCcw, CheckCircle2, ShieldAlert, MessageCircle, Mail } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl">
      <div className="border-b pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">Hassle-Free Protection</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mt-1">Returns & Refunds Policy</h1>
        <p className="text-muted-foreground text-sm mt-2">Last Updated: October 2026</p>
      </div>

      <div className="space-y-8 text-neutral-800 leading-relaxed text-sm">
        {/* Banner */}
        <div className="bg-emerald-50 border border-emerald-200 p-6 flex items-start gap-4 text-emerald-900">
          <RotateCcw className="h-6 w-6 shrink-0 mt-0.5 text-emerald-700" />
          <div>
            <h3 className="font-bold text-base">7-Day Easy Exchange & Return Policy</h3>
            <p className="text-xs text-emerald-800 mt-1">
              Your satisfaction is our priority. If you receive a bag with quality defects, size mismatch, or physical damage, we offer a hassle-free 7-day return or exchange.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">1. Eligibility Criteria for Returns & Exchanges</h2>
          <p>To be eligible for a return or exchange, the product must meet the following conditions:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The item must be unused, unwashed, and in the same condition that you received it.</li>
            <li>All original brand tags, dust bags, and packaging must remain intact.</li>
            <li>Return request must be initiated within 7 calendar days of delivery date.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">2. How to Request a Return or Exchange</h2>
          <p>Initiating a return is fast and simple:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Send a message on WhatsApp to{' '}
              <a href="https://wa.me/919930009639" target="_blank" rel="noreferrer" className="font-bold text-black underline">
                +91 99300 09639
              </a>{' '}
              or email{' '}
              <a href="mailto:DELAbags.service@gmail.com" className="font-bold text-black underline">
                DELAbags.service@gmail.com
              </a>.
            </li>
            <li>Include your Order ID (e.g. DELA-98742) and photos/videos showing the product issue.</li>
            <li>Our support team will schedule a free reverse doorstep pickup within 24-48 hours.</li>
          </ol>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">3. Refund Processing Timelines</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Prepaid Orders (Cards/UPI/NetBanking):</strong> Refunds are processed to the original payment method within 3 to 5 business days after inspection.</li>
            <li><strong>Cash on Delivery (COD) Orders:</strong> Refunds are transferred directly to your bank account via UPI or Bank Transfer after providing your account details to our support team.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">4. Non-Returnable Items</h2>
          <p>
            Customized items, personalized monogrammed bags, and items purchased during clearance sales (&gt;60% off) are non-returnable unless damaged in transit.
          </p>
        </section>
      </div>
    </div>
  );
}
