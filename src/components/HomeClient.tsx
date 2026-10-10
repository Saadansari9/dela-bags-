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
    title: "Carry Your ",
    highlight: "Style.",
    subtitle: "Discover timeless handbags crafted with precision, premium vegan leather, and modern Indian craftsmanship.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2070&auto=format&fit=crop",
    alt: "Fashion model posing outdoors with a handcrafted tan leather shoulder bag",
    badge: "✨ Autumn / Winter 2026 Collection",
    primaryCta: "SHOP WOMEN",
    primaryLink: "/shop?category=ladies-handbags",
    secondaryCta: "SHOP MEN",
    secondaryLink: "/shop?category=mens-bags",
  },
  {
    title: "Crafted For ",
    highlight: "Executives.",
    subtitle: "Explore rugged crossbody bags, leather laptop sleeves, and spacious travel duffels for modern men.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2070&auto=format&fit=crop",
    alt: "Executive male model carrying a brown leather crossbody laptop bag",
    badge: "🔥 Men's Luxury Edition",
    primaryCta: "SHOP MEN'S BAGS",
    primaryLink: "/shop?category=mens-bags",
    secondaryCta: "EXPLORE DUFFELS",
    secondaryLink: "/shop?category=travel-bags",
  },
  {
    title: "Lightweight & ",
    highlight: "Chic.",
    subtitle: "Everyday sling bags and minimalist shoulder totes designed to keep your essentials organized in style.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2070&auto=format&fit=crop",
    alt: "Model wearing a minimalist beige leather sling bag",
    badge: "⚡ Trending Slings & Totes",
    primaryCta: "SHOP SLING BAGS",
    primaryLink: "/shop?category=sling-bags",
    secondaryCta: "SHOP TOTES",
    secondaryLink: "/shop?category=tote-bags",
  },
];

