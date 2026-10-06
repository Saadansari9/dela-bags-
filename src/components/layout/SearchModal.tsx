'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { useProductStore } from '@/store/useProductStore';

export default function SearchModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const productStore = useProductStore();

  const activeProducts = useMemo(() => {
    return productStore.getFilteredProducts(PRODUCTS);
  }, [productStore]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return activeProducts.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      return matchName || matchCategory || matchBrand || matchDesc;
    });
  }, [query, activeProducts]);

  const popularSearches = [
    'Handbags',
    'Sling Bags',
    'Tote Bags',
    'Men\'s Bags',
    'Travel Duffel',
    'Laptop Sleeve',
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children ? (
          children
        ) : (
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-neutral-700 hover:text-black hover:bg-neutral-100">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden bg-white text-neutral-900 border-neutral-200 rounded-none shadow-2xl">
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center gap-3 bg-[#FAF9F6]">
          <Search className="h-5 w-5 text-neutral-500 shrink-0" />
          <Input
            type="text"
            placeholder="Search handbags, sling bags, totes, travel..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 text-base sm:text-lg bg-transparent px-0 text-black placeholder:text-neutral-400 font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-black p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search Content */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                <TrendingUp className="h-4 w-4 text-black" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-neutral-100 hover:bg-black hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider rounded-none border border-neutral-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm text-neutral-500 font-medium">
                No products found matching &quot;<strong className="text-black">{query}</strong>&quot;
              </p>
              <Link href="/shop" onClick={() => setOpen(false)}>
                <Button variant="outline" className="rounded-none text-xs font-bold uppercase tracking-wider h-10 px-6">
                  Browse All Collections
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-neutral-400 border-b pb-2">
                <span>Search Results ({searchResults.length})</span>
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={() => setOpen(false)}
                  className="text-black hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.slice(0, 6).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-2.5 border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-all group"
                  >
                    <div className="relative h-14 w-12 bg-neutral-100 shrink-0 overflow-hidden border border-neutral-100">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-neutral-400 uppercase font-semibold tracking-wider truncate">
                        {product.category}
                      </p>
                      <h4 className="font-medium text-xs text-black truncate group-hover:underline">
                        {product.name}
                      </h4>
                      <p className="font-bold text-xs text-black mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
