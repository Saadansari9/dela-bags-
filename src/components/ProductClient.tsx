'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Truck, ShieldCheck, Plus, Minus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import type { Product } from '@/lib/data/products';
import { ProductReviews } from '@/components/ProductReviews';

export default function ProductClient({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [mounted, setMounted] = useState(false);

  const { addItem } = useCart();
  const wishlist = useWishlist();

  useEffect(() => { setMounted(true); }, []);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const inWishlist = mounted && wishlist.hasItem(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      wishlist.removeItem(product.id);
    } else {
      wishlist.addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0],
      });
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '919930009639';
  const whatsappMsg = encodeURIComponent(`Hi DELA BAGS! I want to order: ${product.name} (₹${product.price}). Please help me place an order.`);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8 flex-wrap gap-1">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-black">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-black">{product.category}</Link>
        <span>/</span>
        <span className="text-black font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left: Images */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`relative aspect-[3/4] w-20 shrink-0 border-2 transition-all ${mainImage === img ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Main Image */}
          <div className="relative aspect-[4/5] w-full bg-neutral-100 flex-1 overflow-hidden">
            <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1">-{discount}%</div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({product.reviews} reviews)</span>
            </div>
            <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
            {discount > 0 && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">SAVE {discount}%</span>
            )}
          </div>
          <p className="text-sm text-green-600 font-medium mb-4">Inclusive of all taxes</p>
          {product.stock > 0 ? (
            <p className="text-sm text-green-700 font-medium mb-4">✓ In Stock ({product.stock} available)</p>
          ) : (
            <p className="text-sm text-red-600 font-medium mb-4">Out of Stock</p>
          )}

          <Separator className="mb-5" />

          {/* Color */}
          {product.colors.length > 0 && (
            <div className="mb-5">
              <p className="font-medium mb-2">Color: <span className="text-muted-foreground">{selectedColor}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`px-3 py-1.5 text-sm border transition-all ${selectedColor === color ? 'border-black bg-black text-white' : 'border-neutral-300 hover:border-black'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes.length > 0 && (
            <div className="mb-5">
              <p className="font-medium mb-2">Size: <span className="text-muted-foreground">{selectedSize}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium border transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-neutral-300 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6 flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border border-neutral-300">
              <button
                className="p-2 px-3 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                className="p-2 px-3 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-black text-white hover:bg-neutral-800 rounded-none h-14 text-base font-bold disabled:opacity-50"
            >
              {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
            </Button>
            <Button
              variant="outline"
              onClick={handleWishlist}
              className={`flex-1 rounded-none h-14 text-base font-bold border-black ${inWishlist ? 'bg-black text-white' : ''}`}
            >
              <Heart className={`mr-2 h-5 w-5 ${inWishlist ? 'fill-white' : ''}`} />
              {inWishlist ? 'WISHLISTED' : 'WISHLIST'}
            </Button>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full bg-[#25D366]/10 text-[#128C7E] border-[#25D366] hover:bg-[#25D366]/20 rounded-none h-12 mb-6 font-bold w-full">
              <MessageCircle className="mr-2 h-5 w-5" /> ORDER ON WHATSAPP
            </Button>
          </a>

          {/* Trust badges */}
          <div className="space-y-3 bg-neutral-50 p-4 border mb-6 text-sm">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-neutral-600 shrink-0 mt-0.5" />
              <div><p className="font-medium">Free Shipping across India</p><p className="text-muted-foreground text-xs">Delivery in 3-5 business days.</p></div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-neutral-600 shrink-0 mt-0.5" />
              <div><p className="font-medium">7-Day Easy Returns</p><p className="text-muted-foreground text-xs">Hassle-free return policy.</p></div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {['description', 'specifications', 'shipping'].map((tab) => (
                <TabsTrigger key={tab} value={tab} className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-3 font-medium capitalize">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="description" className="pt-4 text-sm text-muted-foreground leading-relaxed">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4 text-sm">
              {product.specifications ? (
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k} className="flex gap-4 border-b pb-2">
                      <dt className="font-medium w-40 shrink-0 text-muted-foreground">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-muted-foreground">No specifications available.</p>
              )}
            </TabsContent>
            <TabsContent value="shipping" className="pt-4 text-sm text-muted-foreground space-y-3">
              <p>We process all orders within 24 hours. Standard shipping takes 3-5 business days.</p>
              <p>Returns accepted within 7 days of delivery in original, unused condition.</p>
              <Link href="/shipping-policy" className="text-black underline underline-offset-2">Full Shipping Policy →</Link>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews productName={product.name} />
    </div>
  );
}
