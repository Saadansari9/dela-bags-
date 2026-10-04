import Link from "next/link";
import { Globe, Share2, Play, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
// Note: lucide-react v1.x removed brand icons (Facebook, Instagram, Youtube).
// Using generic icons as placeholders. Replace with react-icons (ri) for brand logos if needed.

export default function Footer() {
  return (
    <footer className="bg-neutral-100 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-widest uppercase">DELA BAGS</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Carry your style. We provide premium quality bags for every occasion. Elegance, durability, and modern fashion crafted for you.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={process.env.NEXT_PUBLIC_YOUTUBE_URL || "#"} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Play className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g,"") || "919930009639"}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Shop All</Link></li>
              <li><Link href="/shop?category=ladies-handbags" className="hover:text-foreground transition-colors">Women's Collection</Link></li>
              <li><Link href="/shop?category=mens-bags" className="hover:text-foreground transition-colors">Men's Collection</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-foreground transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-foreground transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Haji Chawl, Morland Road, Mumbai Central, Mumbai - 400008, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>+91 84258 45342</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>DELAbags.service@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DELA BAGS. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Secure Payments via Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
