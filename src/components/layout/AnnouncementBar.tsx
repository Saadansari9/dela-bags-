'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Tag, Truck, ShieldCheck, Sparkles } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: Tag,
    text: '🎉 FLAT 10% OFF ON YOUR FIRST ORDER — USE CODE: DELA10',
  },
  {
    icon: Truck,
    text: '🚚 FREE EXPRESS SHIPPING ACROSS INDIA ON ORDERS ABOVE ₹1,999',
  },
  {
    icon: ShieldCheck,
    text: '💵 CASH ON DELIVERY AVAILABLE ACROSS 25,000+ PINCODES',
  },
  {
    icon: Sparkles,
    text: '✨ HANDCRAFTED PREMIUM VEGAN LEATHER BAGS & ACCESSORIES',
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="bg-black text-white border-b border-neutral-800 text-[11px] md:text-xs font-bold py-2 text-center tracking-[0.2em] uppercase relative select-none">
      <div className="container mx-auto px-8 flex justify-center items-center gap-2">
        <IconComponent className="h-3.5 w-3.5 text-amber-400 shrink-0 animate-pulse" />
        <span className="truncate transition-all duration-500">{current.text}</span>
      </div>

      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors"
        aria-label="Previous Announcement"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors"
        aria-label="Next Announcement"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
