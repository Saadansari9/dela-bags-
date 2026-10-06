import Link from "next/link";
import { Globe, Share2, Play, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
// Note: lucide-react v1.x removed brand icons (Facebook, Instagram, Youtube).
// Using generic icons as placeholders. Replace with react-icons (ri) for brand logos if needed.

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-[0.25em] uppercase text-white">
                DELA BAGS
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Carry your style. Premium quality handbags and accessories designed for elegance, durability, and modern Indian lifestyle.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={process.env.NEXT_PUBLIC_YOUTUBE_URL || "#"} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Play className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g,"") || "919930009639"}`} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Quick Links</h3>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium tracking-wider uppercase">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/rewards" className="hover:text-amber-400 text-amber-300 font-bold transition-colors">✨ VIP Privé Rewards</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Customer Reviews Wall</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Customer Service</h3>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium tracking-wider uppercase">
              <li><Link href="/track-order" className="hover:text-white transition-colors font-bold text-white">📦 Track Order Live</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Contact Us</h3>
            <ul className="space-y-3 text-xs text-neutral-400 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-white mt-0.5" />
                <span>Haji Chawl, Morland Road, Mumbai Central, Mumbai - 400008, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-white" />
                <span>+91 84258 45342</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-white" />
                <span>DELAbags.service@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 bg-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 font-light tracking-wider">
            &copy; {new Date().getFullYear()} DELA BAGS. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-400 font-light tracking-wider">
            <span>Secured via Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
