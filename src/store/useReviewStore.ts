import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CustomerReview {
  id: string;
  productId?: string;
  productName: string;
  author: string;
  location?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  likes: number;
  image?: string;
}

interface ReviewStore {
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date' | 'verified' | 'likes'>) => void;
  likeReview: (id: string) => void;
  getReviewsForProduct: (productId?: string) => CustomerReview[];
  getAverageRating: (productId?: string) => { avg: number; count: number };
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: [], // 100% clean & authentic — no fake/dummy reviews!

      addReview: (newReviewData) => {
        const newReview: CustomerReview = {
          ...newReviewData,
          id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          date: 'Just now',
          verified: true,
          likes: 0,
        };
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },

      likeReview: (id) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === id ? { ...r, likes: r.likes + 1 } : r
          ),
        }));
      },

      getReviewsForProduct: (productId) => {
        const all = get().reviews;
        if (!productId) return all;
        return all.filter((r) => r.productId === productId);
      },

      getAverageRating: (productId) => {
        const list = get().getReviewsForProduct(productId);
        if (list.length === 0) return { avg: 0, count: 0 };
        const sum = list.reduce((acc, r) => acc + r.rating, 0);
        return {
          avg: Number((sum / list.length).toFixed(1)),
          count: list.length,
        };
      },
    }),
    {
      name: 'DELA-reviews-storage',
    }
  )
);
