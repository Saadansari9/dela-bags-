import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/data/products';

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
    // TODO: Save to Prisma when DB is connected:
    // await prisma.product.create({ data: { ...data, images: { create: data.images.map((url: string) => ({ url })) } } });
    console.log('New product submitted:', data);
    return NextResponse.json(
      { message: 'Product received. Connect a PostgreSQL database to persist permanently.', data },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Failed to save product.' }, { status: 500 });
  }
}
