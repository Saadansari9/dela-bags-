'use client';

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { HelpCircle, ChevronDown, Search, MessageCircle, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  // Orders & Payment
  {
    category: 'Orders & Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD), Instant UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards (Visa, MasterCard, RuPay), NetBanking, and Razorpay.',
  },
  {
    category: 'Orders & Payments',
    question: 'How do I apply a discount coupon code?',
    answer: 'You can enter your promo code (e.g. DELA10 or WELCOME200) in the "Promo / Coupon Code" box on the Cart page or Checkout page, then click APPLY.',
  },
  {
    category: 'Orders & Payments',
    question: 'Can I cancel or change my order after placing it?',
    answer: 'Yes! Orders can be cancelled or modified within 4 hours of placing them by contacting our WhatsApp support at +91 99300 09639 or emailing DELAbags.service@gmail.com.',
  },

  // Shipping & Delivery
  {
    category: 'Shipping & Delivery',
    question: 'How long does shipping take?',
    answer: 'We process all orders within 24 hours. Standard delivery across India takes 3 to 5 business days depending on your pincode.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'Is shipping free for all orders?',
    answer: 'Shipping is FREE for all orders above ₹1,999! For orders under ₹1,999, a flat shipping fee of ₹99 is applied at checkout.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How do I track my order status?',
    answer: 'You can track your order live on our website by going to the Track Order page (/track-order) and entering your Order ID (e.g. DELA-98742).',
  },

  // Returns & Refunds
  {
    category: 'Returns & Refunds',
    question: 'What is your return & exchange policy?',
    answer: 'We offer a 7-day hassle-free return and exchange policy. If you receive a damaged, defective, or incorrect bag, you can request an exchange or refund within 7 days of delivery.',
  },
  {
    category: 'Returns & Refunds',
    question: 'How long does it take to receive a refund?',
    answer: 'Once the returned item is inspected, refunds are credited back to your original payment method (or UPI) within 3 to 5 business days.',
  },

  // Quality & Craftsmanship
  {
    category: 'Quality & Craftsmanship',
    question: 'Are DELA BAGS made of genuine leather?',
    answer: 'We offer both handcrafted genuine leather bags and premium eco-friendly vegan leather bags. Product materials are explicitly detailed on each product specification tab.',
  },
  {
    category: 'Quality & Craftsmanship',
    question: 'How do I clean and care for my DELA BAG?',
    answer: 'Wipe down gently with a damp cloth or soft microfiber cloth. Avoid prolonged exposure to direct rain or extreme heat, and store in the provided dust cover when not in use.',
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  // JSON-LD Structured Data Schema for FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl">
      {/* FAQ JSON-LD Structured Data */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="h-12 w-12 bg-neutral-100 border border-neutral-300 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="h-6 w-6 text-black" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wider">Frequently Asked Questions</h1>
        <p className="text-neutral-600 mt-2 text-xs font-light">
          Everything you need to know about DELA BAGS products, shipping, returns, and ordering.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto mb-10">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input
          type="text"
          placeholder="Search questions (e.g. shipping, payment, returns)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-12 bg-white rounded-none border-neutral-300 text-xs"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white border border-neutral-300">
            <p className="text-xs text-neutral-500">No questions found matching your search term.</p>
            <button onClick={() => setSearch('')} className="mt-2 text-xs font-bold uppercase underline">
              Clear Search
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-neutral-300 bg-white overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-neutral-50 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-sm text-neutral-900 font-heading uppercase">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-neutral-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 bg-[#FAF9F6] font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-16 bg-neutral-950 text-white p-8 border border-neutral-800 text-center space-y-4">
        <h2 className="font-heading text-2xl font-bold uppercase">Still Have Questions?</h2>
        <p className="text-neutral-400 text-xs max-w-md mx-auto font-light">
          Can&apos;t find the answer you&apos;re looking for? Our atelier customer support team is available Mon-Sat, 9:00 AM - 9:00 PM IST.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="https://wa.me/919930009639"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-black font-bold text-xs px-5 py-3 rounded-none hover:bg-[#20ba5a] transition-all uppercase tracking-wider"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Support (+91 99300 09639)
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-bold text-xs px-5 py-3 rounded-none hover:bg-neutral-200 transition-all uppercase tracking-wider"
          >
            <Mail className="h-4 w-4" /> Email Atelier Support
          </Link>
        </div>
      </div>
    </div>
  );
}
