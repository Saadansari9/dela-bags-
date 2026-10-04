import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    // TODO: Check if user exists in DB:
    // const existing = await prisma.user.findUnique({ where: { email } });
    // if (existing) return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Save user to DB:
    // await prisma.user.create({ data: { name, email, password: hashedPassword, role: 'CUSTOMER' } });
    console.log('New user registered:', { name, email, hashedPassword });

    return NextResponse.json({ message: 'Account created successfully. Please log in.' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
