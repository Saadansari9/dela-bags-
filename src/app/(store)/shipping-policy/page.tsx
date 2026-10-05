import Link from 'next/link';
import { Truck, Clock, ShieldCheck, MapPin, Package } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl">
      <div className="border-b pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">Delivery Guidelines</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mt-1">Shipping & Delivery Policy</h1>
        <p className="text-muted-foreground text-sm mt-2">Last Updated: October 2026</p>
      </div>

      <div className="space-y-8 text-neutral-800 leading-relaxed text-sm">
        {/* Key Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-50 p-6 border">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">24-Hour Dispatch</p>
              <p className="text-xs text-muted-foreground">Orders packed and shipped within 24 hours.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">3-5 Days Delivery</p>
              <p className="text-xs text-muted-foreground">Pan-India express courier partners.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On all orders above ₹1,999.</p>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">1. Processing & Dispatch Timelines</h2>
          <p>
            At <strong>DELA BAGS</strong>, we take pride in crafting and inspecting every handbag and duffel bag with utmost care.
            All orders placed before 3:00 PM (Monday through Saturday) are processed and dispatched on the same day. Orders placed on Sundays or public holidays are dispatched on the next business day.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">2. Shipping Charges</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Orders above ₹1,999:</strong> FREE Shipping across all pincodes in India.</li>
            <li><strong>Orders below ₹1,999:</strong> Flat ₹99 standard shipping fee applied at checkout.</li>
            <li><strong>Cash on Delivery (COD):</strong> No hidden COD surcharges. COD is available for orders up to ₹10,000.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">3. Courier Partners & Tracking</h2>
          <p>
            We partner with India&apos;s leading logistics providers including Delhivery, BlueDart, XpressBees, and India Post.
            Once your order is handed over to the courier partner, an automated SMS and WhatsApp update containing your AWB tracking link will be sent to your phone.
          </p>
          <p>
            You can also track your order status anytime on our website at{' '}
            <Link href="/track-order" className="text-black font-bold underline">
              DELA Track Order Portal (/track-order)
            </Link>.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">4. Damaged or Non-Delivery Issues</h2>
          <p>
            If your package appears tampered with or damaged upon arrival, please do not accept the package from the courier agent. Take a photo of the package and immediately inform our customer support at{' '}
            <a href="mailto:DELAbags.service@gmail.com" className="text-black font-bold underline">
              DELAbags.service@gmail.com
            </a>{' '}
            or WhatsApp{' '}
            <a href="https://wa.me/919930009639" target="_blank" rel="noreferrer" className="text-black font-bold underline">
              +91 99300 09639
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
