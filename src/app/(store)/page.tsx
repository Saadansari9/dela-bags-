import type { Metadata } from 'next';
import { getBestsellers, getNewArrivals } from "@/lib/data/products";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Handcrafted Luxury Handbags & Accessories | DELA BAGS",
  description: "Discover handcrafted luxury handbags, sling bags, totes, and men's leather accessories designed for elegance, durability, and modern Indian lifestyle.",
  openGraph: {
    title: "Handcrafted Luxury Handbags & Accessories | DELA BAGS",
    description: "Discover handcrafted luxury handbags, sling bags, totes, and men's leather accessories.",
  },
};

export default async function Home() {
  const bestsellers = await getBestsellers();
  const newArrivals = await getNewArrivals();

  return <HomeClient bestsellers={bestsellers} newArrivals={newArrivals} />;
}
