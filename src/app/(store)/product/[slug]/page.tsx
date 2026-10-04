import { getProductBySlug, getAllProducts } from '@/lib/data/products';
import { notFound } from 'next/navigation';
import ProductClient from '@/components/ProductClient';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found | DELA BAGS' };
  return {
    title: `${product.name} | DELA BAGS`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const allProducts = await getAllProducts();
  const related = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductClient product={product} />

      {/* Related Products */}
      {related.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl border-t">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold">You May Also Like</h2>
            <div className="h-1 w-16 bg-black mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/5] bg-neutral-100 mb-3 overflow-hidden">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5">
                      -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm line-clamp-2 group-hover:underline underline-offset-2">{p.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-sm">₹{p.price.toLocaleString('en-IN')}</span>
                  {p.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
