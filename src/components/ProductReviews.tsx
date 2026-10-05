'use client';

import { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  likes: number;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Ananya Sharma',
    rating: 5,
    date: '2 days ago',
    title: 'Absolute Luxury! Superb quality leather.',
    comment: 'The stitching, finish, and metal zippers are top notch. Received so many compliments at work!',
    verified: true,
    likes: 14,
  },
  {
    id: '2',
    author: 'Priya Verma',
    rating: 5,
    date: '1 week ago',
    title: 'Fast delivery & gorgeous packaging',
    comment: 'Ordered this for a wedding. The bag exceeded my expectations. Spacious enough for phone, wallet & makeup.',
    verified: true,
    likes: 9,
  },
  {
    id: '3',
    author: 'Rohan Mehta',
    rating: 4,
    date: '2 weeks ago',
    title: 'Great laptop bag for daily office commute',
    comment: 'Fits my 15-inch laptop perfectly with soft padding inside. Very comfortable shoulder straps.',
    verified: true,
    likes: 6,
  },
];

export function ProductReviews({ productName }: { productName: string }) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, title: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment || !newReview.title) return;

    const created: Review = {
      id: Date.now().toString(),
      author: newReview.author,
      rating: Number(newReview.rating),
      date: 'Just now',
      title: newReview.title,
      comment: newReview.comment,
      verified: true,
      likes: 0,
    };

    setReviews([created, ...reviews]);
    setSubmitted(true);
    setShowForm(false);
    setNewReview({ author: '', rating: 5, title: '', comment: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  return (
    <div className="mt-16 border-t pt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Customer Reviews</h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(Number(avgRating))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-lg">{avgRating} out of 5</span>
            <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white hover:bg-neutral-800 rounded-none h-11 text-sm font-semibold flex items-center gap-2"
        >
          <MessageSquarePlus className="h-4 w-4" /> WRITE A REVIEW
        </Button>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 mb-6 text-sm font-medium">
          Thank you! Your review for &quot;{productName}&quot; has been published successfully.
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-neutral-50 p-6 border mb-8 space-y-4">
          <h3 className="font-bold text-lg">Write a Review for {productName}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs">Your Name</Label>
              <Input
                required
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="bg-white rounded-none"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Rating</Label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                className="w-full h-10 bg-white border px-3 text-sm rounded-none"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value={3}>⭐⭐⭐ (3 - Good)</option>
                <option value={2}>⭐⭐ (2 - Average)</option>
                <option value={1}>⭐ (1 - Poor)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Review Title</Label>
            <Input
              required
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              placeholder="Headline for your review"
              className="bg-white rounded-none"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Your Review</Label>
            <textarea
              required
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Tell us about the quality, style, space, and overall experience..."
              className="w-full bg-white border p-3 text-sm focus:outline-none rounded-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-none">
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white rounded-none">
              Submit Review
            </Button>
          </div>
        </form>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((r) => (
          <div key={r.id} className="border-b pb-6 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{r.author}</span>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 font-medium">
                      <CheckCircle2 className="h-3 w-3" /> Verified Buyer
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
              <span className="text-xs text-muted-foreground">{r.date}</span>
            </div>

            <p className="font-semibold text-sm">{r.title}</p>
            <p className="text-sm text-neutral-600">{r.comment}</p>

            <div className="flex items-center gap-4 pt-1">
              <button
                onClick={() => handleLike(r.id)}
                className="text-xs text-muted-foreground hover:text-black flex items-center gap-1.5 transition-colors"
              >
                <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({r.likes})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
