import Link from 'next/link';
import { Scale, ShieldCheck, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl">
      <div className="border-b pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">Legal Terms</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mt-1">Terms & Conditions</h1>
        <p className="text-muted-foreground text-sm mt-2">Last Updated: October 2026</p>
      </div>

      <div className="space-y-8 text-neutral-800 leading-relaxed text-sm">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">1. Agreement to Terms</h2>
          <p>
            Welcome to <strong>DELA BAGS</strong> (&quot;Website&quot;, &quot;Store&quot;). By accessing or purchasing from our website located at Morland Road, Mumbai Central, Mumbai - 400008, Maharashtra, India, you agree to be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">2. Product Pricing & Availability</h2>
          <p>
            All prices listed on DELA BAGS are in Indian Rupees (INR) and inclusive of all applicable taxes. We reserve the right to modify prices, discontinue products, or run promo discounts without prior notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">3. Intellectual Property Rights</h2>
          <p>
            All product photography, bag designs, logos, product names, text, and graphics displayed on DELA BAGS are the exclusive property of DELA BAGS. Reproduction, copying, or unauthorized commercial use of any content is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">4. Governing Law & Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with website purchases shall be subject to the exclusive jurisdiction of courts located in Mumbai, Maharashtra, India.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black border-b pb-2">5. Contact Information</h2>
          <p>
            For any legal notices or queries regarding these Terms & Conditions, please contact us at:
          </p>
          <div className="bg-neutral-50 p-4 border text-xs font-mono space-y-1">
            <p><strong>Store Entity:</strong> DELA BAGS</p>
            <p><strong>Address:</strong> Haji Chawl, Morland Road, Mumbai Central, Mumbai - 400008, Maharashtra</p>
            <p><strong>Support Email:</strong> DELAbags.service@gmail.com</p>
            <p><strong>Support Phone:</strong> +91 84258 45342</p>
          </div>
        </section>
      </div>
    </div>
  );
}
