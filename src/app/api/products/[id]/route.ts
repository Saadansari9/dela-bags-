import { NextResponse } from 'next/server';
import { deleteProduct, updateProduct, PRODUCTS } from '@/lib/data/products';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateProduct(id, body);
    if (!updated) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    return NextResponse.json({ message: 'Product updated successfully.', product: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await deleteProduct(id);
    if (!success) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully.' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
  }
}
