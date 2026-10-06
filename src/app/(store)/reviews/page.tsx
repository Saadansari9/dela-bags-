'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, CheckCircle2, ThumbsUp, MessageSquare, Camera, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const REVIEWS_DATA = [
  {
    id: 1,
    author: 'Ananya Sharma',
    location: 'Mumbai, MH',
    rating: 5,
    date: '2 days ago',
    title: 'Absolute perfection! The leather quality blew me away.',
    content: 'Ordered the Classic Leather Tote for work. The Gold Monogram embossing looks like a luxury European fashion house! Fits my 13 inch MacBook, water bottle and makeup pouch easily.',
    productName: 'Classic Leather Tote',
    verified: true,
    likes: 24,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    author: 'Priya Malhotra',
    location: 'New Delhi, DL',
    rating: 5,
    date: '1 week ago',
    title: 'The gold chain & stitching quality is top tier.',
    content: 'I was hesitant to order online, but the packaging arrived in a luxury hard-box with dustbag. Feels so premium! Received non-stop compliments at a dinner party.',
    productName: 'Chic Chain Shoulder Bag',
    verified: true,
    likes: 18,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    author: 'Rhea Sen',
    location: 'Bengaluru, KA',
    rating: 5,
    date: '2 weeks ago',
    title: 'Best luxury bag under ₹5,000 hands down!',
    content: 'Super versatile sling bag. The zip hardware is buttery smooth and the custom initials add such a personal touch. Will definitely buy another color!',
    productName: 'Minimalist Leather Crossbody',
    verified: true,
    likes: 15,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(REVIEWS_DATA);
  const [filter, setFilter] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', title: '', content: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleLike = (id: number) => {
    setReviews((list) =>
      list.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.content) return;

    setReviews([
      {
        id: Date.now(),
        author: newReview.author,
        location: 'Verified Buyer',
        rating: newReview.rating,
        date: 'Just now',
        title: newReview.title,
        content: newReview.content,
        productName: 'DELA Leather Collection',
        verified: true,
        likes: 1,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      },
      ...reviews,
    ]);
    setSubmitted(true);
    setShowForm(false);
    setNewReview({ author: '', title: '', content: '', rating: 5 });
  };

  const filteredReviews = filter ? reviews.filter((r) => r.rating === filter) : reviews;

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-neutral-900 text-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> DELA Society & Customer Reviews
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-black uppercase tracking-tight">
            Real Reviews From Verified Buyers
          </h1>
          <p className="text-neutral-600 text-sm max-w-lg mx-auto">
            Discover why over 10,000+ fashion enthusiasts trust DELA for handcrafted luxury handbags.
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="bg-white border border-neutral-300 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:border-r border-neutral-200 space-y-1">
            <span className="font-mono text-5xl font-black text-black">4.9</span>
            <div className="flex justify-center text-amber-500 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
              Based on 1,420+ Verified Reviews
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-neutral-600">
            {[
              { stars: 5, pct: '94%' },
              { stars: 4, pct: '5%' },
              { stars: 3, pct: '1%' },
            ].map((s) => (
              <div key={s.stars} className="flex items-center gap-2">
                <span className="w-12 font-bold flex items-center">{s.stars} <Star className="h-3 w-3 fill-amber-500 text-amber-500 ml-0.5" /></span>
                <div className="flex-1 h-2 bg-neutral-100 overflow-hidden border border-neutral-200">
                  <div className="h-full bg-black" style={{ width: s.pct }} />
                </div>
                <span className="w-8 text-right font-mono font-bold">{s.pct}</span>
              </div>
            ))}
          </div>

          <div className="text-center md:border-l border-neutral-200 pl-4 space-y-3">
            <p className="text-xs text-neutral-600 font-medium">Loved your DELA Bag? Share your experience with our atelier team.</p>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-black text-white hover:bg-neutral-800 rounded-none h-11 px-6 text-xs font-bold uppercase tracking-wider w-full sm:w-auto"
            >
              <MessageSquare className="h-4 w-4 mr-2" /> Write a Review
            </Button>
          </div>
        </div>

        {/* Submit Review Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-6 space-y-4 animate-in fade-in duration-300">
            <h3 className="font-heading font-bold text-lg uppercase text-black">Submit Your Review</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1 block">Your Full Name</label>
                <Input
                  required
                  placeholder="e.g. Simran Kaur"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="rounded-none border-neutral-300 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1 block">Rating (1 to 5 Stars)</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full h-10 border border-neutral-300 px-3 text-xs bg-white rounded-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 Great)</option>
                  <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1 block">Review Headline</label>
              <Input
                required
                placeholder="e.g. Stunning craftsmanship and super fast delivery!"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                className="rounded-none border-neutral-300 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1 block">Review Details</label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about the leather quality, fitting, and packaging..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                className="w-full border border-neutral-300 p-3 text-xs bg-white rounded-none focus:outline-none focus:border-black"
              />
            </div>

            <Button type="submit" className="bg-black text-white rounded-none h-11 px-8 text-xs font-bold uppercase tracking-wider">
              Post Verified Review
            </Button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white border border-neutral-300 p-6 flex flex-col sm:flex-row gap-6 items-start">
              {/* Image if available */}
              {r.image && (
                <div className="relative h-32 w-28 bg-neutral-100 shrink-0 border border-neutral-200 overflow-hidden">
                  <Image src={r.image} alt={r.productName} fill className="object-cover" />
                </div>
              )}

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <div className="flex text-amber-500 mb-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <h3 className="font-heading font-bold text-base text-black">{r.title}</h3>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">{r.date}</span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed font-light">{r.content}</p>

                <div className="flex flex-wrap items-center justify-between text-[11px] pt-3 border-t border-neutral-100 text-neutral-500">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-black">{r.author}</span>
                    <span>• {r.location}</span>
                    {r.verified && (
                      <span className="text-green-700 font-bold flex items-center gap-1 bg-green-50 px-2 py-0.5 border border-green-200 text-[10px]">
                        <CheckCircle2 className="h-3 w-3" /> Verified Purchase
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleLike(r.id)}
                    className="flex items-center gap-1.5 hover:text-black font-semibold text-neutral-600 bg-neutral-50 px-2.5 py-1 border border-neutral-200"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({r.likes})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
