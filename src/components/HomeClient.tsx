"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Camera,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Heart,
} from "lucide-react";
import { useCart } from "@/store/useCart";
import { useWishlist } from "@/store/useWishlist";
import { useProductStore } from "@/store/useProductStore";
import type { Product } from "@/lib/data/products";

const HERO_SLIDES = [
  {
    tagline: "AUTUMN / WINTER 2026 ATELIER",
    title: "Timeless Form.",
    highlight: "Modern Luxury.",
    subtitle: "Artisanal vegan leather handbags crafted with precision stitching, anti-tarnish gold hardware, and effortless Indian elegance.",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2070&auto=format&fit=crop",
    alt: "Classic black quilted leather handbag with gold chain detail in luxury studio lighting",
    badge: "COLLECTION NO. 01 — THE QUILTED EDIT",
    primaryCta: "SHOP WOMEN'S ATELIER",
    primaryLink: "/shop?category=ladies-handbags",
    secondaryCta: "EXPLORE LOOKBOOK",
    secondaryLink: "/shop",
  },
  {
    tagline: "EXECUTIVE ARCHIVE — MEN'S COLLECTION",
    title: "Executive Edge.",
    highlight: "Refined Utility.",
    subtitle: "Weatherproof messenger bags, structured laptop folios, and full-grain travel holdalls tailored for the discerning modern gentleman.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2070&auto=format&fit=crop",
    alt: "Male executive model carrying a cognac brown leather crossbody laptop bag",
    badge: "COLLECTION NO. 02 — WORK & COMMUTE",
    primaryCta: "SHOP MEN'S WORKWEAR",
    primaryLink: "/shop?category=mens-bags",
    secondaryCta: "TRAVEL DUFFELS",
    secondaryLink: "/shop?category=travel-bags",
  },
  {
    tagline: "MINIMALIST SILHOUETTES — DAILY EDITS",
    title: "Sculptural Grace.",
    highlight: "Effortless Chic.",
    subtitle: "Featherlight crossbody slings and sculptural underarm shoulder bags engineered to carry your essentials in pure understated elegance.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2070&auto=format&fit=crop",
    alt: "Fashion model wearing a minimalist beige vegan leather sling bag against neutral tones",
    badge: "COLLECTION NO. 03 — CASUAL LUXURY",
    primaryCta: "SHOP SLING BAGS",
    primaryLink: "/shop?category=sling-bags",
    secondaryCta: "EVERYDAY TOTES",
    secondaryLink: "/shop?category=tote-bags",
  },
];

const CATEGORIES = [
  {
    name: "Luxury Handbags",
    slug: "ladies-handbags",
    group: "women",
    subtitle: "Timeless Vegan Leather Totes & Top-Handles",
    tag: "🔥 BESTSELLER",
    count: "18+ Styles",
    startingPrice: "₹1,899",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
    alt: "Classic brown vegan leather handbag on display",
    featured: true,
  },
  {
    name: "Men's Executive Bags",
    slug: "mens-bags",
    group: "men",
    subtitle: "Rugged Crossbody, Messenger & Laptop Sleeves",
    tag: "⚡ EXECUTIVE CHOICE",
    count: "15+ Styles",
    startingPrice: "₹1,999",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    alt: "Male model carrying a rugged black ballistic nylon crossbody bag",
    featured: true,
  },
  {
    name: "Chic Sling Bags",
    slug: "sling-bags",
    group: "women",
    subtitle: "Lightweight Crossbody & Hands-Free Slings",
    tag: "✨ TRENDING NOW",
    count: "14+ Styles",
    startingPrice: "₹1,299",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
    alt: "Model wearing a minimalist tan leather sling bag with adjustable strap",
  },
  {
    name: "Spacious Tote Bags",
    slug: "tote-bags",
    group: "travel",
    subtitle: "Workplace Canvas & Everyday Shoulder Totes",
    tag: "🌟 EVERYDAY ESSENTIAL",
    count: "12+ Styles",
    startingPrice: "₹1,499",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    alt: "Woman carrying a spacious cotton canvas everyday tote bag",
  },
  {
    name: "Shoulder Handbags",
    slug: "shoulder-bags",
    group: "women",
    subtitle: "Minimalist Underarm & Evening Shoulder Bags",
    tag: "💫 NEW COLLECTION",
    count: "10+ Styles",
    startingPrice: "₹1,699",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
    alt: "Beige leather shoulder bag held by a fashion model",
  },
  {
    name: "Travel Duffel Bags",
    slug: "travel-bags",
    group: "travel",
    subtitle: "Weekender Holdalls & Leather Travel Duffels",
    tag: "✈️ PAN-INDIA EXPRESS",
    count: "8+ Styles",
    startingPrice: "₹2,499",
    image: "https://images.unsplash.com/photo-1553531384-411a4ff74811?q=80&w=1000&auto=format&fit=crop",
    alt: "Executive leather travel duffel bag with shoe compartment",
  },
];

