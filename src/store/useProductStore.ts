import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/data/products';

interface ProductStore {
  deletedIds: string[];
  customProducts: Product[];
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  getFilteredProducts: (baseProducts: Product[]) => Product[];
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      deletedIds: [],
      customProducts: [],

      deleteProduct: (id: string) =>
        set((state) => ({
          deletedIds: state.deletedIds.includes(id) ? state.deletedIds : [...state.deletedIds, id],
          customProducts: state.customProducts.filter((p) => p.id !== id),
        })),

      addProduct: (product: Product) =>
        set((state) => ({
          customProducts: [product, ...state.customProducts.filter((p) => p.id !== product.id)],
        })),

      getFilteredProducts: (baseProducts: Product[]) => {
        const { deletedIds, customProducts } = get();
        // Merge custom products at the top of base catalog
        const combined = [...customProducts, ...baseProducts];
        // Filter unique by ID
        const map = new Map<string, Product>();
        combined.forEach((item) => {
          if (!map.has(item.id)) {
            map.set(item.id, item);
          }
        });
        const unique = Array.from(map.values());
        // Return products excluding deleted ones
        return unique.filter((p) => !deletedIds.includes(p.id));
      },
    }),
    {
      name: 'DELA-product-store',
    }
  )
);
