# DELA BAGS - E-Commerce Website

This is a complete, modern, responsive e-commerce website built for **DELA BAGS**, a premium bag brand. It features a complete customer-facing storefront and a comprehensive Admin dashboard.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Language:** TypeScript
- **State Management:** Zustand (Cart & Wishlist)
- **Database ORM:** Prisma
- **Database:** PostgreSQL (Designed for it, easily deployable on Vercel Postgres / Supabase)
- **Authentication:** NextAuth.js (Placeholder setup)
- **Payments:** Razorpay integration architecture

## Installation & Setup

1. **Clone & Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Rename `.env.example` to `.env` and fill in your credentials.

3. **Database Setup (Prisma & PostgreSQL)**
   The project uses Prisma as an ORM. You need a PostgreSQL database to run this application completely with dynamic data. 
   If you don't have a local Postgres instance, you can use Vercel Postgres or Supabase.

   Once you have your `DATABASE_URL` in the `.env` file:
   ```bash
   # Push schema to database
   npx prisma db push

   # Seed the database with sample products and categories
   npm run prisma:seed
   ```
   *(Note: The UI currently uses mock data in the components to ensure the UI can be previewed without a database connection. Once connected, replace the mock arrays with Prisma fetch calls in Server Components).*

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Admin Login Setup

The `prisma:seed` script automatically creates an admin user with the following credentials:
- **Email:** admin@DELAbags.com
- **Password:** password123

Use these credentials on the `/login` page to access `/admin` (Authentication logic needs to be fully wired up with NextAuth in the middleware).

## Razorpay Configuration

To enable payments:
1. Create a Razorpay account and get your `KEY_ID` and `KEY_SECRET`.
2. Add them to the `.env` file.
3. The checkout page `/checkout` currently has a mock implementation. You will need to create a Next.js API route to generate a Razorpay order, and then use the Razorpay script on the frontend to capture the payment.

## Deployment Instructions (Vercel)

1. Push this code to a GitHub repository.
2. Go to Vercel and import the repository.
3. In the Vercel dashboard, add all the environment variables from your `.env` file.
4. (Optional) Use Vercel Postgres to instantly provision a database and link it to the project.
5. In the Build Command, Vercel will automatically run `npm run build`. Ensure your `package.json` has `"postinstall": "prisma generate"`.
6. Deploy!

## Project Structure

- `/src/app/(store)`: All customer-facing pages (Home, Shop, Product Details, Cart, Checkout).
- `/src/app/admin`: The Admin Dashboard and its sub-pages.
- `/src/components`: Reusable UI components (Shadcn UI) and Layout components (Header, Footer).
- `/src/store`: Zustand stores for Cart and Wishlist state.
- `/prisma`: Database schema and seed scripts.
