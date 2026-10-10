import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FAF9F6] px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <span className="font-mono text-6xl font-black text-black">404</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-black">
            Page Not Found
          </h1>
          <p className="text-xs text-neutral-600 leading-relaxed font-light">
            The handbag, collection, or page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-black text-white hover:bg-neutral-800 rounded-none h-11 px-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Button>
          </Link>

          <Link href="/shop">
            <Button variant="outline" className="w-full sm:w-auto border-black rounded-none h-11 px-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <ShoppingBag className="h-3.5 w-3.5" /> Explore Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
