import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // Create Admin User
  const adminEmail = 'cielbags.service@gmail.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('saadansari9', 10);
    await prisma.user.create({
      data: {
        name: 'CIEL Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('Admin user created.');
  }

  // Create Categories
  const categoriesData = [
    { name: 'Ladies Handbags', slug: 'ladies-handbags', description: 'Elegant ladies handbags for all occasions.' },
    { name: 'Sling Bags', slug: 'sling-bags', description: 'Trendy sling bags for everyday use.' },
    { name: 'Shoulder Bags', slug: 'shoulder-bags', description: 'Comfortable and spacious shoulder bags.' },
    { name: 'Purses', slug: 'purses', description: 'Compact and stylish purses.' },
    { name: 'Tote Bags', slug: 'tote-bags', description: 'Large tote bags for your daily essentials.' },
    { name: 'Travel Bags', slug: 'travel-bags', description: 'Durable travel bags for your journeys.' },
    { name: 'Men\'s Bags', slug: 'mens-bags', description: 'Premium bags designed for men.' },
    { name: 'Unisex Bags', slug: 'unisex-bags', description: 'Versatile bags for everyone.' },
  ];

  const createdCategories = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories.push(category);
  }
  console.log('Categories created.');

  // Create Sample Products
  const productsData = [
    {
      name: 'Classic Leather Handbag',
      slug: 'classic-leather-handbag',
      description: 'A timeless classic leather handbag perfect for professional and casual settings.',
      price: 2499,
      originalPrice: 3499,
      sku: 'CB-LH-001',
      stock: 50,
      categorySlug: 'ladies-handbags',
      colors: ['Black', 'Brown'],
      sizes: ['Medium'],
      featured: true,
      bestseller: true,
      newArrival: false,
    },
    {
      name: 'Premium Women\'s Sling Bag',
      slug: 'premium-womens-sling-bag',
      description: 'Stylish sling bag made from premium vegan leather.',
      price: 1299,
      originalPrice: 1999,
      sku: 'CB-SB-001',
      stock: 100,
      categorySlug: 'sling-bags',
      colors: ['Tan', 'Black', 'Red'],
      sizes: ['Small'],
      featured: false,
      bestseller: true,
      newArrival: true,
    },
    {
      name: 'Minimal Shoulder Bag',
      slug: 'minimal-shoulder-bag',
      description: 'Clean and minimal shoulder bag for everyday elegance.',
      price: 1899,
      originalPrice: 2599,
      sku: 'CB-SH-001',
      stock: 30,
      categorySlug: 'shoulder-bags',
      colors: ['Beige', 'White'],
      sizes: ['Medium', 'Large'],
      featured: true,
      bestseller: false,
      newArrival: true,
    },
    {
      name: 'Everyday Tote Bag',
      slug: 'everyday-tote-bag',
      description: 'Spacious tote bag for carrying your world with you.',
      price: 1599,
      originalPrice: 2199,
      sku: 'CB-TB-001',
      stock: 80,
      categorySlug: 'tote-bags',
      colors: ['Navy Blue', 'Olive'],
      sizes: ['Large'],
      featured: false,
      bestseller: true,
      newArrival: false,
    },
    {
      name: 'Elegant Party Clutch',
      slug: 'elegant-party-clutch',
      description: 'Shimmering party clutch to elevate your evening look.',
      price: 999,
      originalPrice: 1499,
      sku: 'CB-PU-001',
      stock: 40,
      categorySlug: 'purses',
      colors: ['Gold', 'Silver', 'Black'],
      sizes: ['Small'],
      featured: true,
      bestseller: false,
      newArrival: true,
    },
    {
      name: 'Men\'s Crossbody Bag',
      slug: 'mens-crossbody-bag',
      description: 'Rugged and practical crossbody bag for men.',
      price: 1799,
      originalPrice: 2499,
      sku: 'CB-MB-001',
      stock: 60,
      categorySlug: 'mens-bags',
      colors: ['Black', 'Grey'],
      sizes: ['Medium'],
      featured: true,
      bestseller: true,
      newArrival: false,
    },
    {
      name: 'Premium Laptop Bag',
      slug: 'premium-laptop-bag',
      description: 'Sleek laptop bag with padded compartments.',
      price: 2999,
      originalPrice: 3999,
      sku: 'CB-MB-002',
      stock: 25,
      categorySlug: 'mens-bags',
      colors: ['Brown', 'Black'],
      sizes: ['15 inch', '13 inch'],
      featured: true,
      bestseller: true,
      newArrival: true,
    },
    {
      name: 'Travel Duffel Bag',
      slug: 'travel-duffel-bag',
      description: 'Spacious travel duffel bag for weekend getaways.',
      price: 3499,
      originalPrice: 4999,
      sku: 'CB-TR-001',
      stock: 20,
      categorySlug: 'travel-bags',
      colors: ['Olive Green', 'Navy'],
      sizes: ['Extra Large'],
      featured: true,
      bestseller: false,
      newArrival: true,
    },
    {
      name: 'Unisex Canvas Backpack',
      slug: 'unisex-canvas-backpack',
      description: 'Durable canvas backpack suitable for college and casual outings.',
      price: 1499,
      originalPrice: 2299,
      sku: 'CB-UB-001',
      stock: 75,
      categorySlug: 'unisex-bags',
      colors: ['Beige', 'Charcoal'],
      sizes: ['Medium', 'Large'],
      featured: false,
      bestseller: true,
      newArrival: false,
    }
  ];

  for (const prodData of productsData) {
    const category = createdCategories.find(c => c.slug === prodData.categorySlug);
    if (category) {
      const { categorySlug, ...data } = prodData;
      await prisma.product.upsert({
        where: { slug: data.slug },
        update: {},
        create: {
          ...data,
          categoryId: category.id,
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop', isDefault: true, alt: data.name },
            ]
          }
        },
      });
    }
  }
  console.log('Products created.');
  
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
