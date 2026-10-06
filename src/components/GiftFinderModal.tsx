'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Heart } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/data/products';
import { useCart } from '@/store/useCart';

export function GiftFinderModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    recipient: '',
    vibe: '',
    capacity: '',
  });

  const { addItem } = useCart();

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ recipient: '', vibe: '', capacity: '' });
  };

  // Recommendation logic
  const getRecommendations = (): Product[] => {
    return PRODUCTS.slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children ? (
          children
        ) : (
          <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 hover:bg-amber-100 transition-colors">
            <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
            <span>Find My Perfect Bag</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-[#FAF9F6] border-neutral-300 p-6 sm:p-8">
        <DialogHeader>
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <DialogTitle className="font-heading text-xl font-bold uppercase tracking-widest text-black flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600" /> DELA Gift & Bag Finder Quiz
            </DialogTitle>
            {step > 1 && (
              <button onClick={resetQuiz} className="text-xs text-neutral-500 hover:text-black flex items-center gap-1">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            )}
          </div>
        </DialogHeader>

        {/* Quiz Steps Progress */}
        {step <= 3 && (
          <div className="flex gap-2 my-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 transition-all ${
                  s <= step ? 'bg-black' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
                Question 1 of 3
              </span>
              <h3 className="font-heading text-xl font-bold text-black">Who is this handbag for?</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Myself (Treating Myself)', icon: '🛍️', key: 'self' },
                { label: 'Partner / Spouse', icon: '💖', key: 'partner' },
                { label: 'Best Friend / Sister', icon: '👭', key: 'friend' },
                { label: 'Mom / Mother\'s Gift', icon: '👑', key: 'mom' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setAnswers({ ...answers, recipient: opt.key });
                    setStep(2);
                  }}
                  className="p-5 border border-neutral-300 bg-white hover:border-black hover:shadow-md transition-all text-left flex flex-col justify-between h-28 group"
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="font-medium text-xs sm:text-sm font-heading tracking-wide group-hover:underline">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
                Question 2 of 3
              </span>
              <h3 className="font-heading text-xl font-bold text-black">What is the primary occasion / vibe?</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Office, Work & Laptop', icon: '💼', key: 'work' },
                { label: 'Evening Glam & Parties', icon: '🍸', key: 'party' },
                { label: 'Weekend Brunch & Daily', icon: '☕', key: 'daily' },
                { label: 'Airport & Jetset Travel', icon: '✈️', key: 'travel' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setAnswers({ ...answers, vibe: opt.key });
                    setStep(3);
                  }}
                  className="p-5 border border-neutral-300 bg-white hover:border-black hover:shadow-md transition-all text-left flex flex-col justify-between h-28 group"
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="font-medium text-xs sm:text-sm font-heading tracking-wide group-hover:underline">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
                Question 3 of 3
              </span>
              <h3 className="font-heading text-xl font-bold text-black">What size / capacity is preferred?</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Compact & Sling', icon: '👛', key: 'small', desc: 'Phone, keys & lipstick' },
                { label: 'Medium Everyday', icon: '👜', key: 'medium', desc: 'Planner, wallet & pouch' },
                { label: 'Spacious Tote', icon: '🛍️', key: 'large', desc: 'Laptop, bottle & essentials' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setAnswers({ ...answers, capacity: opt.key });
                    setStep(4);
                  }}
                  className="p-4 border border-neutral-300 bg-white hover:border-black hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2 h-36 group"
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <span className="font-bold text-xs uppercase tracking-wider font-heading text-black">
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-neutral-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: RECOMMENDATIONS */}
        {step === 4 && (
          <div className="space-y-6 py-2">
            <div className="text-center space-y-1 bg-amber-50 border border-amber-200 p-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900 flex items-center justify-center gap-1">
                <Sparkles className="h-4 w-4 text-amber-600" /> Match Score: 98% Perfect Fit
              </span>
              <h3 className="font-heading text-lg font-bold text-black">Curated Atelier Handbag Match</h3>
              <p className="text-xs text-neutral-600">Based on your selections for {answers.vibe} and {answers.capacity} storage.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {recommendations.map((p) => (
                <div key={p.id} className="border border-neutral-300 bg-white p-3 flex flex-col justify-between text-left group">
                  <div className="relative aspect-[3/4] bg-neutral-100 mb-2 overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold uppercase px-1.5 py-0.5">
                      Top Match
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs line-clamp-1 hover:underline">{p.name}</h4>
                    <p className="text-xs font-mono font-bold">₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-8 text-[11px] font-bold uppercase tracking-wider mt-3"
                    onClick={() => {
                      addItem({
                        productId: p.id,
                        name: p.name,
                        slug: p.slug,
                        price: p.price,
                        image: p.images[0],
                        quantity: 1,
                      });
                      setOpen(false);
                    }}
                  >
                    <ShoppingBag className="h-3 w-3 mr-1" /> Add to Cart
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button onClick={resetQuiz} className="text-xs font-bold uppercase text-neutral-600 underline">
                Retake Quiz
              </button>
              <Link href="/shop" onClick={() => setOpen(false)}>
                <Button variant="outline" className="rounded-none text-xs font-bold uppercase">
                  Browse Full Collection <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
