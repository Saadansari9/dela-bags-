'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, Sparkles, Gift, ShieldCheck, Zap, ArrowRight, CheckCircle2, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RewardsPage() {
  const [points, setPoints] = useState(1250);
  const [claimedDaily, setClaimedDaily] = useState(false);
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);

  const claimDailyBonus = () => {
    if (claimedDaily) return;
    setPoints((p) => p + 100);
    setClaimedDaily(true);
  };

  const redeemVoucher = (cost: number, code: string) => {
    if (points < cost) return;
    setPoints((p) => p - cost);
    setRedeemedCode(code);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="bg-black text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-neutral-800">
          <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-6">
            <Crown className="h-4 w-4 text-amber-400" /> DELA VIP Privé Atelier Club
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight mb-4 uppercase">
            Exclusive Luxury Rewards & VIP Tier
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Earn 10 Privé Points for every ₹100 spent. Unlock complementary monogramming, express priority shipping, and secret atelier discounts.
          </p>

          {/* Points Status Box */}
          <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-6 bg-neutral-900/90 border border-neutral-700 p-6 px-8 max-w-md w-full justify-between">
            <div className="text-left">
              <span className="text-xs text-neutral-400 uppercase tracking-widest block">Your Privé Points Balance</span>
              <span className="font-mono text-4xl font-extrabold text-amber-400">{points.toLocaleString('en-IN')} <span className="text-sm font-sans font-normal text-white">PTS</span></span>
            </div>
            <Button
              onClick={claimDailyBonus}
              disabled={claimedDaily}
              className={`rounded-none h-11 px-6 text-xs font-bold uppercase tracking-wider ${
                claimedDaily
                  ? 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                  : 'bg-amber-400 text-black hover:bg-amber-300 shadow-lg'
              }`}
            >
              {claimedDaily ? '✓ Daily Bonus Claimed' : '✨ Claim +100 Daily Pts'}
            </Button>
          </div>
        </div>

        {/* Redeemed Success Modal / Alert */}
        {redeemedCode && (
          <div className="bg-green-50 border-2 border-green-500 p-6 text-center space-y-2 animate-in fade-in duration-300">
            <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
            <h3 className="font-heading text-xl font-bold text-green-900">Voucher Successfully Unlocked!</h3>
            <p className="text-sm text-green-800">
              Use Coupon Code <strong className="font-mono text-base bg-white px-2 py-0.5 border border-green-400 uppercase">{redeemedCode}</strong> at checkout for your discount.
            </p>
          </div>
        )}

        {/* VIP Tiers Breakdown */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-heading text-2xl font-bold text-black uppercase">VIP Membership Tiers</h2>
            <p className="text-xs text-neutral-500">Your tier elevates automatically as you shop.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: 'SILVER LUXE',
                spend: '₹0 - ₹4,999',
                perks: ['10 Pts per ₹100', 'Birthday Bonus Coupon', 'Standard Express Shipping'],
                active: true,
                badge: 'Current Tier',
                color: 'border-slate-300 bg-white',
              },
              {
                tier: 'GOLD ATELIER',
                spend: '₹5,000 - ₹14,999',
                perks: ['15 Pts per ₹100', 'FREE Monogram Engraving', 'Early Access to New Launches'],
                active: false,
                badge: 'Unlock at ₹5k',
                color: 'border-amber-400 bg-amber-50/30',
              },
              {
                tier: 'PLATINUM PRIVÉ',
                spend: '₹15,000+',
                perks: ['20 Pts per ₹100', 'Complimentary Leather Care Kit', 'Dedicated Personal Concierge'],
                active: false,
                badge: 'Luxe Privilege',
                color: 'border-black bg-neutral-900 text-white',
              },
            ].map((t) => (
              <div key={t.tier} className={`border p-6 flex flex-col justify-between space-y-6 relative ${t.color}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-heading font-bold text-lg uppercase tracking-wider ${t.tier === 'PLATINUM PRIVÉ' ? 'text-white' : 'text-black'}`}>
                        {t.tier}
                      </h3>
                      <span className={`text-xs ${t.tier === 'PLATINUM PRIVÉ' ? 'text-neutral-400' : 'text-neutral-500'}`}>{t.spend}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                      t.active
                        ? 'bg-black text-white'
                        : t.tier === 'PLATINUM PRIVÉ'
                        ? 'bg-amber-400 text-black'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {t.badge}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs pt-3 border-t border-neutral-200/50">
                    {t.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/shop">
                  <Button className={`w-full rounded-none text-xs font-bold uppercase tracking-wider h-10 ${
                    t.tier === 'PLATINUM PRIVÉ'
                      ? 'bg-amber-400 text-black hover:bg-amber-300'
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}>
                    Shop & Elevate Tier
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Redeemable Rewards Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-heading text-2xl font-bold text-black uppercase">Redeem Privé Vouchers</h2>
            <p className="text-xs text-neutral-500">Exchange your Privé Points for instant order discount codes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '₹200 Instant Discount', cost: 500, code: 'PRIVEE200', desc: 'Valid on orders above ₹1,499' },
              { title: '₹500 VIP Voucher', cost: 1000, code: 'LUXE500', desc: 'Valid on any handbag purchase' },
              { title: '15% OFF Atelier Pass', cost: 1500, code: 'ATELIER15', desc: 'Valid on total cart subtotal' },
            ].map((v) => (
              <div key={v.code} className="border border-neutral-300 bg-white p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-200">
                    {v.cost} POINTS
                  </span>
                  <h3 className="font-heading font-bold text-lg text-black">{v.title}</h3>
                  <p className="text-xs text-neutral-500">{v.desc}</p>
                </div>

                <Button
                  onClick={() => redeemVoucher(v.cost, v.code)}
                  disabled={points < v.cost}
                  className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-10 text-xs font-bold uppercase tracking-wider disabled:bg-neutral-200 disabled:text-neutral-400"
                >
                  {points >= v.cost ? `Redeem for ${v.cost} Pts` : `Need ${v.cost - points} More Pts`}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
