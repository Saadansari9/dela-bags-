import Image from "next/image";
import Link from "next/link";
import { Star, SlidersHorizontal, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllProducts, CATEGORIES } from "@/lib/data/products";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category: activeCategory, sort } = await searchParams;
  let products = await getAllProducts();

  // Filter by Category
  if (activeCategory) {
    products = products.filter((p) => p.categorySlug === activeCategory);
  }

  // Sort
  if (sort === "new") {
    products = [...products].filter((p) => p.newArrival);
  } else if (sort === "bestselling") {
    products = [...products].filter((p) => p.bestseller);
  } else if (sort === "price-low") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-stone-50/30 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">The Complete Catalog</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-1">Shop All Bags</h1>
          <div className="h-0.5 w-12 bg-amber-800 mx-auto mt-3 mb-4" />
          <p className="text-stone-600 text-sm">
            Explore handcrafted luxury bags designed for modern Indian lifestyles — from daily commutes to evening galas.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white border border-stone-200 p-6 rounded-md sticky top-24 space-y-8 shadow-xs">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center justify-between text-stone-900 border-b border-stone-100 pb-2">
                  Categories
                  <ChevronDown className="h-4 w-4 lg:hidden text-stone-500" />
                </h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link
                      href="/shop"
                      className={`block transition-colors ${!activeCategory ? "font-bold text-amber-900" : "text-stone-600 hover:text-stone-900"}`}
                    >
                      All Bags
                    </Link>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/shop?category=${cat.slug}`}
                        className={`block transition-colors ${activeCategory === cat.slug ? "font-bold text-amber-900" : "text-stone-600 hover:text-stone-900"}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block border-t border-stone-100 pt-6">
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-stone-900">Sorting & Collections</h3>
                <ul className="space-y-2.5 text-sm text-stone-600">
                  <li><Link href="/shop?sort=new" className="hover:text-amber-900">New Arrivals</Link></li>
                  <li><Link href="/shop?sort=bestselling" className="hover:text-amber-900">Best Sellers</Link></li>
                  <li><Link href="/shop?sort=price-low" className="hover:text-amber-900">Price: Low to High</Link></li>
                  <li><Link href="/shop?sort=price-high" className="hover:text-amber-900">Price: High to Low</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white border border-stone-200 p-4 rounded-md shadow-xs">
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <span className="font-semibold text-stone-900">{products.length}</span> Products Found
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-semibold text-stone-500">Sort:</span>
                <div className="flex gap-2 text-xs">
                  <Link href="/shop" className="px-3 py-1 border border-stone-200 hover:bg-stone-100 font-medium">All</Link>
                  <Link href="/shop?sort=new" className="px-3 py-1 border border-stone-200 hover:bg-stone-100 font-medium">New</Link>
                  <Link href="/shop?sort=bestselling" className="px-3 py-1 border border-stone-200 hover:bg-stone-100 font-medium">Bestsellers</Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => {
                const discount = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <div key={product.id} className="group flex flex-col border border-stone-100 bg-white rounded-md overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
                    <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-stone-950 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                          SAVE {discount}%
                        </div>
                      )}
                      {product.bestseller && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                          BESTSELLER
                        </div>
                      )}
                    </Link>

                    <div className="p-4 flex flex-col flex-grow">
                      <p className="text-[11px] text-amber-800 uppercase font-semibold tracking-wider mb-1">{product.category}</p>
                      <Link href={`/product/${product.slug}`} className="font-medium text-sm sm:text-base line-clamp-1 hover:underline underline-offset-2">
                        {product.name}
                      </Link>

                      <div className="flex items-center gap-1 my-2">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-stone-300"}`} />
                        ))}
                        <span className="text-xs text-stone-500 ml-1">({product.reviews})</span>
                      </div>

                      <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-stone-100">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-base">₹{product.price.toLocaleString("en-IN")}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-stone-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                          )}
                        </div>
                        <Link href={`/product/${product.slug}`}>
                          <Button size="sm" className="bg-stone-950 text-white hover:bg-stone-800 rounded-none text-xs h-8">
                            BUY NOW
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
