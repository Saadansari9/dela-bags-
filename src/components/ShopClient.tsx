'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Search, Filter, X, ArrowUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Product, Category } from '@/lib/data/products';
import { useProductStore } from '@/store/useProductStore';

export default function ShopClient({
  initialProducts,
  categories,
  initialCategory,
  initialSort,
}: {
  initialProducts: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSort?: string;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [sortOption, setSortOption] = useState(initialSort || 'featured');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const productStore = useProductStore();

  const activeProducts = useMemo(() => {
    return productStore.getFilteredProducts(initialProducts);
  }, [initialProducts, productStore.deletedIds]);

  const filteredProducts = useMemo(() => {
    return activeProducts.filter((p) => {
      // Category filter
      if (selectedCategory && p.categorySlug !== selectedCategory) return false;

      // Price filter
      if (p.price > maxPrice) return false;

      // Stock filter
      if (onlyInStock && p.stock <= 0) return false;

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'new') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      if (sortOption === 'bestseller') return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      return 0;
    });
  }, [activeProducts, selectedCategory, maxPrice, onlyInStock, searchQuery, sortOption]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMaxPrice(5000);
    setOnlyInStock(false);
    setSortOption('featured');
  };

  return (
    <div className="bg-stone-50/30 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-black font-bold">The Luxury Collection</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-1">Shop All Bags</h1>
          <div className="h-0.5 w-12 bg-black mx-auto mt-3 mb-4" />
          <p className="text-stone-600 text-sm">
            Handcrafted leather & vegan bags designed for elegance, durability, and daily sophistication.
          </p>
        </div>

        {/* Search Bar & Toolbar */}
        <div className="bg-white border p-4 mb-8 space-y-4 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search handbag, tote, wallet, leather..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-neutral-50 rounded-none h-11 text-sm border-neutral-300 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs uppercase font-semibold text-muted-foreground flex items-center gap-1">
                <ArrowUpDown className="h-3.5 w-3.5" /> Sort By:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="h-11 bg-neutral-50 border border-neutral-300 px-4 text-sm font-medium focus:outline-none rounded-none"
              >
                <option value="featured">Featured / Default</option>
                <option value="bestseller">Best Sellers</option>
                <option value="new">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Applied Filter Chips */}
          {(selectedCategory || searchQuery || maxPrice < 5000 || onlyInStock) && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t text-xs">
              <span className="text-muted-foreground font-semibold">Active Filters:</span>
              {selectedCategory && (
                <span className="bg-neutral-100 border px-2 py-1 flex items-center gap-1">
                  Cat: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                  <button onClick={() => setSelectedCategory('')}><X className="h-3 w-3" /></button>
                </span>
              )}
              {maxPrice < 5000 && (
                <span className="bg-neutral-100 border px-2 py-1 flex items-center gap-1">
                  Under ₹{maxPrice}
                  <button onClick={() => setMaxPrice(5000)}><X className="h-3 w-3" /></button>
                </span>
              )}
              {onlyInStock && (
                <span className="bg-neutral-100 border px-2 py-1 flex items-center gap-1">
                  In Stock Only
                  <button onClick={() => setOnlyInStock(false)}><X className="h-3 w-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-neutral-100 border px-2 py-1 flex items-center gap-1">
                  &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')}><X className="h-3 w-3" /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-red-600 underline font-medium ml-2">
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white border p-6 space-y-8 sticky top-24">
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 border-b pb-2 flex items-center justify-between">
                  <span>Categories</span>
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left transition-colors flex justify-between items-center ${
                        !selectedCategory ? 'font-bold text-black' : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      <span>All Bags</span>
                      {!selectedCategory && <Check className="h-3.5 w-3.5 text-black" />}
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left transition-colors flex justify-between items-center ${
                          selectedCategory === cat.slug ? 'font-bold text-black' : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {selectedCategory === cat.slug && <Check className="h-3.5 w-3.5 text-black" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range Filter */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm uppercase tracking-wider">Max Price</h3>
                  <span className="font-mono text-sm font-bold text-black">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹500</span>
                  <span>₹5,000</span>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="border-t pt-6">
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-black h-4 w-4"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 text-sm text-neutral-600">
              <p>
                Showing <strong className="text-black">{filteredProducts.length}</strong> of{' '}
                {initialProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border">
                <p className="text-lg text-muted-foreground mb-4">No products found matching your filters.</p>
                <Button onClick={clearFilters} className="bg-black text-white rounded-none">
                  RESET ALL FILTERS
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => {
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col border border-neutral-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
                    >
                      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {discount > 0 && (
                          <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                            SAVE {discount}%
                          </div>
                        )}
                        {product.bestseller && (
                          <div className="absolute top-3 right-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                            BESTSELLER
                          </div>
                        )}
                      </Link>

                      <div className="p-4 flex flex-col flex-grow">
                        <p className="text-[11px] text-muted-foreground uppercase font-semibold tracking-wider mb-1">
                          {product.category}
                        </p>
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-medium text-sm sm:text-base line-clamp-1 hover:underline underline-offset-2"
                        >
                          {product.name}
                        </Link>

                        <div className="flex items-center gap-1 my-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-amber-500 fill-amber-500'
                                    : 'text-neutral-300'
                                }`}
                              />
                            ))}
                          <span className="text-xs text-neutral-500 ml-1">({product.reviews})</span>
                        </div>

                        <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-neutral-100">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-base">₹{product.price.toLocaleString('en-IN')}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-neutral-400 line-through">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                          <Link href={`/product/${product.slug}`}>
                            <Button size="sm" className="bg-black text-white hover:bg-neutral-800 rounded-none text-xs h-8">
                              VIEW BAG
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
