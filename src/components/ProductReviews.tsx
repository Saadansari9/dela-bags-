'use client';

import { useState, useEffect } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useReviewStore } from '@/store/useReviewStore';

export function ProductReviews({ productId, productName }: { productId?: string; productName: string }) {
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, title: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const { reviews, addReview, likeReview } = useReviewStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const productReviews = mounted
    ? productId
      ? reviews.filter((r) => r.productId === productId)
      : reviews
    : [];

  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
    : '0.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment || !newReview.title) return;

    addReview({
      productId,
      productName,
      author: newReview.author,
      rating: Number(newReview.rating),
      title: newReview.title,
      comment: newReview.comment,
    });

    setSubmitted(true);
    setShowForm(false);
    setNewReview({ author: '', rating: 5, title: '', comment: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (!mounted) {
    return <div className="mt-12 text-center text-xs text-neutral-400">Loading reviews...</div>;
  }

  return (
    <div className="mt-16 border-t border-neutral-200 pt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold uppercase text-black">Customer Reviews</h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    productReviews.length > 0 && star <= Math.round(Number(avgRating))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            {productReviews.length > 0 ? (
              <>
                <span className="font-bold text-base">{avgRating} out of 5</span>
                <span className="text-xs text-neutral-500">({productReviews.length} verified review{productReviews.length > 1 ? 's' : ''})</span>
              </>
            ) : (
              <span className="text-xs text-neutral-500 font-medium">No reviews submitted yet</span>
            )}
          </div>
        </div>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white hover:bg-neutral-800 rounded-none h-11 px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <MessageSquarePlus className="h-4 w-4" /> WRITE THE FIRST REVIEW
        </Button>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 mb-6 text-xs font-medium">
          Thank you! Your authentic review for &quot;{productName}&quot; has been published successfully.
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#FAF9F6] p-6 border border-neutral-300 mb-8 space-y-4 animate-in fade-in duration-300">
          <h3 className="font-heading font-bold text-base uppercase text-black">Write an Authentic Review for {productName}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs uppercase font-bold text-neutral-600">Your Full Name</Label>
              <Input
                required
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                placeholder="e.g. Ananya Sharma"
                className="bg-white rounded-none border-neutral-300 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase font-bold text-neutral-600">Rating</Label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                className="w-full h-10 bg-white border border-neutral-300 px-3 text-xs rounded-none"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent Quality)</option>
                <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value={3}>⭐⭐⭐ (3 - Good)</option>
                <option value={2}>⭐⭐ (2 - Average)</option>
                <option value={1}>⭐ (1 - Needs Improvement)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs uppercase font-bold text-neutral-600">Review Headline</Label>
            <Input
              required
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              placeholder="e.g. Stunning leather finish & fast delivery!"
              className="bg-white rounded-none border-neutral-300 text-xs"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs uppercase font-bold text-neutral-600">Your Review Experience</Label>
            <textarea
              required
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Tell us about the leather texture, stitching, space, and overall packaging..."
              className="w-full bg-white border border-neutral-300 p-3 text-xs focus:outline-none rounded-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-none text-xs uppercase font-bold">
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-neutral-800 rounded-none text-xs font-bold uppercase tracking-wider">
              Submit Genuine Review
            </Button>
          </div>
        </form>
      )}

      {/* Review List or Authentic Empty State */}
      {productReviews.length === 0 ? (
        <div className="bg-[#FAF9F6] border border-neutral-200 p-8 text-center space-y-3">
          <Sparkles className="h-8 w-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-heading font-bold text-base uppercase text-black">No Reviews Yet</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Be the first customer to write an authentic review for <strong>{productName}</strong> after receiving your order.
          </p>
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            className="rounded-none border-black text-xs font-bold uppercase tracking-wider h-10 px-6 mt-2"
          >
            Write First Review
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {productReviews.map((r) => (
            <div key={r.id} className="border-b border-neutral-200 pb-6 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-black">{r.author}</span>
                    {r.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-green-800 bg-green-50 px-2 py-0.5 font-bold uppercase border border-green-200">
                        <CheckCircle2 className="h-3 w-3 text-green-600" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex text-amber-400 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          star <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-neutral-400 font-mono">{r.date}</span>
              </div>

              <p className="font-bold text-sm text-black">{r.title}</p>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">{r.comment}</p>

              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={() => likeReview(r.id)}
                  className="text-xs text-neutral-500 hover:text-black flex items-center gap-1.5 transition-colors font-semibold"
                >
                  <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({r.likes})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
