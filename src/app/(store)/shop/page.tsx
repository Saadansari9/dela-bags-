import { getAllProducts, CATEGORIES } from "@/lib/data/products";
import ShopClient from "@/components/ShopClient";

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
