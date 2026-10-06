import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
  monogram?: {
    text: string;
    style: string;
  };
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSubtotal?: number;
}

const VALID_COUPONS: Coupon[] = [
  { code: 'DELA10', discountPercent: 10 },
  { code: 'WELCOME200', discountAmount: 200 },
  { code: 'FESTIVE15', discountPercent: 15 },
  { code: 'LUXURY20', discountPercent: 20, minSubtotal: 3000 },
];

interface CartStore {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getCartTotal: () => number;
  getDiscountTotal: () => number;
  getGrandTotal: () => number;
  getCartCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (item) => {
        const id = `${item.productId}-${item.color || ''}-${item.size || ''}-${item.monogram ? item.monogram.text + '_' + item.monogram.style : ''}`;
        set((state) => {
          const existingItem = state.items.find((i) => i.id === id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, id }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (code: string) => {
        const trimmedCode = code.trim().toUpperCase();
        const found = VALID_COUPONS.find((c) => c.code === trimmedCode);
        if (!found) {
          return { success: false, message: 'Invalid coupon code. Try DELA10 or WELCOME200' };
        }
        const subtotal = get().getCartTotal();
        if (found.minSubtotal && subtotal < found.minSubtotal) {
          return {
            success: false,
            message: `Coupon ${found.code} is valid on orders above ₹${found.minSubtotal}`,
          };
        }
        set({ coupon: found });
        return { success: true, message: `Coupon ${found.code} applied successfully!` };
      },

      removeCoupon: () => set({ coupon: null }),

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDiscountTotal: () => {
        const { coupon } = get();
        const subtotal = get().getCartTotal();
        if (!coupon || subtotal === 0) return 0;

        if (coupon.discountPercent) {
          return Math.round((subtotal * coupon.discountPercent) / 100);
        }
        if (coupon.discountAmount) {
          return Math.min(coupon.discountAmount, subtotal);
        }
        return 0;
      },

      getGrandTotal: () => {
        const subtotal = get().getCartTotal();
        const discount = get().getDiscountTotal();
        const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 99;
        return Math.max(0, subtotal - discount + shipping);
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'DELA-cart-storage',
    }
  )
);
