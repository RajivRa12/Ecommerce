import { Product, Category, User, Order, Review } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 16999,
    originalPrice: 20999,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'electronics',
    subcategory: 'audio',
    brand: 'AudioTech',
    stock: 25,
    rating: 4.5,
    reviewCount: 128,
    features: ['Noise Cancelling', '30h Battery', 'Quick Charge', 'Bluetooth 5.0'],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours'
    },
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    featured: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitor, GPS, and sleep tracking.',
    price: 24999,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop'
    ],
    category: 'electronics',
    subcategory: 'wearables',
    brand: 'FitLife',
    stock: 15,
    rating: 4.3,
    reviewCount: 85,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Sleep Analysis', 'Water Resistant'],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'GPS': 'Built-in'
    },
    tags: ['smartwatch', 'fitness', 'health'],
    featured: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'Eco-Friendly Water Bottle',
    description: 'Sustainable stainless steel water bottle that keeps drinks cold for 24h or hot for 12h.',
    price: 2999,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'
    ],
    category: 'lifestyle',
    subcategory: 'drinkware',
    brand: 'EcoFlow',
    stock: 50,
    rating: 4.7,
    reviewCount: 234,
    features: ['Double Wall Insulation', 'Leak Proof', 'BPA Free', 'Dishwasher Safe'],
    specifications: {
      'Material': 'Stainless Steel',
      'Capacity': '500ml',
      'Hot Retention': '12 hours',
      'Cold Retention': '24 hours'
    },
    tags: ['eco-friendly', 'water-bottle', 'insulated'],
    featured: false,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic office chair with lumbar support and adjustable height.',
    price: 37999,
    originalPrice: 49999,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=500&fit=crop'
    ],
    category: 'furniture',
    subcategory: 'office',
    brand: 'ComfortPro',
    stock: 8,
    rating: 4.6,
    reviewCount: 67,
    features: ['Lumbar Support', 'Height Adjustable', 'Breathable Mesh', '360° Swivel'],
    specifications: {
      'Weight Capacity': '300 lbs',
      'Height Range': '17" - 21"',
      'Material': 'Mesh & Fabric',
      'Warranty': '5 years'
    },
    tags: ['office', 'ergonomic', 'chair'],
    featured: true,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: '5',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, comfortable organic cotton t-shirt available in multiple colors.',
    price: 2499,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop'
    ],
    category: 'clothing',
    subcategory: 'mens',
    brand: 'EcoWear',
    stock: 100,
    rating: 4.4,
    reviewCount: 156,
    features: ['100% Organic Cotton', 'Pre-shrunk', 'Tag-free', 'Machine Washable'],
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Regular',
      'Care': 'Machine wash cold',
      'Origin': 'Made in USA'
    },
    tags: ['organic', 't-shirt', 'cotton'],
    featured: false,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z'
  },
  {
    id: '6',
    name: 'Professional Coffee Maker',
    description: 'Premium drip coffee maker with programmable timer and thermal carafe.',
    price: 12499,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1442479750209-8b73de5a50df?w=500&h=500&fit=crop'
    ],
    category: 'appliances',
    subcategory: 'kitchen',
    brand: 'BrewMaster',
    stock: 20,
    rating: 4.2,
    reviewCount: 89,
    features: ['Programmable Timer', 'Thermal Carafe', 'Auto Shut-off', 'Water Filter'],
    specifications: {
      'Capacity': '10 cups',
      'Power': '900W',
      'Carafe Type': 'Thermal Stainless Steel',
      'Timer': '24-hour programmable'
    },
    tags: ['coffee', 'appliance', 'kitchen'],
    featured: false,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest technology and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    subcategories: [
      { id: '1-1', name: 'Audio', slug: 'audio', description: 'Headphones, speakers, and audio equipment' },
      { id: '1-2', name: 'Wearables', slug: 'wearables', description: 'Smartwatches and fitness trackers' },
      { id: '1-3', name: 'Computers', slug: 'computers', description: 'Laptops, desktops, and accessories' }
    ]
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion for everyone',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    subcategories: [
      { id: '2-1', name: 'Mens', slug: 'mens', description: 'Men\'s clothing and accessories' },
      { id: '2-2', name: 'Womens', slug: 'womens', description: 'Women\'s clothing and accessories' },
      { id: '2-3', name: 'Kids', slug: 'kids', description: 'Children\'s clothing' }
    ]
  },
  {
    id: '3',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Home and office furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    subcategories: [
      { id: '3-1', name: 'Office', slug: 'office', description: 'Office chairs, desks, and storage' },
      { id: '3-2', name: 'Living Room', slug: 'living-room', description: 'Sofas, tables, and entertainment units' },
      { id: '3-3', name: 'Bedroom', slug: 'bedroom', description: 'Beds, dressers, and nightstands' }
    ]
  },
  {
    id: '4',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Products for everyday living',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    subcategories: [
      { id: '4-1', name: 'Drinkware', slug: 'drinkware', description: 'Bottles, mugs, and cups' },
      { id: '4-2', name: 'Sports', slug: 'sports', description: 'Sports and fitness equipment' },
      { id: '4-3', name: 'Travel', slug: 'travel', description: 'Luggage and travel accessories' }
    ]
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@ecommerce.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    addresses: [
      {
        id: '1',
        name: 'Home',
        street: '123 Admin Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
        isDefault: true
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    addresses: [
      {
        id: '2',
        name: 'Home',
        street: '456 Customer Lane',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
        isDefault: true
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '2',
    userName: 'John D.',
    rating: 5,
    title: 'Amazing sound quality!',
    comment: 'These headphones exceeded my expectations. The noise cancellation is fantastic.',
    helpful: 12,
    verified: true,
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '2',
    productId: '1',
    userId: '3',
    userName: 'Sarah M.',
    rating: 4,
    title: 'Great value for money',
    comment: 'Comfortable to wear for long periods. Battery life is as advertised.',
    helpful: 8,
    verified: true,
    createdAt: '2024-01-18T00:00:00Z'
  }
];

export const getFeaturedProducts = () => mockProducts.filter(p => p.featured);
export const getProductsByCategory = (category: string) => mockProducts.filter(p => p.category === category);
export const getProductById = (id: string) => mockProducts.find(p => p.id === id);
export const getReviewsByProductId = (productId: string) => mockReviews.filter(r => r.productId === productId);
