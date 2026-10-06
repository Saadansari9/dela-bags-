"use client";

import Link from "next/link";
import { ShoppingBag, Heart, Search, User, Menu, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const cartCount = useCart((state) => state.getCartCount());
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur text-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-none hover:bg-neutral-100 focus-visible:outline-none">
                <Menu className="h-5 w-5 text-neutral-800" />
                <span className="sr-only">Toggle menu</span>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white text-neutral-900 border-neutral-200">
                <div className="mt-4 mb-6">
                  <span className="font-heading text-xl font-bold tracking-[0.25em] uppercase text-black">DELA BAGS</span>
                </div>
                <nav className="flex flex-col gap-1">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/shop", label: "Shop All" },
                    { href: "/shop?category=ladies-handbags", label: "Women" },
                    { href: "/shop?category=mens-bags", label: "Men" },
                    { href: "/shop?category=unisex-bags", label: "Unisex" },
                    { href: "/shop?sort=new", label: "New Arrivals" },
                    { href: "/about", label: "About Us" },
                    { href: "/contact", label: "Contact" },
                  ].map(({ href, label }) => (
                    <Link key={href} href={href} className="text-xs uppercase tracking-widest font-semibold py-2.5 px-2 rounded-none hover:bg-neutral-100 transition-colors">
                      {label}
                    </Link>
                  ))}
                  <div className="border-t border-neutral-200 my-2 pt-2">
                    {session ? (
                      <>
                        <Link href="/account" className="text-xs uppercase tracking-widest font-semibold py-2.5 px-2 hover:bg-neutral-100 transition-colors block">My Account</Link>
                        <Link href="/wishlist" className="text-xs uppercase tracking-widest font-semibold py-2.5 px-2 hover:bg-neutral-100 transition-colors block">Wishlist</Link>
                        {(session.user as { role?: string })?.role === "ADMIN" && (
                          <Link href="/admin" className="text-xs uppercase tracking-widest font-semibold py-2.5 px-2 text-black hover:bg-neutral-100 transition-colors block">Admin Panel</Link>
                        )}
                        <button onClick={() => signOut({ callbackUrl: "/" })} className="text-xs uppercase tracking-widest font-semibold py-2.5 px-2 hover:bg-neutral-100 transition-colors w-full text-left text-red-600">
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="text-xs uppercase tracking-widest font-semibold py-2.5 px-2 hover:bg-neutral-100 transition-colors block">Sign In</Link>
                        <Link href="/register" className="text-xs uppercase tracking-widest font-semibold py-2.5 px-2 hover:bg-neutral-100 transition-colors block">Create Account</Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex justify-center md:justify-start flex-1 md:flex-none">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-2xl font-bold tracking-[0.25em] uppercase text-black hover:opacity-80 transition-opacity">
                DELA BAGS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.2em] uppercase">
            <Link href="/" className="transition-colors hover:text-black text-neutral-600">Home</Link>
            <Link href="/shop" className="transition-colors hover:text-black text-neutral-600">Shop</Link>
            <Link href="/shop?category=ladies-handbags" className="transition-colors hover:text-black text-neutral-600">Women</Link>
            <Link href="/shop?category=mens-bags" className="transition-colors hover:text-black text-neutral-600">Men</Link>
            <Link href="/shop?sort=new" className="transition-colors hover:text-black text-neutral-600">New Arrivals</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-1 md:gap-2 flex-1 md:flex-none">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-neutral-700 hover:text-black hover:bg-neutral-100">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="text-neutral-700 hover:text-black hover:bg-neutral-100">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            {/* Account dropdown */}
            {mounted && session ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-none hover:bg-neutral-100 focus-visible:outline-none"
                >
                  <div className="h-7 w-7 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white text-neutral-900 border-neutral-200 rounded-none shadow-md">
                  <div className="px-3 py-2 text-xs">
                    <p className="font-bold text-black">{session.user?.name}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{session.user?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-neutral-200" />
                  <DropdownMenuItem onClick={() => window.location.href = "/account"} className="hover:bg-neutral-100 cursor-pointer text-xs uppercase tracking-wider">
                    <User className="mr-2 h-4 w-4" /> My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = "/wishlist"} className="hover:bg-neutral-100 cursor-pointer text-xs uppercase tracking-wider">
                    <Heart className="mr-2 h-4 w-4" /> Wishlist
                  </DropdownMenuItem>
                  {(session.user as { role?: string })?.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator className="bg-neutral-200" />
                      <DropdownMenuItem onClick={() => window.location.href = "/admin"} className="hover:bg-neutral-100 cursor-pointer text-xs uppercase tracking-wider font-bold">
                        <Settings className="mr-2 h-4 w-4" /> Admin Panel
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-neutral-200" />
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-red-600 hover:bg-neutral-100 cursor-pointer text-xs uppercase tracking-wider">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-neutral-700 hover:text-black hover:bg-neutral-100">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-neutral-700 hover:text-black hover:bg-neutral-100">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {mounted && cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
