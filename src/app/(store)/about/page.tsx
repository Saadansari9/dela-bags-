import Image from "next/image";
import { Sparkles, Award, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Our Journey & Philosophy</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-1">About DELA BAGS</h1>
          <div className="h-0.5 w-12 bg-amber-800 mx-auto mt-3" />
        </div>

        {/* Hero Image Banner */}
        <div className="relative aspect-[21/9] mb-16 bg-stone-900 rounded-lg overflow-hidden shadow-lg border border-stone-200">
          <Image
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2000&auto=format&fit=crop"
            alt="DELA BAGS Craftsmanship"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-8 sm:p-12">
            <p className="text-amber-200 font-heading text-2xl sm:text-3xl font-light italic">
              "Elegance is not about standing out, but about being remembered."
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto space-y-8 text-stone-700 leading-relaxed text-base sm:text-lg">
          <p className="text-xl sm:text-2xl leading-relaxed text-stone-900 font-heading font-medium text-center border-b border-stone-100 pb-8">
            DELA BAGS was founded with a singular vision: to create exquisite, functional, and durable bags that elevate your daily attire without compromise.
          </p>

          <div className="grid md:grid-cols-2 gap-8 py-4">
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 space-y-3">
              <div className="h-10 w-10 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center font-bold">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Indian Artistry</h3>
              <p className="text-sm text-stone-600">
                Designed and manufactured in Mumbai, India, our collections blend traditional leatherworking techniques with contemporary fashion silhouettes.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 space-y-3">
              <div className="h-10 w-10 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center font-bold">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Cruelty-Free Luxury</h3>
              <p className="text-sm text-stone-600">
                We utilize high-grade vegan leather and premium canvas materials that offer the touch and longevity of genuine leather with zero compromise on ethics.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="font-heading text-2xl font-bold text-stone-900">Our Commitment</h2>
            <p className="text-sm sm:text-base">
              Whether you're carrying a compact sling for a casual evening, a structured handbag for important board meetings, or a spacious duffel for weekend getaways, every stitch and zipper in a DELA bag is inspected for perfection.
            </p>
            <p className="text-sm sm:text-base">
              We stand behind every piece we create with a 7-day return policy and dedicated customer care directly available over WhatsApp and phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
