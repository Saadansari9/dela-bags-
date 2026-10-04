'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, Plus, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    sku: '',
    stock: '',
    categorySlug: '',
    brand: 'DELA BAGS',
    colors: [] as string[],
    sizes: [] as string[],
    images: [''],
    featured: false,
    bestseller: false,
    newArrival: true,
  });

  const [colorInput, setColorInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addColor = () => {
    if (colorInput.trim() && !form.colors.includes(colorInput.trim())) {
      setForm((prev) => ({ ...prev, colors: [...prev.colors, colorInput.trim()] }));
      setColorInput('');
    }
  };

  const addSize = () => {
    if (sizeInput.trim() && !form.sizes.includes(sizeInput.trim())) {
      setForm((prev) => ({ ...prev, sizes: [...prev.sizes, sizeInput.trim()] }));
      setSizeInput('');
    }
  };

  const updateImage = (index: number, value: string) => {
    const imgs = [...form.images];
    imgs[index] = value;
    setForm((prev) => ({ ...prev, images: imgs }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.price || !form.sku || !form.stock || !form.categorySlug) {
      setError('Please fill in all required fields.');
      return;
    }

    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      ...form,
      slug,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      stock: parseInt(form.stock),
      images: form.images.filter(Boolean),
    };

    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => router.push('/admin/products'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold">Product Saved!</h2>
        <p className="text-muted-foreground">Redirecting to products list...</p>
        <p className="text-xs text-muted-foreground mt-2">Note: Connect a PostgreSQL database to persist products permanently.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
        <p className="text-muted-foreground mt-1">Fill in the product details below.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white border rounded-md p-6 space-y-4">
          <h3 className="font-bold text-lg border-b pb-3">Basic Information</h3>
          <div className="space-y-1">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Classic Leather Handbag" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Describe the product..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="sku">SKU *</Label>
              <Input id="sku" name="sku" value={form.sku} onChange={handleChange} placeholder="CB-LH-001" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" name="brand" value={form.brand} onChange={handleChange} placeholder="DELA BAGS" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="categorySlug">Category *</Label>
            <select
              id="categorySlug"
              name="categorySlug"
              value={form.categorySlug}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white border rounded-md p-6 space-y-4">
          <h3 className="font-bold text-lg border-b pb-3">Pricing & Stock</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="price">Selling Price (₹) *</Label>
              <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} placeholder="2499" min="0" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="originalPrice">Original / MRP (₹)</Label>
              <Input id="originalPrice" name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} placeholder="3499" min="0" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input id="stock" name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="50" min="0" required />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white border rounded-md p-6 space-y-4">
          <h3 className="font-bold text-lg border-b pb-3">Product Images</h3>
          <p className="text-sm text-muted-foreground">Enter image URLs (Unsplash, your CDN, etc.)</p>
          {form.images.map((img, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={img}
                onChange={(e) => updateImage(i, e.target.value)}
                placeholder={`Image ${i + 1} URL (https://...)`}
              />
              {form.images.length > 1 && (
                <Button type="button" variant="outline" size="icon" onClick={() => setForm((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => setForm((prev) => ({ ...prev, images: [...prev.images, ''] }))}>
            <Plus className="mr-2 h-4 w-4" /> Add Another Image
          </Button>
        </div>

        {/* Variants */}
        <div className="bg-white border rounded-md p-6 space-y-6">
          <h3 className="font-bold text-lg border-b pb-3">Variants</h3>
          {/* Colors */}
          <div>
            <Label>Colors</Label>
            <div className="flex gap-2 mt-2 flex-wrap mb-3">
              {form.colors.map((c) => (
                <span key={c} className="flex items-center gap-1 bg-neutral-100 px-3 py-1 text-sm rounded-full">
                  {c}
                  <button type="button" onClick={() => setForm((prev) => ({ ...prev, colors: prev.colors.filter((x) => x !== c) }))}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={colorInput} onChange={(e) => setColorInput(e.target.value)} placeholder="e.g. Black" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())} />
              <Button type="button" variant="outline" onClick={addColor}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
          {/* Sizes */}
          <div>
            <Label>Sizes</Label>
            <div className="flex gap-2 mt-2 flex-wrap mb-3">
              {form.sizes.map((s) => (
                <span key={s} className="flex items-center gap-1 bg-neutral-100 px-3 py-1 text-sm rounded-full">
                  {s}
                  <button type="button" onClick={() => setForm((prev) => ({ ...prev, sizes: prev.sizes.filter((x) => x !== s) }))}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} placeholder="e.g. Medium" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())} />
              <Button type="button" variant="outline" onClick={addSize}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        {/* Flags */}
        <div className="bg-white border rounded-md p-6">
          <h3 className="font-bold text-lg border-b pb-3 mb-4">Product Flags</h3>
          <div className="flex flex-wrap gap-6">
            {[
              { name: 'featured', label: 'Featured on Home Page' },
              { name: 'bestseller', label: 'Mark as Bestseller' },
              { name: 'newArrival', label: 'Mark as New Arrival' },
            ].map(({ name, label }) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name as 'featured' | 'bestseller' | 'newArrival']}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-8 font-bold">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'SAVE PRODUCT'}
          </Button>
          <Button type="button" variant="outline" className="rounded-none h-12 px-8" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
