import { NextResponse } from 'next/server';
import { getAllProducts, addProduct, deleteProduct } from '@/lib/data/products';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newProd = await addProduct(data);
    return NextResponse.json(
      { message: 'Product added successfully!', product: newProd },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Failed to save product.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 });
    }

    const success = await deleteProduct(id);
    if (!success) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully.' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
  }
}
