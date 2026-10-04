// ============================================================
// CENTRAL PRODUCT DATA SOURCE
// ============================================================
// This file acts as the data layer for products.
// When you connect a PostgreSQL database, replace the exported
// functions below with Prisma queries (see comments).
// ============================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  sku: string;
  stock: number;
  categorySlug: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  images: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  rating: number;
  reviews: number;
  specifications?: Record<string, string>;
}

// ============================================================
// SAMPLE PRODUCTS — replace with Prisma DB calls when ready
// ============================================================
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Leather Handbag",
    slug: "classic-leather-handbag",
    description:
      "A timeless classic leather handbag perfect for professional and casual settings. Crafted with premium vegan leather, this spacious bag features multiple compartments to keep your essentials organized. The structured silhouette and polished gold hardware make it a versatile choice for any outfit.",
    price: 2499,
    originalPrice: 3499,
    sku: "CB-LH-001",
    stock: 50,
    categorySlug: "ladies-handbags",
    category: "Ladies Handbags",
    brand: "DELA BAGS",
    colors: ["Black", "Brown", "Tan"],
    sizes: ["Medium", "Large"],
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.8,
    reviews: 124,
    specifications: {
      Material: "Premium Vegan Leather",
      Dimensions: "30cm (W) x 24cm (H) x 12cm (D)",
      Weight: "0.6 kg",
      Closure: "Top Zip",
      Hardware: "Gold-tone",
      "Care Instructions": "Wipe with a damp cloth. Avoid prolonged exposure to water.",
    },
  },
  {
    id: "2",
    name: "Premium Women's Sling Bag",
    slug: "premium-womens-sling-bag",
    description:
      "Stylish sling bag made from premium vegan leather. Compact yet spacious enough for your daily essentials. Features an adjustable strap for cross-body or shoulder carry.",
    price: 1299,
    originalPrice: 1999,
    sku: "CB-SB-001",
    stock: 100,
    categorySlug: "sling-bags",
    category: "Sling Bags",
    brand: "DELA BAGS",
    colors: ["Tan", "Black", "Red"],
    sizes: ["Small"],
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: false,
    bestseller: true,
    newArrival: true,
    rating: 4.5,
    reviews: 89,
    specifications: {
      Material: "Vegan Leather",
      Dimensions: "22cm (W) x 16cm (H) x 6cm (D)",
      Weight: "0.3 kg",
      Strap: "Adjustable, removable",
      Closure: "Zip",
      "Care Instructions": "Wipe with a soft cloth.",
    },
  },
  {
    id: "3",
    name: "Minimal Shoulder Bag",
    slug: "minimal-shoulder-bag",
    description:
      "Clean and minimal shoulder bag for everyday elegance. Large enough for a laptop up to 13 inches, making it ideal for work and weekend outings alike.",
    price: 1899,
    originalPrice: 2599,
    sku: "CB-SH-001",
    stock: 30,
    categorySlug: "shoulder-bags",
    category: "Shoulder Bags",
    brand: "DELA BAGS",
    colors: ["Beige", "White", "Grey"],
    sizes: ["Medium", "Large"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.4,
    reviews: 45,
    specifications: {
      Material: "Canvas + Leather Trim",
      Dimensions: "35cm (W) x 28cm (H) x 10cm (D)",
      Weight: "0.5 kg",
      Closure: "Magnetic Snap",
      "Laptop Compartment": "Fits 13-inch laptop",
    },
  },
  {
    id: "4",
    name: "Everyday Tote Bag",
    slug: "everyday-tote-bag",
    description:
      "Spacious tote bag for carrying your world with you. Open top design with internal zip pocket for valuables. Perfect for shopping, beach trips, or as an office bag.",
    price: 1599,
    originalPrice: 2199,
    sku: "CB-TB-001",
    stock: 80,
    categorySlug: "tote-bags",
    category: "Tote Bags",
    brand: "DELA BAGS",
    colors: ["Navy Blue", "Olive", "Beige"],
    sizes: ["Large"],
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviews: 210,
    specifications: {
      Material: "Cotton Canvas",
      Dimensions: "40cm (W) x 35cm (H) x 12cm (D)",
      Weight: "0.4 kg",
      Handles: "Reinforced fabric handles",
      Closure: "Open top with internal zip pocket",
    },
  },
  {
    id: "5",
    name: "Elegant Party Clutch",
    slug: "elegant-party-clutch",
    description:
      "Shimmering party clutch to elevate your evening look. Compact design with a chain strap — can be worn as a clutch or crossbody.",
    price: 999,
    originalPrice: 1499,
    sku: "CB-PU-001",
    stock: 40,
    categorySlug: "purses",
    category: "Purses",
    brand: "DELA BAGS",
    colors: ["Gold", "Silver", "Black"],
    sizes: ["Small"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.6,
    reviews: 62,
    specifications: {
      Material: "Metallic Faux Leather",
      Dimensions: "20cm (W) x 12cm (H) x 4cm (D)",
      Strap: "Detachable gold chain, 120cm",
      Closure: "Snap button",
    },
  },
  {
    id: "6",
    name: "Men's Crossbody Bag",
    slug: "mens-crossbody-bag",
    description:
      "Rugged and practical crossbody bag for men. Multiple pockets keep your phone, wallet and essentials organized for daily commutes or travel.",
    price: 1799,
    originalPrice: 2499,
    sku: "CB-MB-001",
    stock: 60,
    categorySlug: "mens-bags",
    category: "Men's Bags",
    brand: "DELA BAGS",
    colors: ["Black", "Grey", "Khaki"],
    sizes: ["Medium"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.6,
    reviews: 75,
    specifications: {
      Material: "Ballistic Nylon",
      Dimensions: "25cm (W) x 20cm (H) x 8cm (D)",
      Weight: "0.45 kg",
      Pockets: "1 main + 2 front + 1 back",
      Strap: "Adjustable padded strap",
    },
  },
  {
    id: "7",
    name: "Premium Laptop Bag",
    slug: "premium-laptop-bag",
    description:
      "Sleek laptop bag with padded compartments. Professional look with the ability to carry a 15.6-inch laptop. Water-resistant material keeps your devices safe.",
    price: 2999,
    originalPrice: 3999,
    sku: "CB-MB-002",
    stock: 25,
    categorySlug: "mens-bags",
    category: "Men's Bags",
    brand: "DELA BAGS",
    colors: ["Brown", "Black"],
    sizes: ["15 inch", "13 inch"],
    images: [
      "https://images.unsplash.com/photo-1553531384-411a4ff74811?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: true,
    bestseller: true,
    newArrival: true,
    rating: 4.7,
    reviews: 98,
    specifications: {
      Material: "Water-resistant Polyester",
      Dimensions: "40cm (W) x 30cm (H) x 10cm (D)",
      "Laptop Compartment": "Fits up to 15.6 inch",
      Weight: "0.7 kg",
      Pockets: "Padded laptop sleeve + 3 organizer pockets",
    },
  },
  {
    id: "8",
    name: "Travel Duffel Bag",
    slug: "travel-duffel-bag",
    description:
      "Spacious travel duffel bag for weekend getaways. Large main compartment with a padded shoe compartment and wet pocket. Carry-on size compliant with most airlines.",
    price: 3499,
    originalPrice: 4999,
    sku: "CB-TR-001",
    stock: 20,
    categorySlug: "travel-bags",
    category: "Travel Bags",
    brand: "DELA BAGS",
    colors: ["Olive Green", "Navy", "Black"],
    sizes: ["Extra Large"],
    images: [
      "https://images.unsplash.com/photo-1553531384-411a4ff74811?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.7,
    reviews: 112,
    specifications: {
      Material: "Water-resistant Polyester",
      Dimensions: "55cm (L) x 28cm (W) x 28cm (H)",
      Capacity: "50 litres",
      Weight: "0.9 kg",
      Pockets: "Main + shoe compartment + 2 side pockets",
    },
  },
  {
    id: "9",
    name: "Unisex Canvas Backpack",
    slug: "unisex-canvas-backpack",
    description:
      "Durable canvas backpack suitable for college and casual outings. Fits a 15-inch laptop. Adjustable padded shoulder straps for comfortable all-day wear.",
    price: 1499,
    originalPrice: 2299,
    sku: "CB-UB-001",
    stock: 75,
    categorySlug: "unisex-bags",
    category: "Unisex Bags",
    brand: "DELA BAGS",
    colors: ["Beige", "Charcoal", "Olive"],
    sizes: ["Medium", "Large"],
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.3,
    reviews: 187,
    specifications: {
      Material: "Heavy-duty Canvas",
      Dimensions: "30cm (W) x 45cm (H) x 15cm (D)",
      Capacity: "25 litres",
      "Laptop Compartment": "Fits 15-inch laptop",
      Weight: "0.55 kg",
    },
  },
];

// ============================================================
// DATA ACCESS FUNCTIONS — swap these for Prisma when ready
// ============================================================

/** Get all products */
export async function getAllProducts(): Promise<Product[]> {
  // TODO: Replace with → return prisma.product.findMany({ include: { images: true, category: true } });
  return PRODUCTS;
}

/** Get a single product by slug */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  // TODO: Replace with → return prisma.product.findUnique({ where: { slug }, include: { images: true, category: true } });
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

/** Get featured products */
export async function getFeaturedProducts(): Promise<Product[]> {
  // TODO: Replace with → return prisma.product.findMany({ where: { featured: true } });
  return PRODUCTS.filter((p) => p.featured);
}

/** Get bestseller products */
export async function getBestsellers(): Promise<Product[]> {
  // TODO: Replace with → return prisma.product.findMany({ where: { bestseller: true } });
  return PRODUCTS.filter((p) => p.bestseller);
}

/** Get new arrivals */
export async function getNewArrivals(): Promise<Product[]> {
  // TODO: Replace with → return prisma.product.findMany({ where: { newArrival: true } });
  return PRODUCTS.filter((p) => p.newArrival);
}

/** Get products by category */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  // TODO: Replace with → return prisma.product.findMany({ where: { category: { slug: categorySlug } } });
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export const CATEGORIES = [
  { name: "Ladies Handbags", slug: "ladies-handbags" },
  { name: "Sling Bags", slug: "sling-bags" },
  { name: "Shoulder Bags", slug: "shoulder-bags" },
  { name: "Purses", slug: "purses" },
  { name: "Tote Bags", slug: "tote-bags" },
  { name: "Travel Bags", slug: "travel-bags" },
  { name: "Men's Bags", slug: "mens-bags" },
  { name: "Unisex Bags", slug: "unisex-bags" },
];
