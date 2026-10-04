'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/store/useWishlist';
import { useCart } from '@/store/useCart';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const wishlist = useWishlist();
  const { addItem } = useCart();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="container mx-auto px-4 py-16 min-h-[50vh]">Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">My Wishlist</h1>
      {wishlist.items.length === 0 ? (
        <div className="text-center py-20 bg-neutral-50 border">
          <p className="text-lg text-muted-foreground mb-6">Your wishlist is empty.</p>
          <Link href="/shop"><Button className="bg-black text-white rounded-none px-8">BROWSE PRODUCTS</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.items.map((item) => (
            <div key={item.productId} className="group flex flex-col border">
              <Link href={`/product/${item.slug}`} className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="p-3 flex flex-col gap-2">
                <Link href={`/product/${item.slug}`} className="font-medium text-sm line-clamp-2 hover:underline">{item.name}</Link>
                <p className="font-bold text-sm">₹{item.price}</p>
                <div className="flex gap-2 mt-1">
                  <Button
                    size="sm"
                    className="flex-1 bg-black text-white rounded-none text-xs h-8"
                    onClick={() => {
                      addItem({ productId: item.productId, name: item.name, slug: item.slug, price: item.price, image: item.image, quantity: 1 });
                      wishlist.removeItem(item.productId);
                    }}
                  >
                    <ShoppingBag className="h-3 w-3 mr-1" /> Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-none h-8 w-8 p-0" onClick={() => wishlist.removeItem(item.productId)}>
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

