'use client';

export const dynamic = 'force-dynamic';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, MapPin, Lock, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/account');
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-[60vh] flex items-center justify-center"><div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin" /></div>;
  }
  if (!session) return null;

  const user = session.user;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
          <div className="bg-neutral-50 border p-6 mb-4 text-center">
            <div className="h-16 w-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <p className="font-bold text-lg">{user?.name}</p>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            {(user as { role?: string })?.role === 'ADMIN' && (
              <span className="inline-block mt-2 bg-black text-white text-xs px-2 py-0.5 font-bold uppercase">Admin</span>
            )}
          </div>
          {[
            { href: '/account', icon: User, label: 'Profile' },
            { href: '/account/orders', icon: Package, label: 'My Orders' },
            { href: '/wishlist', icon: Heart, label: 'Wishlist' },
            { href: '/account/addresses', icon: MapPin, label: 'Saved Addresses' },
            { href: '/account/password', icon: Lock, label: 'Change Password' },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-4 py-3 border hover:bg-neutral-50 transition-colors font-medium text-sm">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
          {(user as { role?: string })?.role === 'ADMIN' && (
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 border border-black bg-black text-white hover:bg-neutral-800 transition-colors font-medium text-sm">
              <Package className="h-4 w-4" /> Admin Dashboard
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-3 border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="border p-6">
            <h2 className="font-bold text-lg mb-4">Profile Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Full Name</p><p className="font-medium">{user?.name || '—'}</p></div>
              <div><p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Email</p><p className="font-medium">{user?.email || '—'}</p></div>
            </div>
          </div>
          <div className="border p-6">
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No orders yet.</p>
              <Link href="/shop"><Button className="mt-4 bg-black text-white rounded-none">Start Shopping</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
