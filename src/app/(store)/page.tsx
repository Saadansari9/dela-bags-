import { getBestsellers, getNewArrivals } from "@/lib/data/products";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const bestsellers = await getBestsellers();
  const newArrivals = await getNewArrivals();

  return <HomeClient bestsellers={bestsellers} newArrivals={newArrivals} />;
}
