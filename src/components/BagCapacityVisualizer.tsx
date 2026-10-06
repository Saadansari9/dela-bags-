'use client';

import { useState } from 'react';
import { Smartphone, Laptop, Sparkles, Briefcase, Key, Shield, Check, Heart, Smile } from 'lucide-react';

interface BagCapacityProps {
  bagName: string;
  category?: string;
}

const ALL_ITEMS = [
  { id: 'macbook', label: '13" MacBook / Laptop', icon: '💻', fits: true, size: 'Large' },
  { id: 'phone', label: 'iPhone 15 Pro Max', icon: '📱', fits: true, size: 'Small' },
  { id: 'makeup', label: 'Luxury Makeup Pouch', icon: '💄', fits: true, size: 'Medium' },
  { id: 'wallet', label: 'Designer Zip Wallet', icon: '💳', fits: true, size: 'Small' },
  { id: 'sunglasses', label: 'Sunglasses Case', icon: '🕶️', fits: true, size: 'Small' },
  { id: 'waterbottle', label: '500ml Flask / Bottle', icon: '🧴', fits: true, size: 'Medium' },
  { id: 'keys', label: 'Key Ring & Car Key', icon: '🔑', fits: true, size: 'Small' },
  { id: 'airpods', label: 'AirPods Pro Case', icon: '🎧', fits: true, size: 'Small' },
];

export function BagCapacityVisualizer({ bagName, category }: BagCapacityProps) {
  const isToteOrLarge = category?.toLowerCase().includes('tote') || bagName.toLowerCase().includes('tote') || bagName.toLowerCase().includes('work');
  const isSmallSling = category?.toLowerCase().includes('sling') || bagName.toLowerCase().includes('mini');

  const items = ALL_ITEMS.map((item) => {
    if (isSmallSling && (item.id === 'macbook' || item.id === 'waterbottle')) {
      return { ...item, fits: false };
    }
    if (!isToteOrLarge && item.id === 'macbook') {
      return { ...item, fits: false };
    }
    return item;
  });

  const [activeTab, setActiveTab] = useState<'all' | 'essential'>('all');

  const fittingCount = items.filter((i) => i.fits).length;

  return (
    <div className="bg-[#FAF9F6] border border-neutral-200 p-5 rounded-none space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-black">
            What Fits Inside ({fittingCount} Daily Essentials)
          </h3>
        </div>
        <span className="text-[11px] font-mono font-bold bg-neutral-900 text-white px-2 py-0.5 uppercase">
          Capacity Verified
        </span>
      </div>

      <p className="text-xs text-neutral-600">
        Interactive guide showing real-world item dimensions that fit comfortably inside <strong>{bagName}</strong> without losing shape.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-2.5 border text-xs flex flex-col justify-between transition-all ${
              item.fits
                ? 'bg-white border-neutral-300 text-black shadow-2xs'
                : 'bg-neutral-100/70 border-neutral-200 text-neutral-400 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xl" role="img" aria-label={item.label}>{item.icon}</span>
              {item.fits ? (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase text-green-700 bg-green-50 px-1.5 py-0.5 border border-green-200">
                  <Check className="h-2.5 w-2.5" /> Fits
                </span>
              ) : (
                <span className="text-[9px] font-bold uppercase text-neutral-400 bg-neutral-200 px-1.5 py-0.5">
                  Too Big
                </span>
              )}
            </div>
            <span className="font-medium text-[11px] line-clamp-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
