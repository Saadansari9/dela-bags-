'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Truck, ShieldCheck, Plus, Minus, MessageCircle, MapPin, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import type { Product } from '@/lib/data/products';
import { ProductReviews } from '@/components/ProductReviews';
import { MonogramCustomizer } from '@/components/MonogramCustomizer';
import { BagCapacityVisualizer } from '@/components/BagCapacityVisualizer';

export default function ProductClient({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [mounted, setMounted] = useState(false);
  const [monogram, setMonogram] = useState<{ text: string; style: string } | null>(null);

  // Pincode Estimator State
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ loading: boolean; estimate: string | null; error: string | null }>({
    loading: false,
    estimate: null,
    error: null,
  });

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
      monogram: monogram ? monogram : undefined,
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

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.replace(/[^0-9]/g, '');
    if (cleanPin.length !== 6) {
      setPincodeStatus({ loading: false, estimate: null, error: 'Please enter a valid 6-digit Indian Pincode.' });
      return;
    }

    setPincodeStatus({ loading: true, estimate: null, error: null });

    setTimeout(() => {
      // Calculate estimated delivery 3-4 days from today
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 3);
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      const formattedDate = deliveryDate.toLocaleDateString('en-IN', options);

      setPincodeStatus({
        loading: false,
        estimate: `Delivered by ${formattedDate} (Express Shipping Available)`,
        error: null,
      });
    }, 600);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '919930009639';
  const whatsappMsg = encodeURIComponent(`Hi DELA BAGS! I want to order: ${product.name} (₹${product.price}). Please help me place an order.`);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl pb-24 lg:pb-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-xs text-neutral-500 mb-8 flex-wrap gap-1 tracking-wider uppercase font-semibold">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-black">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-black">{product.category}</Link>
        <span>/</span>
        <span className="text-black line-clamp-1">{product.name}</span>
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
                  className={`relative aspect-[3/4] w-20 shrink-0 border transition-all ${mainImage === img ? 'border-black opacity-100' : 'border-neutral-200 opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Main Image */}
          <div className="relative aspect-[4/5] w-full bg-neutral-100 flex-1 overflow-hidden border border-neutral-200">
            <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">-{discount}%</div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <p className="text-xs text-neutral-400 uppercase tracking-[0.2em] font-semibold mb-2">{product.category}</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3 text-neutral-900">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-black fill-black' : 'text-neutral-200'}`} />
              ))}
              <span className="text-xs text-neutral-500 ml-1">({product.reviews} reviews)</span>
            </div>
            <span className="text-xs text-neutral-400 font-mono">SKU: {product.sku}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-bold text-black">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-lg text-neutral-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
            {discount > 0 && (
              <span className="bg-neutral-100 text-black border border-neutral-300 text-xs font-bold px-2 py-1 uppercase tracking-wider">SAVE {discount}%</span>
            )}
          </div>
          <p className="text-xs text-green-700 font-semibold mb-4 uppercase tracking-wider">Inclusive of all taxes</p>
          {product.stock > 0 ? (
            <p className="text-xs text-green-700 font-bold mb-4 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> In Stock ({product.stock} available)
            </p>
          ) : (
            <p className="text-xs text-red-600 font-bold mb-4 uppercase tracking-wider">Out of Stock</p>
          )}

          <Separator className="mb-5" />

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider font-bold mb-2">Color: <span className="text-neutral-500 font-normal">{selectedColor}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${selectedColor === color ? 'border-black bg-black text-white' : 'border-neutral-300 hover:border-black text-neutral-800'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider font-bold mb-2">Size: <span className="text-neutral-500 font-normal">{selectedSize}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-neutral-300 hover:border-black text-neutral-800'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Monogram Engraving Customizer */}
          <div className="mb-6">
            <MonogramCustomizer onMonogramChange={setMonogram} />
          </div>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider font-bold">Quantity:</span>
            <div className="flex items-center border border-neutral-300">
              <button
                className="p-2 px-3 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center font-mono font-bold text-xs">{quantity}</span>
              <button
                className="p-2 px-3 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Pincode Delivery Estimator Widget */}
          <div className="bg-[#FAF9F6] border border-neutral-200 p-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="h-4 w-4 text-black" /> Check Delivery Date
            </div>
            <form onSubmit={checkPincode} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter 6-digit Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                className="bg-white rounded-none border-neutral-300 text-xs h-9 tracking-widest font-mono"
              />
              <Button type="submit" variant="outline" disabled={pincodeStatus.loading} className="rounded-none h-9 text-xs font-bold uppercase px-4 border-black">
                {pincodeStatus.loading ? 'CHECKING...' : 'CHECK'}
              </Button>
            </form>
            {pincodeStatus.estimate && (
              <p className="text-xs text-green-700 font-semibold mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> {pincodeStatus.estimate}
              </p>
            )}
            {pincodeStatus.error && (
              <p className="text-xs text-red-600 font-medium mt-2">{pincodeStatus.error}</p>
            )}
          </div>

          {/* Bag Capacity & Storage Visualizer */}
          <div className="mb-6">
            <BagCapacityVisualizer bagName={product.name} category={product.category} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-black text-white hover:bg-neutral-800 rounded-none h-14 text-xs font-bold uppercase tracking-[0.2em] shadow-sm disabled:opacity-50"
            >
              {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
            </Button>
            <Button
              variant="outline"
              onClick={handleWishlist}
              className={`flex-1 rounded-none h-14 text-xs font-bold uppercase tracking-[0.2em] border-black ${inWishlist ? 'bg-black text-white' : ''}`}
            >
              <Heart className={`mr-2 h-4 w-4 ${inWishlist ? 'fill-white' : ''}`} />
              {inWishlist ? 'WISHLISTED' : 'WISHLIST'}
            </Button>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full bg-[#25D366]/10 text-[#128C7E] border-[#25D366] hover:bg-[#25D366]/20 rounded-none h-12 mb-6 font-bold text-xs uppercase tracking-wider">
              <MessageCircle className="mr-2 h-4 w-4" /> ENQUIRE ON WHATSAPP
            </Button>
          </a>

          {/* Trust Badges */}
          <div className="space-y-3 bg-neutral-50 p-4 border mb-6 text-xs">
            <div className="flex items-start gap-3">
              <Truck className="h-4 w-4 text-black shrink-0 mt-0.5" />
              <div><p className="font-bold text-black uppercase tracking-wider">Free Shipping across India</p><p className="text-neutral-500 font-light">Delivery in 3-5 business days via Express Courier.</p></div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 text-black shrink-0 mt-0.5" />
              <div><p className="font-bold text-black uppercase tracking-wider">7-Day Easy Returns</p><p className="text-neutral-500 font-light">Hassle-free return policy with instant refund guarantee.</p></div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {['description', 'specifications', 'shipping'].map((tab) => (
                <TabsTrigger key={tab} value={tab} className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-3 text-xs font-bold tracking-wider uppercase">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="description" className="pt-4 text-xs text-neutral-600 leading-relaxed font-light">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4 text-xs">
              {product.specifications ? (
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k} className="flex gap-4 border-b pb-2">
                      <dt className="font-bold w-36 shrink-0 text-neutral-500 uppercase tracking-wider">{k}</dt>
                      <dd className="text-neutral-800 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-neutral-500">No specifications available.</p>
              )}
            </TabsContent>
            <TabsContent value="shipping" className="pt-4 text-xs text-neutral-600 space-y-3 font-light">
              <p>We process all orders within 24 hours. Standard shipping takes 3-5 business days.</p>
              <p>Returns accepted within 7 days of delivery in original, unused condition.</p>
              <Link href="/shipping-policy" className="text-black font-bold underline underline-offset-4 uppercase tracking-wider">Full Shipping Policy →</Link>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews productName={product.name} />

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 p-3 flex items-center justify-between gap-3 md:hidden shadow-lg">
        <div className="min-w-0">
          <p className="text-xs font-bold text-black truncate">{product.name}</p>
          <p className="text-xs font-mono font-bold text-black">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="bg-black text-white hover:bg-neutral-800 rounded-none h-11 px-6 text-xs font-bold uppercase tracking-wider shrink-0"
        >
          <ShoppingBag className="mr-1.5 h-3.5 w-3.5" /> ADD TO CART
        </Button>
      </div>
    </div>
  );
}
