import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// In-memory user store — replace with Prisma when DB is connected:
// import { prisma } from '@/lib/prisma';
const USERS: {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
}[] = [
  {
    id: '1',
    name: 'DELA ADMIN',
    email: 'DELAbags.service@gmail.com',
    // bcrypt hash of 'saadansari9'
    password: '$2b$10$Brt8c22nSbAeLZw07fxuG.WC7aRUpJxX7XH5e8eVaJ3d8Ctdh/zlS',
    role: 'ADMIN',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // TODO: Replace with Prisma lookup:
        // const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        const user = USERS.find((u) => u.email === credentials.email);
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || 'CUSTOMER';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string; id?: string }).role = (token.role as string) || 'CUSTOMER';
        (session.user as { role?: string; id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'DELA-bags-secret-key-change-in-production',
};
