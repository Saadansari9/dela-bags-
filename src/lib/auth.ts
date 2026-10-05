import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

const USERS: {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
  image?: string;
}[] = [
  {
    id: '1',
    name: 'DELA ADMIN',
    email: 'DELAbags.service@gmail.com',
    password: '$2b$10$Brt8c22nSbAeLZw07fxuG.WC7aRUpJxX7XH5e8eVaJ3d8Ctdh/zlS',
    role: 'ADMIN',
  },
  {
    id: 'google-user',
    name: 'Google User',
    email: 'user.google@gmail.com',
    password: '$2b$10$Brt8c22nSbAeLZw07fxuG.WC7aRUpJxX7XH5e8eVaJ3d8Ctdh/zlS',
    role: 'CUSTOMER',
    image: 'https://lh3.googleusercontent.com/a/default-user',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = USERS.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role, image: user.image };
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
