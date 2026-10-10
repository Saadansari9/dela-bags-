import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dela-bags.vercel.app';

  // Static Pages
  const staticPages = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/faq',
    '/rewards',
    '/reviews',
    '/track-order',
    '/privacy-policy',
    '/terms',
    '/shipping-policy',
    '/return-policy',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Product Pages
  const productPages = PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...productPages];
}
