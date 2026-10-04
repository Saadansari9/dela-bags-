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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="mt-4 mb-6">
                  <span className="font-heading text-xl font-bold tracking-widest uppercase">DELA BAGS</span>
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
                    <Link key={href} href={href} className="text-base font-medium py-2 px-2 rounded hover:bg-neutral-100 transition-colors">
                      {label}
                    </Link>
                  ))}
                  <div className="border-t my-2 pt-2">
                    {session ? (
                      <>
                        <Link href="/account" className="text-base font-medium py-2 px-2 rounded hover:bg-neutral-100 transition-colors block">My Account</Link>
                        <Link href="/wishlist" className="text-base font-medium py-2 px-2 rounded hover:bg-neutral-100 transition-colors block">Wishlist</Link>
                        {(session.user as { role?: string })?.role === "ADMIN" && (
                          <Link href="/admin" className="text-base font-medium py-2 px-2 rounded hover:bg-neutral-100 transition-colors block">Admin Panel</Link>
                        )}
                        <button onClick={() => signOut({ callbackUrl: "/" })} className="text-base font-medium py-2 px-2 rounded hover:bg-neutral-100 transition-colors w-full text-left text-red-600">
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="text-base font-medium py-2 px-2 rounded hover:bg-neutral-100 transition-colors block">Sign In</Link>
                        <Link href="/register" className="text-base font-medium py-2 px-2 rounded hover:bg-neutral-100 transition-colors block">Create Account</Link>
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
              <span className="font-heading text-2xl font-bold tracking-widest uppercase">DELA BAGS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
            <Link href="/shop" className="transition-colors hover:text-foreground/80">Shop</Link>
            <Link href="/shop?category=ladies-handbags" className="transition-colors hover:text-foreground/80">Women</Link>
            <Link href="/shop?category=mens-bags" className="transition-colors hover:text-foreground/80">Men</Link>
            <Link href="/shop?sort=new" className="transition-colors hover:text-foreground/80">New Arrivals</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-1 md:gap-2 flex-1 md:flex-none">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            {/* Account dropdown */}
            {mounted && session ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <div className="h-7 w-7 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = "/account"}>
                    <User className="mr-2 h-4 w-4" /> My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = "/wishlist"}>
                    <Heart className="mr-2 h-4 w-4" /> Wishlist
                  </DropdownMenuItem>
                  {(session.user as { role?: string })?.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => window.location.href = "/admin"}>
                        <Settings className="mr-2 h-4 w-4" /> Admin Panel
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
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
