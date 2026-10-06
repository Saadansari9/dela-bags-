'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, CheckCircle2, ThumbsUp, MessageSquare, Camera, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useReviewStore, CustomerReview } from '@/store/useReviewStore';

export default function ReviewsPage() {
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', title: '', content: '', rating: 5, productName: '' });
  const [submitted, setSubmitted] = useState(false);

  const { reviews, addReview, likeReview } = useReviewStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalReviews = mounted ? reviews.length : 0;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.content) return;

    addReview({
      author: newReview.author,
      title: newReview.title,
      comment: newReview.content,
      rating: newReview.rating,
      productName: newReview.productName || 'DELA Handbag Collection',
    });

    setSubmitted(true);
    setShowForm(false);
    setNewReview({ author: '', title: '', content: '', rating: 5, productName: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-neutral-900 text-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> DELA Customer Reviews Wall
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-black uppercase tracking-tight">
            Authentic Customer Feedback & Reviews
          </h1>
          <p className="text-neutral-600 text-sm max-w-lg mx-auto font-light">
            Read real feedback and experiences submitted directly by verified DELA BAGS customers across India.
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="bg-white border border-neutral-300 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:border-r border-neutral-200 space-y-1">
            <span className="font-mono text-5xl font-black text-black">
              {totalReviews > 0 ? avgRating : '0.0'}
            </span>
            <div className="flex justify-center text-amber-500 my-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    totalReviews > 0 && star <= Math.round(Number(avgRating))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
              {totalReviews > 0 ? `Based on ${totalReviews} Authentic Review${totalReviews > 1 ? 's' : ''}` : 'No reviews submitted yet'}
            </p>
          </div>

          <div className="space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-700" />
              <span className="font-bold text-black uppercase">100% Genuine Customer Submissions</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              We do not post fake or inflated reviews. Every review shown here is submitted by real buyers.
            </p>
          </div>

          <div className="text-center md:border-l border-neutral-200 pl-4 space-y-3">
            <p className="text-xs text-neutral-600 font-medium">Purchased a DELA Bag? Share your authentic experience.</p>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-black text-white hover:bg-neutral-800 rounded-none h-11 px-6 text-xs font-bold uppercase tracking-wider w-full sm:w-auto"
            >
              <MessageSquare className="h-4 w-4 mr-2" /> Write a Review
            </Button>
          </div>
        </div>

        {submitted && (
          <div className="bg-green-50 border border-green-300 text-green-800 p-4 text-xs font-bold text-center">
            ✓ Thank you! Your authentic review has been published on the DELA Customer Wall.
          </div>
        )}

        {/* Submit Review Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-6 space-y-4 animate-in fade-in duration-300">
            <h3 className="font-heading font-bold text-lg uppercase text-black">Submit Your Authentic Review</h3>

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
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent Quality)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3/5 Good)</option>
                  <option value={2}>⭐⭐ (2/5 Average)</option>
                  <option value={1}>⭐ (1/5 Poor)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1 block">Product Purchased (Optional)</label>
              <Input
                placeholder="e.g. Classic Leather Tote / Minimal Shoulder Bag"
                value={newReview.productName}
                onChange={(e) => setNewReview({ ...newReview, productName: e.target.value })}
                className="rounded-none border-neutral-300 text-xs"
              />
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
                placeholder="Tell us about the leather texture, stitching quality, space, and overall experience..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                className="w-full border border-neutral-300 p-3 text-xs bg-white rounded-none focus:outline-none focus:border-black"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-none text-xs uppercase font-bold">
                Cancel
              </Button>
              <Button type="submit" className="bg-black text-white rounded-none h-11 px-8 text-xs font-bold uppercase tracking-wider">
                Post Authentic Review
              </Button>
            </div>
          </form>
        )}

        {/* Reviews List or Authentic Empty State */}
        {!mounted || reviews.length === 0 ? (
          <div className="bg-white border border-neutral-300 p-12 text-center space-y-4">
            <div className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-bold text-xl uppercase text-black">No Customer Reviews Yet</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              We operate with 100% transparency. Be the very first customer to submit an authentic review for DELA BAGS!
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-black text-white hover:bg-neutral-800 rounded-none h-11 px-8 text-xs font-bold uppercase tracking-wider"
            >
              Write First Review
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white border border-neutral-300 p-6 flex flex-col sm:flex-row gap-6 items-start">
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

                  <p className="text-xs text-neutral-700 leading-relaxed font-light">{r.comment}</p>

                  <div className="flex flex-wrap items-center justify-between text-[11px] pt-3 border-t border-neutral-100 text-neutral-500">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-black">{r.author}</span>
                      {r.productName && <span>• Product: <strong>{r.productName}</strong></span>}
                      {r.verified && (
                        <span className="text-green-700 font-bold flex items-center gap-1 bg-green-50 px-2 py-0.5 border border-green-200 text-[10px]">
                          <CheckCircle2 className="h-3 w-3" /> Verified Customer
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => likeReview(r.id)}
                      className="flex items-center gap-1.5 hover:text-black font-semibold text-neutral-600 bg-neutral-50 px-2.5 py-1 border border-neutral-200"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({r.likes})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
