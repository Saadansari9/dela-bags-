'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Check, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: 'Classic Leather Handbag',
    slug: 'classic-leather-handbag',
    price: 2499,
    originalPrice: 3499,
    stock: 50,
    category: 'Ladies Handbags',
    description: 'A timeless classic leather handbag perfect for professional and casual settings. Crafted with premium vegan leather.',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    bestseller: true,
    newArrival: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/admin/products" className="text-xs font-semibold text-muted-foreground hover:text-black flex items-center gap-1 mb-2">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Products List
          </Link>
          <h1 className="font-heading text-2xl font-bold">Edit Product #{id}</h1>
        </div>

        <Button onClick={handleSave} disabled={loading} className="bg-black text-white rounded-none gap-2 font-bold">
          {loading ? <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="h-4 w-4" />}
          SAVE CHANGES
        </Button>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-sm font-medium flex items-center gap-2">
          <Check className="h-4 w-4" /> Product updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full h-10 border bg-white px-3 text-sm rounded-none focus:outline-none"
            >
              <option value="Ladies Handbags">Ladies Handbags</option>
              <option value="Sling Bags">Sling Bags</option>
              <option value="Shoulder Bags">Shoulder Bags</option>
              <option value="Purses">Purses</option>
              <option value="Tote Bags">Tote Bags</option>
              <option value="Travel Bags">Travel Bags</option>
              <option value="Men's Bags">Men's Bags</option>
              <option value="Unisex Bags">Unisex Bags</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Selling Price (₹)</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Original Price (₹) (MRP)</Label>
            <Input
              type="number"
              value={form.originalPrice}
              onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label>Stock Quantity</Label>
            <Input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Primary Image URL</Label>
            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-3 text-sm focus:outline-none rounded-none"
          />
        </div>

        {/* Toggles */}
        <div className="border-t pt-4 grid grid-cols-3 gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="accent-black h-4 w-4"
            />
            <span>Featured Product</span>
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={form.bestseller}
              onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
              className="accent-black h-4 w-4"
            />
            <span>Bestseller</span>
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={form.newArrival}
              onChange={(e) => setForm({ ...form, newArrival: e.target.checked })}
              className="accent-black h-4 w-4"
            />
            <span>New Arrival</span>
          </label>
        </div>
      </form>
    </div>
  );
}
