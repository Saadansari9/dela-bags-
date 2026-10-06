'use client';

import { useState } from 'react';
import { Sparkles, Check, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MonogramProps {
  onMonogramChange: (monogram: { text: string; style: string } | null) => void;
}

export function MonogramCustomizer({ onMonogramChange }: MonogramProps) {
  const [enabled, setEnabled] = useState(false);
  const [initials, setInitials] = useState('');
  const [style, setStyle] = useState<'Gold Foil' | 'Silver Foil' | 'Blind Emboss'>('Gold Foil');

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setEnabled(isChecked);
    if (!isChecked) {
      onMonogramChange(null);
    } else if (initials.trim()) {
      onMonogramChange({ text: initials.trim().toUpperCase(), style });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().slice(0, 3);
    setInitials(val);
    if (enabled) {
      if (val.trim()) {
        onMonogramChange({ text: val.trim(), style });
      } else {
        onMonogramChange(null);
      }
    }
  };

  const handleStyleSelect = (newStyle: 'Gold Foil' | 'Silver Foil' | 'Blind Emboss') => {
    setStyle(newStyle);
    if (enabled && initials.trim()) {
      onMonogramChange({ text: initials.trim().toUpperCase(), style: newStyle });
    }
  };

  return (
    <div className="border border-neutral-300 bg-white p-4 space-y-3">
      <label className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={enabled}
            onChange={handleToggle}
            className="h-4 w-4 rounded-none text-black focus:ring-black accent-black"
          />
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" /> Custom Monogram Engraving (+ Free Complementary)
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 border border-green-200">
          FREE VIP LUXURY
        </span>
      </label>

      {enabled && (
        <div className="space-y-3 pt-2 border-t border-neutral-100 animate-in fade-in-50 duration-300">
          <p className="text-[11px] text-neutral-500">
            Personalize your bag with up to 3 initials handcrafted by our master atelier artisans.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1 block">
                Enter Initials (Max 3 Letters)
              </label>
              <Input
                type="text"
                maxLength={3}
                placeholder="e.g. S.A"
                value={initials}
                onChange={handleTextChange}
                className="font-mono text-center uppercase text-base font-bold tracking-[0.3em] h-10 rounded-none border-neutral-300 bg-[#FAF9F6]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1 block">
                Foil Finish
              </label>
              <div className="flex gap-1.5">
                {(['Gold Foil', 'Silver Foil', 'Blind Emboss'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStyleSelect(s)}
                    className={`flex-1 text-[10px] font-semibold py-2.5 px-1 uppercase tracking-wider border transition-all ${
                      style === s
                        ? 'bg-black text-white border-black font-bold'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {s === 'Gold Foil' ? '✨ Gold' : s === 'Silver Foil' ? '🥈 Silver' : '🖤 Embossed'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Engraving Preview Badge */}
          {initials.trim() && (
            <div className="bg-[#FAF9F6] border border-amber-300 p-3 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-900 tracking-widest block">
                Live Engraving Preview
              </span>
              <div
                className={`inline-block font-mono text-2xl font-black tracking-[0.4em] px-4 py-1.5 border shadow-inner ${
                  style === 'Gold Foil'
                    ? 'text-amber-600 border-amber-400 bg-gradient-to-r from-amber-50 via-yellow-100 to-amber-50'
                    : style === 'Silver Foil'
                    ? 'text-slate-600 border-slate-300 bg-gradient-to-r from-slate-100 via-neutral-200 to-slate-100'
                    : 'text-neutral-800 border-neutral-400 bg-neutral-200/50'
                }`}
              >
                {initials.toUpperCase()}
              </div>
              <p className="text-[10px] text-amber-700 italic">
                Hand-stamped in luxury {style} finish on front leather tag.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
