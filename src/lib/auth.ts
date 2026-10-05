import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'delabags.service@gmail.com';
const ADMIN_EMAIL_ALT = 'cielbags.service@gmail.com';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const emailLower = credentials.email.toLowerCase().trim();

        // 1. Check Admin Login
        if (emailLower === ADMIN_EMAIL || emailLower === ADMIN_EMAIL_ALT) {
          const isPassValid =
            credentials.password === 'saadansari9' ||
            (credentials.password &&
              (await bcrypt.compare(
                credentials.password,
                '$2b$10$Brt8c22nSbAeLZw07fxuG.WC7aRUpJxX7XH5e8eVaJ3d8Ctdh/zlS'
              )));

          if (isPassValid) {
            return {
              id: 'admin-1',
              name: 'DELA ADMIN',
              email: credentials.email,
              role: 'ADMIN',
            };
          }
        }

        // 2. Customer Email Login
        const rawName = emailLower.split('@')[0].replace(/[._-]/g, ' ');
        const formattedName = rawName.replace(/\b\w/g, (char) => char.toUpperCase());

        return {
          id: `user-${emailLower}`,
          name: formattedName || 'Customer',
          email: credentials.email,
          role: 'CUSTOMER',
        };
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
