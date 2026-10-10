import type { Metadata } from 'next';
import { getAllProducts, CATEGORIES } from "@/lib/data/products";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Collections | DELA BAGS",
  description: "Explore our complete collection of premium leather handbags, crossbodies, totes, purses, and travel duffels with fast shipping across India.",
  openGraph: {
    title: "Shop All Collections | DELA BAGS",
    description: "Explore our complete collection of premium leather handbags, crossbodies, totes, purses, and travel duffels.",
  },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;
  const products = await getAllProducts();

  return (
    <ShopClient
      initialProducts={products}
      categories={CATEGORIES}
      initialCategory={category}
      initialSort={sort}
    />
  );
}
