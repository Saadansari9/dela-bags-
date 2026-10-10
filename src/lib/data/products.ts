// ============================================================
// CENTRAL PRODUCT DATA SOURCE
// ============================================================

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

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
// HIGH-FASHION MODEL PHOTOSHOOT IMAGE PRESETS
// ============================================================
export const MODEL_PHOTOSHOOT_PRESETS = [
  {
    title: "Women's Leather Handbag Shoot",
    category: "Ladies Handbags",
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Women's Sling & Crossbody Shoot",
    category: "Sling Bags",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Everyday Tote Bag Model Shoot",
    category: "Tote Bags",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Men's Leather Crossbody Shoot",
    category: "Men's Bags",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Executive Laptop & Duffel Shoot",
    category: "Travel Bags",
    images: [
      "https://images.unsplash.com/photo-1553531384-411a4ff74811?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

// ============================================================
// SAMPLE PRODUCTS (All updated with High-Fashion Model Photoshoot Images)
// ============================================================
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Leather Handbag",
    slug: "classic-leather-handbag",
    description:
      "A timeless classic leather handbag crafted for modern Indian women. Features high-fashion model photoshoot styling, gold anti-tarnish zippers, and spacious organized compartments.",
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
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "Studio & Outdoor Model Shoot",
    },
  },
  {
    id: "2",
    name: "Premium Women's Sling Bag",
    slug: "premium-womens-sling-bag",
    description:
      "Chic crossbody sling bag captured in high-fashion urban model photoshoots. Light, comfortable, and perfect for day-to-night styling.",
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
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "Urban Street Fashion Model Shoot",
    },
  },
  {
    id: "3",
    name: "Minimal Shoulder Bag",
    slug: "minimal-shoulder-bag",
    description:
      "Clean minimal shoulder bag photographed with professional fashion models. Holds up to a 13-inch laptop and daily makeup essentials.",
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
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "Minimalist Lifestyle Model Shoot",
    },
  },
  {
    id: "4",
    name: "Everyday Tote Bag",
    slug: "everyday-tote-bag",
    description:
      "Spacious cotton canvas tote featured in summer street style model photoshoots. Designed for work, coffee dates, and shopping trips.",
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
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "Summer Tote Model Shoot",
    },
  },
  {
    id: "5",
    name: "Elegant Party Clutch",
    slug: "elegant-party-clutch",
    description:
      "Shimmering party clutch with metallic gold chain strap. Photographed in evening glam model photoshoots.",
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
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "Evening Glam Party Model Shoot",
    },
  },
  {
    id: "6",
    name: "Men's Crossbody Bag",
    slug: "mens-crossbody-bag",
    description:
      "Rugged and stylish men's crossbody bag featured in male executive model photoshoots. Designed with ballistic nylon & leather accents.",
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
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "Male Executive Model Shoot",
    },
  },
  {
    id: "7",
    name: "Premium Laptop Bag",
    slug: "premium-laptop-bag",
    description:
      "Professional laptop bag for business executives. Photographed with male models in executive office photoshoots.",
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
      "https://images.unsplash.com/photo-1553531384-411a4ff74811?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "Corporate Model Shoot",
    },
  },
  {
    id: "8",
    name: "Travel Duffel Bag",
    slug: "travel-duffel-bag",
    description:
      "Spacious travel duffel bag featured in airport jetset model photoshoots. Includes shoe compartment & padded shoulder strap.",
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
      "https://images.unsplash.com/photo-1553531384-411a4ff74811?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "Airport Travel Model Shoot",
    },
  },
  {
    id: "9",
    name: "Unisex Canvas Backpack",
    slug: "unisex-canvas-backpack",
    description:
      "Durable canvas backpack suitable for college & casual travel. Photographed in outdoor street style model shoots.",
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
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
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
      "Photoshoot Style": "College Street Model Shoot",
    },
  },
];

// ============================================================
// DATA ACCESS FUNCTIONS
// ============================================================

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.featured);
}

export async function getBestsellers(): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.bestseller);
}

export async function getNewArrivals(): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.newArrival);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const index = PRODUCTS.findIndex((p) => p.id === id);
  if (index !== -1) {
    PRODUCTS.splice(index, 1);
    return true;
  }
  return false;
}

export async function addProduct(productData: Partial<Product>): Promise<Product> {
  const categoryObj = CATEGORIES.find((c) => c.slug === productData.categorySlug);
  const newProduct: Product = {
    id: `prod_${Date.now()}`,
    name: productData.name || 'New Bag',
    slug: productData.slug || `new-bag-${Date.now()}`,
    description: productData.description || '',
    price: Number(productData.price) || 0,
    originalPrice: productData.originalPrice ? Number(productData.originalPrice) : undefined,
    sku: productData.sku || `SKU-${Date.now()}`,
    stock: Number(productData.stock) || 0,
    categorySlug: productData.categorySlug || 'ladies-handbags',
    category: categoryObj ? categoryObj.name : 'Ladies Handbags',
    brand: productData.brand || 'DELA BAGS',
    colors: productData.colors && productData.colors.length > 0 ? productData.colors : ['Black'],
    sizes: productData.sizes && productData.sizes.length > 0 ? productData.sizes : ['Medium'],
    images: productData.images && productData.images.length > 0 ? productData.images : ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop'],
    featured: productData.featured || false,
    bestseller: productData.bestseller || false,
    newArrival: productData.newArrival ?? true,
    rating: 5.0,
    reviews: 0,
  };
  PRODUCTS.unshift(newProduct);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const index = PRODUCTS.findIndex((p) => p.id === id);
  if (index === -1) return null;
  PRODUCTS[index] = { ...PRODUCTS[index], ...updates };
  return PRODUCTS[index];
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
