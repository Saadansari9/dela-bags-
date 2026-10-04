import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/data/products";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground mt-1">{products.length} products in your catalog.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-black text-white hover:bg-neutral-800">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white border rounded-md overflow-hidden">
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
              <tr key={product.id} className="hover:bg-neutral-50">
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
                      <Link href={`/product/${product.slug}`} target="_blank" className="font-medium hover:underline line-clamp-1">
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{product.sku}</td>
                <td className="px-6 py-4">
                  <div>
                    <span className="font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through ml-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock === 0
                      ? 'bg-red-100 text-red-800'
                      : product.stock <= 10
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">{product.category}</td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {product.featured && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">FEATURED</span>}
                    {product.bestseller && <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded">BESTSELLER</span>}
                    {product.newArrival && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-black">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
