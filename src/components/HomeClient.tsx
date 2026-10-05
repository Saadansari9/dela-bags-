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
import type { Product } from "@/lib/data/products";

const HERO_SLIDES = [
  {
    title: "Carry Your ",
    highlight: "Style.",
    subtitle: "Discover timeless handbags crafted with precision, premium vegan leather, and modern Indian craftsmanship.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2070&auto=format&fit=crop",
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
    badge: "⚡ Trending Slings & Totes",
    primaryCta: "SHOP SLING BAGS",
    primaryLink: "/shop?category=sling-bags",
    secondaryCta: "SHOP TOTES",
    secondaryLink: "/shop?category=tote-bags",
  },
];

const CATEGORIES = [
  { name: "Handbags", slug: "ladies-handbags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop" },
  { name: "Sling Bags", slug: "sling-bags", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop" },
  { name: "Tote Bags", slug: "tote-bags", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop" },
  { name: "Shoulder Bags", slug: "shoulder-bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop" },
  { name: "Men's Bags", slug: "mens-bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop" },
  { name: "Travel Bags", slug: "travel-bags", image: "https://images.unsplash.com/photo-1553531384-411a4ff74811?q=80&w=1000&auto=format&fit=crop" },
];

const REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality of the Classic Leather Handbag exceeded my expectations! The stitching is flawless and it holds all my work essentials easily.",
    date: "Verified Buyer",
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    rating: 5,
    text: "Ordered the Men's Crossbody Bag. Extremely durable nylon and leather accents. Fast shipping via WhatsApp support too!",
    date: "Verified Buyer",
  },
  {
    name: "Ananya Patel",
    location: "Bangalore",
    rating: 5,
    text: "The Everyday Tote is my new favorite work bag. Lightweight, spacious, and super classy. Getting compliments daily!",
    date: "Verified Buyer",
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
  const { addItem } = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="flex flex-col w-full bg-stone-950 text-stone-100 selection:bg-amber-400 selection:text-stone-950">
      {/* 1. INTERACTIVE HERO SLIDER */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-stone-950 overflow-hidden border-b border-stone-800">
        {/* Slide Image Backgrounds */}
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-60 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover transition-transform duration-7000 ease-out"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-95" />
          </div>
        ))}

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <div className="max-w-2xl space-y-6">
            {/* Gold Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              {slide.title}
              <span className="italic font-serif font-normal text-amber-300">{slide.highlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={slide.primaryLink}>
                <Button size="lg" className="bg-amber-400 text-stone-950 hover:bg-amber-300 rounded-none px-8 h-13 font-bold tracking-[0.15em] uppercase text-xs shadow-lg transition-transform hover:-translate-y-0.5">
                  {slide.primaryCta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={slide.secondaryLink}>
                <Button size="lg" className="bg-stone-900/80 backdrop-blur-md text-white border border-stone-700 hover:border-amber-400 hover:text-amber-300 rounded-none px-8 h-13 font-bold tracking-[0.15em] uppercase text-xs transition-all">
                  {slide.secondaryCta}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 z-20 p-3 rounded-full bg-stone-900/70 hover:bg-amber-400 hover:text-stone-950 text-white backdrop-blur-sm transition-all hidden sm:block border border-stone-800"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 z-20 p-3 rounded-full bg-stone-900/70 hover:bg-amber-400 hover:text-stone-950 text-white backdrop-blur-sm transition-all hidden sm:block border border-stone-800"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 transition-all rounded-full ${
                i === currentSlide ? "w-8 bg-amber-400" : "w-2 bg-stone-700 hover:bg-stone-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Floating Bottom Stats Strip */}
        <div className="absolute bottom-0 inset-x-0 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 text-stone-300 text-xs py-3.5 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center tracking-[0.15em] uppercase font-medium">
            <div className="flex items-center gap-2"><Award className="h-4 w-4 text-amber-400" /> Premium Vegan Leather</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-amber-400" /> Free Express Shipping India</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-400" /> Encrypted Razorpay Checkout</div>
            <div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-amber-400" /> 7-Day Hassle-Free Returns</div>
          </div>
        </div>
      </section>

      {/* 2. DUAL SPLIT FEATURED BANNERS (SHOP BY GENDER) */}
      <section className="py-12 bg-stone-950 border-b border-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Women's Banner */}
            <Link href="/shop?category=ladies-handbags" className="group relative aspect-[16/9] sm:aspect-[21/9] rounded-none overflow-hidden bg-stone-900 border border-stone-800 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop"
                alt="Women's Bags Collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">Elegance & Style</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">Women's Collection</h3>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                  SHOP HANDBAGS & SLINGS <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
                </span>
              </div>
            </Link>

            {/* Men's Banner */}
            <Link href="/shop?category=mens-bags" className="group relative aspect-[16/9] sm:aspect-[21/9] rounded-none overflow-hidden bg-stone-900 border border-stone-800 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
                alt="Men's Bags Collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">Rugged & Refined</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">Men's Collection</h3>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                  SHOP WORK & TRAVEL BAGS <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES GRID */}
      <section className="py-16 bg-stone-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">Explore Collections</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">Shop By Category</h2>
            <div className="h-0.5 w-12 bg-amber-400 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CATEGORIES.map((category) => (
              <Link href={`/shop?category=${category.slug}`} key={category.name} className="group flex flex-col items-center text-center">
                <div className="relative w-full aspect-[4/5] overflow-hidden mb-3 bg-stone-900 border border-stone-800 shadow-md transition-all duration-500 group-hover:border-amber-400/60 group-hover:-translate-y-1">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <span className="absolute bottom-3 left-0 right-0 text-xs font-semibold text-stone-200 group-hover:text-amber-300 uppercase tracking-wider">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS PRODUCT GRID */}
      <section className="py-20 bg-stone-950 border-t border-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">Customer Favorites</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">Best Selling Bags</h2>
              <div className="h-0.5 w-12 bg-amber-400 mt-3" />
            </div>
            <Link href="/shop?sort=bestselling" className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-[0.15em]">
              Explore All Bestsellers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.slice(0, 4).map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              const isWishlisted = mounted && wishlist.hasItem(product.id);

              return (
                <div key={product.id} className="group flex flex-col border border-stone-800 bg-stone-900 rounded-none overflow-hidden shadow-lg hover:border-amber-400/50 transition-all duration-500">
                  <div className="relative aspect-[4/5] bg-stone-950 overflow-hidden">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                    </Link>

                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none">
                        SAVE {discount}%
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-amber-400 text-stone-950 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none">
                      BESTSELLER
                    </div>

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
                        className="w-full bg-amber-400 text-stone-950 hover:bg-amber-300 rounded-none text-xs font-bold py-2.5 tracking-wider uppercase shadow-xl"
                      >
                        <ShoppingBag className="mr-2 h-3.5 w-3.5" /> QUICK ADD TO CART
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow bg-stone-900">
                    <p className="text-[10px] text-amber-400 uppercase font-semibold tracking-[0.2em] mb-1">{product.category}</p>
                    <Link href={`/product/${product.slug}`} className="font-medium text-sm sm:text-base text-white line-clamp-1 hover:text-amber-300 transition-colors">
                      {product.name}
                    </Link>

                    <div className="flex items-center gap-1 my-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-stone-700"}`} />
                      ))}
                      <span className="text-xs text-stone-400 ml-1">({product.reviews})</span>
                    </div>

                    <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-stone-800">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-base sm:text-lg text-amber-300">₹{product.price.toLocaleString("en-IN")}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-500 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          isWishlisted ? wishlist.removeItem(product.id) : wishlist.addItem({ productId: product.id, name: product.name, slug: product.slug, price: product.price, image: product.images[0] })
                        }
                        className="p-1.5 text-stone-400 hover:text-red-400 transition-colors"
                        title="Add to Wishlist"
                      >
                        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="py-20 bg-stone-950 border-t border-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">Testimonials</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">Loved By Our Customers</h2>
            <div className="h-0.5 w-12 bg-amber-400 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="bg-stone-900 p-6 rounded-none border border-stone-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {Array(rev.rating).fill(0).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-300 text-xs italic leading-relaxed">"{rev.text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-stone-800">
                  <div className="h-8 w-8 bg-amber-400 text-stone-950 font-bold text-xs rounded-full flex items-center justify-center shrink-0">
                    {rev.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-white">{rev.name}</p>
                    <p className="text-[10px] text-stone-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-amber-400" /> {rev.date} • {rev.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM STYLE GALLERY */}
      <section className="py-20 bg-stone-950 border-t border-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              <Camera className="h-4 w-4" /> Follow Us @delabags
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">#DelaStyle Community</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden bg-stone-900 border border-stone-800">
                <Image src={src} alt={`DELA Style ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-8 w-8 text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="py-20 bg-stone-950 text-white border-t border-stone-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">Join The Inner Circle</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">Subscribe To DELA BAGS</h2>
          <p className="text-stone-400 text-xs max-w-md mx-auto leading-relaxed">
            Receive exclusive early access to new collection drops, private sales, and style guides.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3.5 bg-stone-900 border border-stone-800 text-white placeholder:text-stone-500 outline-none focus:border-amber-400 text-xs rounded-none"
              required
            />
            <Button type="submit" className="bg-amber-400 text-stone-950 hover:bg-amber-300 rounded-none h-12 px-8 font-bold text-xs uppercase tracking-wider">
              SUBSCRIBE
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