const CATEGORIES = [
  { name: "Handbags", slug: "ladies-handbags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop", alt: "Classic brown vegan leather handbag on display" },
  { name: "Sling Bags", slug: "sling-bags", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop", alt: "Model wearing a minimalist tan leather sling bag with adjustable strap" },
  { name: "Tote Bags", slug: "tote-bags", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop", alt: "Woman carrying a spacious cotton canvas everyday tote bag" },
  { name: "Shoulder Bags", slug: "shoulder-bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop", alt: "Beige leather shoulder bag held by a fashion model" },
  { name: "Men's Bags", slug: "mens-bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop", alt: "Male model carrying a rugged black ballistic nylon crossbody bag" },
  { name: "Travel Bags", slug: "travel-bags", image: "https://images.unsplash.com/photo-1553531384-411a4ff74811?q=80&w=1000&auto=format&fit=crop", alt: "Executive leather travel duffel bag with shoe compartment" },
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
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const productStore = useProductStore();

  const activeBestsellers = productStore.getFilteredProducts(bestsellers);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="flex flex-col w-full bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* 1. INTERACTIVE HERO SLIDER */}
      <section className="relative w-full min-h-[80vh] flex items-center bg-stone-900 overflow-hidden">
        {/* Slide Image Backgrounds */}
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-75 scale-102" : "opacity-0 scale-100"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover transition-transform duration-7000 ease-out"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
        ))}

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <div className="max-w-xl space-y-6">
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[11px] font-semibold tracking-[0.25em] uppercase border border-white/20">
              <Sparkles className="h-3 w-3 text-white" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white">
              {slide.title}
              <span className="italic font-serif font-normal text-stone-200">{slide.highlight}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-200 font-light leading-relaxed max-w-md">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href={slide.primaryLink}>
                <Button size="lg" className="bg-white text-black hover:bg-stone-200 rounded-none px-8 h-12 font-bold tracking-[0.2em] uppercase text-xs shadow-none">
                  {slide.primaryCta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href={slide.secondaryLink}>
                <Button size="lg" className="bg-transparent text-white border border-white/70 hover:bg-white hover:text-black rounded-none px-8 h-12 font-bold tracking-[0.2em] uppercase text-xs transition-all">
                  {slide.secondaryCta}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 z-20 p-2.5 rounded-full bg-black/30 hover:bg-black text-white backdrop-blur-sm transition-all hidden sm:block border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 z-20 p-2.5 rounded-full bg-black/30 hover:bg-black text-white backdrop-blur-sm transition-all hidden sm:block border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all rounded-full ${
                i === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Floating Bottom Stats Strip */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 text-neutral-800 text-xs py-3 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center tracking-[0.18em] uppercase font-semibold text-[11px]">
            <div className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-black" /> Premium Vegan Leather</div>
            <div className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-black" /> Free Shipping India</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-black" /> Encrypted Razorpay Checkout</div>
            <div className="flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5 text-black" /> 7-Day Easy Returns</div>
          </div>
        </div>
      </section>

      {/* 2. DUAL SPLIT FEATURED BANNERS (SHOP BY GENDER) */}
      <section className="py-12 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Women's Banner */}
            <Link href="/shop?category=ladies-handbags" className="group relative aspect-[16/9] sm:aspect-[21/9] rounded-none overflow-hidden bg-neutral-900 shadow-sm border border-neutral-200">
              <Image
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop"
                alt="Women's Bags Collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-stone-300 text-[10px] font-semibold uppercase tracking-[0.25em]">Elegance & Style</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-0.5">Women's Collection</h3>
                <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                  EXPLORE HANDBAGS <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>

            {/* Men's Banner */}
            <Link href="/shop?category=mens-bags" className="group relative aspect-[16/9] sm:aspect-[21/9] rounded-none overflow-hidden bg-neutral-900 shadow-sm border border-neutral-200">
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
                alt="Men's Bags Collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-stone-300 text-[10px] font-semibold uppercase tracking-[0.25em]">Rugged & Refined</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-0.5">Men's Collection</h3>
                <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                  EXPLORE WORK BAGS <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES GRID */}
      <section className="py-16 bg-white border-y border-neutral-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold">Collections</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">Shop By Category</h2>
            <div className="h-0.5 w-10 bg-neutral-900 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CATEGORIES.map((category) => (
              <Link href={`/shop?category=${category.slug}`} key={category.name} className="group flex flex-col items-center text-center">
                <div className="relative w-full aspect-[4/5] overflow-hidden mb-3 bg-neutral-100 border border-neutral-200/80 transition-all duration-500 group-hover:border-black group-hover:-translate-y-1">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <span className="absolute bottom-3 left-0 right-0 text-[11px] font-semibold text-white uppercase tracking-wider">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
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

      {/* 4. BEST SELLERS PRODUCT GRID */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold">Curated Essentials</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">Best Selling Bags</h2>
              <div className="h-0.5 w-10 bg-neutral-900 mt-3" />
            </div>
            <Link href="/shop?sort=bestselling" className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-bold text-neutral-900 hover:opacity-70 transition-opacity uppercase tracking-[0.2em]">
              Explore All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {activeBestsellers.slice(0, 4).map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              const isWishlisted = mounted && wishlist.hasItem(product.id);

              return (
                <div key={product.id} className="group flex flex-col border border-neutral-200/80 bg-white rounded-none overflow-hidden transition-all duration-300 hover:border-black">
                  <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>

                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none">
                        -{discount}%
                      </div>
                    )}

                    {/* Quick Add overlay button */}
                    <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:block">
                      <Button
                        onClick={() =>
                          addItem({
                            productId: product.id,
                            name: product.name,
                            slug: product.slug,
                            price: product.price,
                            image: product.images[0],
                            quantity: 1,
                          })
                        }
                        className="w-full bg-black text-white hover:bg-neutral-800 rounded-none text-xs font-bold py-2.5 tracking-[0.15em] uppercase"
                      >
                        <ShoppingBag className="mr-2 h-3.5 w-3.5" /> ADD TO CART
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow bg-white">
                    <p className="text-[10px] text-neutral-400 uppercase font-semibold tracking-[0.2em] mb-1">{product.category}</p>
                    <Link href={`/product/${product.slug}`} className="font-medium text-sm text-neutral-900 line-clamp-1 hover:underline underline-offset-4">
                      {product.name}
                    </Link>

                    <div className="flex items-center gap-1 my-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-neutral-900 fill-neutral-900" : "text-neutral-200"}`} />
                      ))}
                      <span className="text-[11px] text-neutral-400 ml-1">({product.reviews})</span>
                    </div>

                    <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-neutral-100">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-sm sm:text-base text-neutral-900">₹{product.price.toLocaleString("en-IN")}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          isWishlisted ? wishlist.removeItem(product.id) : wishlist.addItem({ productId: product.id, name: product.name, slug: product.slug, price: product.price, image: product.images[0] })
                        }
                        className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                        title="Add to Wishlist"
                      >
                        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-600 text-red-600" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. AUTHENTIC ATELIER COMMITMENT & CUSTOMER REVIEWS */}
      <section className="py-20 bg-white border-t border-neutral-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold">100% Genuine Quality</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">Why Choose DELA BAGS</h2>
            <div className="h-0.5 w-10 bg-neutral-900 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF9F6] p-6 rounded-none border border-neutral-200/80 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-2xl">✨</span>
                <h3 className="font-heading font-bold text-sm uppercase text-black">Master Atelier Craftsmanship</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  Handcrafted with reinforced stitching, gold-tone anti-tarnish zippers, and premium vegan leather.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-6 rounded-none border border-neutral-200/80 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-2xl">🚚</span>
                <h3 className="font-heading font-bold text-sm uppercase text-black">Fast Pan-India Delivery & COD</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  Express shipping across 19,000+ pincodes in India with Cash on Delivery & instant UPI options.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-6 rounded-none border border-neutral-200/80 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-2xl">🛡️</span>
                <h3 className="font-heading font-bold text-sm uppercase text-black">7-Day Easy Returns Guarantee</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  No questions asked returns and exchanges if you aren&apos;t 100% satisfied with your handbag.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/reviews">
              <Button className="bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-8 text-xs font-bold uppercase tracking-wider">
                Visit Authentic Customer Reviews Wall <ArrowRight className="h-4 w-4 ml-2" />
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
