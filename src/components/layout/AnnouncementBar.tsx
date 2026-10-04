export default function AnnouncementBar() {
  return (
    <div className="bg-stone-950 text-stone-200 border-b border-amber-900/30 text-xs md:text-sm font-medium py-2.5 text-center tracking-widest uppercase">
      <div className="container mx-auto px-4 flex justify-center items-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>Free Shipping Across India &bull; Express Delivery &bull; Premium Quality Bags</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse hidden md:inline-block" />
      </div>
    </div>
  );
}
