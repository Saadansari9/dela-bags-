'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/data/products';
import { useProductStore } from '@/store/useProductStore';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const productStore = useProductStore();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const rawProducts: Product[] = await res.json();
        // Filter out deleted IDs via persistent Zustand store
        const filtered = productStore.getFilteredProducts(rawProducts);
        setProducts(filtered);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);

      // 1. Call Backend API
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      // 2. Persist in Zustand local storage so it NEVER reappears on refresh
      productStore.deleteProduct(id);

      // 3. Remove from UI state
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage({ type: 'success', text: 'Product deleted permanently!' });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete product.' });
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground mt-1">
            {loading ? 'Loading catalog...' : `${products.length} products in your catalog.`}
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-black text-white hover:bg-neutral-800 rounded-none h-11 px-6 font-bold">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      {message && (
        <div
          className={`p-4 rounded border text-sm flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 bg-white border rounded-md">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
          <span className="ml-3 text-sm font-medium text-neutral-600">Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border rounded-md p-12 text-center">
          <p className="text-muted-foreground mb-4">No products found in catalog.</p>
          <Link href="/admin/products/new">
            <Button className="bg-black text-white rounded-none">Create First Product</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-md overflow-hidden shadow-xs">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50 text-neutral-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">SKU</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Stock</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Category</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-10 bg-neutral-100 rounded overflow-hidden relative shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          className="font-medium hover:underline line-clamp-1 text-black"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{product.sku}</td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="font-medium text-black">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-1">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock === 0
                          ? 'bg-red-100 text-red-800'
                          : product.stock <= 10
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {product.featured && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          FEATURED
                        </span>
                      )}
                      {product.bestseller && (
                        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          BESTSELLER
                        </span>
                      )}
                      {product.newArrival && (
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          NEW
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {confirmDeleteId === product.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          disabled={deletingId === product.id}
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs h-8 px-2.5 rounded-none font-bold"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            'Confirm Delete'
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs h-8 px-2 rounded-none"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-black">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setConfirmDeleteId(product.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