export default function HomeClient({
  bestsellers,
  newArrivals,
}: {
  bestsellers: Product[];
  newArrivals: Product[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>("all");
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const productStore = useProductStore();

  const activeBestsellers = productStore.getFilteredProducts(bestsellers);

  const filteredBestsellers =
    selectedCategoryTab === "all"
      ? activeBestsellers
      : activeBestsellers.filter(
          (p) =>
            p.categorySlug === selectedCategoryTab ||
            (selectedCategoryTab === "mens-bags" && (p.categorySlug === "mens-bags" || p.categorySlug === "travel-bags"))
        );

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    setAddedToast(`Added ${product.name} to Bag`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="flex flex-col w-full bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3.5 shadow-2xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono uppercase tracking-widest font-bold">{addedToast}</span>
          <Link href="/cart" className="text-xs underline text-amber-300 font-bold ml-2">
            View Bag →
          </Link>
        </div>
      )}

      {/* 1. ULTRA-LUXURY HERO SLIDER */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center bg-stone-950 overflow-hidden">
        {/* Slide Image Backgrounds with Ken-Burns Motion */}
        {HERO_SLIDES.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={idx}
              className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-90 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={idx === 0}
                className={`object-cover transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
              {/* Dual Vignette & Luxury Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>
          );
        })}

        {/* Hero Content Container */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-32 text-white">
          <div className="max-w-2xl space-y-6 animate-in fade-in duration-700">
            {/* Tagline / Micro-badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/10 backdrop-blur-md text-stone-200 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.3em] uppercase border border-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{slide.tagline}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              {slide.title}{" "}
              <span className="italic font-serif font-normal text-stone-300 block sm:inline mt-1 sm:mt-0">
                {slide.highlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-stone-300 font-light leading-relaxed max-w-lg">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link href={slide.primaryLink}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-stone-200 rounded-none px-8 sm:px-10 h-13 font-bold tracking-[0.22em] uppercase text-xs shadow-xl transition-all duration-300 hover:gap-3"
                >
                  <span>{slide.primaryCta}</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href={slide.secondaryLink}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-black/30 text-white border border-white/60 hover:bg-white hover:text-black rounded-none px-7 sm:px-9 h-13 font-bold tracking-[0.22em] uppercase text-xs backdrop-blur-md transition-all duration-300"
                >
                  {slide.secondaryCta}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 sm:left-6 z-20 p-3 rounded-none bg-black/40 hover:bg-black text-white backdrop-blur-md transition-all hidden md:flex items-center justify-center border border-white/20 hover:border-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 sm:right-6 z-20 p-3 rounded-none bg-black/40 hover:bg-black text-white backdrop-blur-md transition-all hidden md:flex items-center justify-center border border-white/20 hover:border-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Modern Slide Progress Counter Bar (01 / 03) */}
        <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-12 z-20 flex items-center gap-4 bg-black/50 backdrop-blur-md px-4 py-2.5 border border-white/15">
          <span className="font-mono text-xs font-bold text-white tracking-widest">
            0{currentSlide + 1}
          </span>
          <div className="flex gap-1.5 w-24">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="h-1 flex-1 relative overflow-hidden bg-white/25 rounded-none transition-all"
                aria-label={`Jump to slide ${i + 1}`}
              >
                {i === currentSlide && (
                  <div className="absolute inset-0 bg-white animate-pulse" />
                )}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] text-stone-400 tracking-widest">
            / 0{HERO_SLIDES.length}
          </span>
        </div>

        {/* Floating Bottom Stats Strip */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 text-neutral-900 text-xs py-3.5 hidden md:block">
          <div className="container mx-auto px-6 flex justify-between items-center tracking-[0.18em] uppercase font-semibold text-[11px]">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-black shrink-0" />
              <span>Certified Vegan Leather</span>
            </div>
            <div className="h-3 w-px bg-neutral-300" />
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-black shrink-0" />
              <span>Free Express Dispatch India</span>
            </div>
            <div className="h-3 w-px bg-neutral-300" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-black shrink-0" />
              <span>256-Bit SSL Encrypted Razorpay</span>
            </div>
            <div className="h-3 w-px bg-neutral-300" />
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-black shrink-0" />
              <span>7-Day Easy Returns Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE LUXURY RUNWAY TICKER RIBBON */}
      <section className="bg-neutral-950 text-stone-300 py-3 border-y border-neutral-800 overflow-hidden select-none">
        <div className="flex whitespace-nowrap gap-12 font-mono text-[10px] uppercase tracking-[0.28em] font-semibold">
          {[1, 2, 3].map((k) => (
            <div key={k} className="flex items-center gap-12 shrink-0">
              <span className="flex items-center gap-2 text-white">
                <Sparkles className="h-3 w-3 text-amber-400" /> AUTUMN / WINTER 2026 DROP LIVE
              </span>
              <span>•</span>
              <span>COMPLIMENTARY EXPRESS DELIVERY OVER ₹1,999</span>
              <span>•</span>
              <span className="text-amber-300">100% HANDCRAFTED IN MUMBAI ATELIER</span>
              <span>•</span>
              <span>100% SECURE PREPAID ORDERS & INSTANT UPI</span>
              <span>•</span>
              <span>24K GOLD-TONE ANTI-TARNISH HARDWARE</span>
              <span>•</span>
              <span>7-DAY EFFORTLESS EXCHANGES</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL LOOKBOOK SPLIT (FOR HER & FOR HIM) */}
      <section className="py-14 sm:py-20 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-neutral-500">
              Curated Wardrobe
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              The Dual <span className="font-serif italic font-normal text-stone-600">Lookbook</span>
            </h2>
            <div className="h-0.5 w-12 bg-black mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Women's Editorial Lookbook */}
            <Link
              href="/shop?category=ladies-handbags"
              className="group relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-md transition-all duration-700 hover:border-black hover:shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1400&auto=format&fit=crop"
                alt="Women's Luxury Handbag Lookbook"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-out opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

              {/* Top Tag */}
              <div className="absolute top-5 left-5 z-10">
                <span className="bg-white text-black text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.25em] px-3 py-1 border border-white">
                  EDITORIAL VOL. 01 / FOR HER
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 space-y-2 z-10">
                <span className="text-amber-300 text-[10px] font-mono font-bold uppercase tracking-widest block">
                  ATELIER HANDBAGS & SLINGS
                </span>
                <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                  Women&apos;s Collection
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md line-clamp-2 leading-relaxed">
                  Sculptural top-handle totes, quilted evening baguettes, and structured slings designed for modern poise.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-[0.22em] group-hover:text-amber-300 transition-colors">
                  <span>DISCOVER WOMEN&apos;S ARCHIVE</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Men's Editorial Lookbook */}
            <Link
              href="/shop?category=mens-bags"
              className="group relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-md transition-all duration-700 hover:border-black hover:shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1400&auto=format&fit=crop"
                alt="Men's Executive Work Bags Lookbook"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-out opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

              {/* Top Tag */}
              <div className="absolute top-5 left-5 z-10">
                <span className="bg-white text-black text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.25em] px-3 py-1 border border-white">
                  ARCHIVE VOL. 02 / FOR HIM
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 space-y-2 z-10">
                <span className="text-amber-300 text-[10px] font-mono font-bold uppercase tracking-widest block">
                  COMMUTE & TRAVEL ARCHIVES
                </span>
                <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                  Men&apos;s Collection
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md line-clamp-2 leading-relaxed">
                  Rugged ballistic messengers, 15&quot; padded leather laptop folios, and expandable weekend travel duffels.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-[0.22em] group-hover:text-amber-300 transition-colors">
                  <span>DISCOVER MEN&apos;S WORKWEAR</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES LUXURY BENTO GRID */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Subtitle */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold uppercase tracking-widest border border-neutral-300 mb-2">
                ✨ Curated Range
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                Shop By <span className="font-serif italic font-normal text-stone-600">Category</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-bold text-black hover:opacity-70 transition-opacity uppercase tracking-[0.2em] border-b-2 border-black pb-1"
            >
              BROWSE ALL 50+ DESIGNS <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Luxury Bento Grid */}
          <div className="space-y-6">
            {/* Top Row: 2 Large Hero Featured Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CATEGORIES.filter((c) => c.featured).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className="group relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-stone-900 border border-neutral-200 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-black"
                >
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-out opacity-85"
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                    <span className="bg-white/90 backdrop-blur-md text-black text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 border border-white">
                      {cat.tag}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 border border-white/20">
                      {cat.count}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-2 z-10 transition-transform duration-300">
                    <span className="text-amber-300 text-[10px] font-mono font-bold uppercase tracking-widest">
                      From {cat.startingPrice}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-300 font-light max-w-sm line-clamp-1">
                      {cat.subtitle}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-[0.2em] group-hover:text-amber-300 transition-colors">
                      <span>EXPLORE COLLECTION</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Row: 4 Medium Category Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CATEGORIES.filter((c) => !c.featured).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-neutral-200/80 transition-all duration-500 hover:border-black hover:shadow-lg"
                >
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Top Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 border border-white/20">
                      {cat.count}
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 inset-x-0 p-4 space-y-1 z-10">
                    <span className="text-amber-300 text-[9px] font-mono font-bold uppercase tracking-widest block">
                      From {cat.startingPrice}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wide">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-neutral-300 font-light line-clamp-1">
                      {cat.subtitle}
                    </p>
                    <div className="pt-1 flex items-center text-[11px] font-bold text-white uppercase tracking-wider group-hover:text-amber-300 transition-colors">
                      <span>SHOP NOW</span> <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY VIP PRIVÉ & GIFT FINDER BANNER */}
      <section className="py-12 bg-neutral-900 text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* VIP Club */}
            <div className="bg-neutral-950 p-8 border border-neutral-800 relative overflow-hidden group">
              <div className="space-y-3 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 border border-amber-400/30 inline-block">
                  ✨ DELA VIP Privé Atelier
                </span>
                <h3 className="font-heading text-2xl font-bold uppercase">Earn Privé Points On Every Purchase</h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                  Join our exclusive loyalty tier. Unlock free Gold Foil monogramming, priority express dispatch, and instant discount vouchers.
                </p>
                <Link href="/rewards">
                  <Button className="mt-2 bg-amber-400 text-black hover:bg-amber-300 rounded-none h-10 text-xs font-bold uppercase tracking-wider">
                    Explore VIP Club <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Reviews Wall */}
            <div className="bg-neutral-950 p-8 border border-neutral-800 relative overflow-hidden group">
              <div className="space-y-3 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-green-400 bg-green-400/10 px-2.5 py-1 border border-green-400/30 inline-block">
                  ⭐ 100% Authentic Customer Feedback
                </span>
                <h3 className="font-heading text-2xl font-bold uppercase">Customer Reviews & Testimonials</h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                  Read genuine feedback and unboxing experiences submitted directly by verified DELA BAGS buyers across India.
                </p>
                <Link href="/reviews">
                  <Button variant="outline" className="mt-2 border-white text-white hover:bg-white hover:text-black rounded-none h-10 text-xs font-bold uppercase tracking-wider">
                    Read & Write Customer Reviews <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS PRODUCT GRID WITH INTERACTIVE CATEGORY TABS */}
      <section className="py-20 sm:py-24 bg-[#FAF9F6] border-t border-neutral-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-200/70 text-neutral-800 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                Curated Essentials
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                Trending <span className="font-serif italic font-normal text-stone-600">Creations</span>
              </h2>
            </div>
            <Link
              href="/shop?sort=bestselling"
              className="flex items-center gap-2 text-xs font-bold text-neutral-900 hover:text-stone-600 transition-colors uppercase tracking-[0.2em] border-b border-black pb-1"
            >
              EXPLORE FULL ATELIER ({activeBestsellers.length} PIECES) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {[
              { label: "ALL PIECES", slug: "all" },
              { label: "LUXURY HANDBAGS", slug: "ladies-handbags" },
              { label: "SLING BAGS", slug: "sling-bags" },
              { label: "TOTE BAGS", slug: "tote-bags" },
              { label: "MEN'S ARCHIVE", slug: "mens-bags" },
            ].map((tab) => {
              const isActive = selectedCategoryTab === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => setSelectedCategoryTab(tab.slug)}
                  className={`px-4 sm:px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shrink-0 rounded-none border ${
                    isActive
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredBestsellers.slice(0, 8).map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              const isWishlisted = mounted && wishlist.hasItem(product.id);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col border border-neutral-200/90 bg-white rounded-none overflow-hidden transition-all duration-500 hover:border-black hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-out"
                      />
                    </Link>

                    {/* Top Left Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {discount > 0 && (
                        <div className="bg-black text-white text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider rounded-none">
                          SAVE {discount}%
                        </div>
                      )}
                      {product.bestseller && (
                        <div className="bg-amber-400 text-black text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                          BESTSELLER
                        </div>
                      )}
                    </div>

                    {/* Wishlist Heart Top Right */}
                    <button
                      onClick={() =>
                        isWishlisted
                          ? wishlist.removeItem(product.id)
                          : wishlist.addItem({
                              productId: product.id,
                              name: product.name,
                              slug: product.slug,
                              price: product.price,
                              image: product.images[0],
                            })
                      }
                      className="absolute top-3 right-3 z-10 h-8 w-8 bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors"
                      title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                    >
                      <Heart
                        className={`h-4 w-4 ${isWishlisted ? "fill-red-600 text-red-600" : "text-neutral-700"}`}
                      />
                    </button>

                    {/* Quick Add Overlay on Hover */}
                    <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 hidden sm:block z-10">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-black text-white hover:bg-neutral-800 rounded-none text-xs font-bold py-2.5 tracking-[0.18em] uppercase shadow-lg"
                      >
                        <ShoppingBag className="mr-2 h-3.5 w-3.5 text-amber-400" /> QUICK ADD TO BAG
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white space-y-1.5">
                    <p className="text-[10px] text-neutral-400 uppercase font-mono font-semibold tracking-[0.2em]">
                      {product.category}
                    </p>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-medium text-xs sm:text-sm text-neutral-900 line-clamp-1 hover:underline underline-offset-4"
                    >
                      {product.name}
                    </Link>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 pt-0.5">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-neutral-200"
                            }`}
                          />
                        ))}
                      <span className="text-[10px] font-mono text-neutral-400 ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price and Mobile Add */}
                    <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-neutral-100">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-sm sm:text-base text-neutral-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* Mobile tap button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="sm:hidden text-[10px] font-mono font-bold uppercase tracking-wider bg-black text-white px-2 py-1"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. THE ATELIER STANDARDS (CRAFTSMANSHIP SHOWCASE) */}
      <section className="py-20 sm:py-28 bg-white border-t border-neutral-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-neutral-500">
              Artisanal Dedication
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              The Art of <span className="font-serif italic font-normal text-stone-600">Dela Atelier</span>
            </h2>
            <div className="h-0.5 w-12 bg-black mx-auto mt-3" />
            <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-md mx-auto pt-1">
              Every handbag is cut, edge-painted, and hand-finished by master leather artisans in Mumbai using ethical European-standard vegan hides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-neutral-200/90 bg-[#FAF9F6] relative group hover:border-black transition-all duration-500">
              <span className="font-mono text-3xl font-bold text-neutral-300 group-hover:text-black transition-colors block mb-4">
                01
              </span>
              <h3 className="font-heading font-bold text-lg uppercase text-black mb-2 tracking-wide">
                Certified Vegan Hide
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
                Supple, scratch-resistant, and water-repellent microfibre leather that mimics the soft patina of fine leather without animal harm.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                100% PETA-Approved
              </div>
            </div>

            <div className="p-8 border border-neutral-200/90 bg-[#FAF9F6] relative group hover:border-black transition-all duration-500">
              <span className="font-mono text-3xl font-bold text-neutral-300 group-hover:text-black transition-colors block mb-4">
                02
              </span>
              <h3 className="font-heading font-bold text-lg uppercase text-black mb-2 tracking-wide">
                24K Gold PVD Hardware
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
                Custom metal zip sliders, swivel hooks, and brand emblems finished with physical vapour deposition for lifetime anti-tarnish luster.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Salt-Spray Tested
              </div>
            </div>

            <div className="p-8 border border-neutral-200/90 bg-[#FAF9F6] relative group hover:border-black transition-all duration-500">
              <span className="font-mono text-3xl font-bold text-neutral-300 group-hover:text-black transition-colors block mb-4">
                03
              </span>
              <h3 className="font-heading font-bold text-lg uppercase text-black mb-2 tracking-wide">
                Pan-India Express Priority
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
                Dispatched directly from Mumbai via premium express couriers with live GPS tracking, 7-day no-questions return policy, and 100% buyer protection.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                19,000+ PIN Codes Covered
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link href="/reviews">
              <Button className="bg-black text-white hover:bg-neutral-800 rounded-none h-13 px-10 text-xs font-bold uppercase tracking-[0.2em] shadow-md">
                READ AUTHENTIC CUSTOMER TESTIMONIALS <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM STYLE GALLERY */}
      <section className="py-20 bg-[#FAF9F6] border-t border-neutral-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-neutral-600 text-[11px] font-semibold uppercase tracking-[0.25em] mb-1">
              <Camera className="h-3.5 w-3.5" /> Follow Us @delabags
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">#DelaStyle Community</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { src: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop", alt: "DELA BAGS customer styling a classic leather tote bag outdoors" },
              { src: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop", alt: "Model carrying a chic minimalist sling bag outdoors" },
              { src: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop", alt: "Fashion blogger featuring a cotton canvas everyday tote bag" },
              { src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop", alt: "Model posing with a beige leather shoulder handbag" },
            ].map((item, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden bg-neutral-100 border border-neutral-200">
                <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-7 w-7 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center space-y-5">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold">Join The Inner Circle</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900">Subscribe To DELA BAGS</h2>
          <p className="text-neutral-500 text-xs max-w-md mx-auto leading-relaxed">
            Receive exclusive early access to new collection drops, private sales, and minimalist style guides.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3.5 bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-black text-xs rounded-none"
              required
            />
            <Button type="submit" className="bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-8 font-bold text-xs uppercase tracking-[0.2em]">
              SUBSCRIBE
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
