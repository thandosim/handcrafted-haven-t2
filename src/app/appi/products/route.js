import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      _id: "64a1b2c3d4e5f6789012345a",
      sellerId: "seller_001",
      title: "Handwoven Bohemian Macrame Wall Hanging",
      slug: "handwoven-bohemian-macrame-wall-hanging",
      description:
        "Beautiful handwoven macrame wall hanging featuring intricate knotwork and natural cotton cord. Perfect for adding a bohemian touch to any room. Each piece is unique and crafted with love.",
      materials: ["Cotton cord", "Wooden dowel", "Natural fibers"],
      category: "Home Decor",
      tags: ["macrame", "bohemian", "wall art", "handwoven", "natural"],
      price: 45.99,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Bohemian macrame wall hanging in natural cotton",
        },
        {
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Close-up of intricate macrame knotwork",
        },
      ],
      stock: 12,
      variants: [
        {
          name: "Size",
          options: ['Small (18")', 'Medium (24")', 'Large (30")'],
        },
      ],
      status: "active",
      ratingAvg: 4.7,
      ratingCount: 23,
      createdAt: "2024-01-15T10:30:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345b",
      sellerId: "seller_002",
      title: "Artisan Ceramic Coffee Mug Set",
      slug: "artisan-ceramic-coffee-mug-set",
      description:
        "Set of 2 handcrafted ceramic coffee mugs with unique glazed finish. Each mug holds 12oz and features a comfortable handle. Dishwasher and microwave safe.",
      materials: ["Stoneware clay", "Lead-free glaze", "Food-safe finish"],
      category: "Kitchenware",
      tags: ["ceramic", "coffee mug", "handmade", "pottery", "gift set"],
      price: 32.5,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Set of 2 handcrafted ceramic coffee mugs",
        },
        {
          url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Close-up showing glazed finish detail",
        },
      ],
      stock: 8,
      variants: [
        {
          name: "Color",
          options: [
            "Ocean Blue",
            "Forest Green",
            "Sunset Orange",
            "Charcoal Gray",
          ],
        },
      ],
      status: "active",
      ratingAvg: 4.9,
      ratingCount: 41,
      createdAt: "2024-02-03T14:22:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345c",
      sellerId: "seller_003",
      title: "Hand-Knitted Wool Infinity Scarf",
      slug: "hand-knitted-wool-infinity-scarf",
      description:
        "Cozy infinity scarf hand-knitted from 100% merino wool. Features a beautiful cable knit pattern and is incredibly soft and warm. Perfect for cold weather styling.",
      materials: ["100% Merino wool", "Natural dyes"],
      category: "Fashion",
      tags: ["knitted", "scarf", "wool", "winter", "handmade", "cable knit"],
      price: 68.0,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Hand-knitted wool infinity scarf in cream color",
        },
        {
          url: "https://images.unsplash.com/photo-1578320339911-e86b173c23b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Cable knit pattern detail",
        },
      ],
      stock: 5,
      variants: [
        {
          name: "Color",
          options: ["Cream", "Charcoal", "Burgundy", "Navy Blue"],
        },
      ],
      status: "active",
      ratingAvg: 4.6,
      ratingCount: 18,
      createdAt: "2024-01-28T09:15:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345d",
      sellerId: "seller_004",
      title: "Rustic Wooden Cutting Board with Handle",
      slug: "rustic-wooden-cutting-board-handle",
      description:
        "Beautiful cutting board crafted from reclaimed oak wood. Features a convenient handle and food-safe finish. Each board showcases unique grain patterns and character marks.",
      materials: [
        "Reclaimed oak wood",
        "Food-safe mineral oil finish",
        "Beeswax",
      ],
      category: "Kitchenware",
      tags: ["wooden", "cutting board", "rustic", "reclaimed wood", "kitchen"],
      price: 42.75,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Rustic wooden cutting board with handle",
        },
        {
          url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Close-up of wood grain and finish",
        },
      ],
      stock: 15,
      variants: [
        {
          name: "Size",
          options: [
            'Medium (12"x8")',
            'Large (16"x10")',
            'Extra Large (18"x12")',
          ],
        },
      ],
      status: "active",
      ratingAvg: 4.8,
      ratingCount: 32,
      createdAt: "2024-02-10T16:45:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345e",
      sellerId: "seller_005",
      title: "Handmade Silver Wire Wrapped Gemstone Pendant",
      slug: "handmade-silver-wire-wrapped-gemstone-pendant",
      description:
        "Elegant pendant featuring a natural amethyst gemstone wrapped in sterling silver wire. Comes with an 18-inch silver chain. Each stone is unique with natural variations.",
      materials: ["Sterling silver wire", "Natural amethyst", "Silver chain"],
      category: "Jewelry",
      tags: [
        "silver",
        "pendant",
        "gemstone",
        "amethyst",
        "wire wrapped",
        "handmade",
      ],
      price: 85.0,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Silver wire wrapped amethyst pendant",
        },
        {
          url: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Pendant worn on silver chain",
        },
      ],
      stock: 3,
      variants: [
        {
          name: "Gemstone",
          options: ["Amethyst", "Rose Quartz", "Clear Quartz", "Labradorite"],
        },
        {
          name: "Chain Length",
          options: ["16 inches", "18 inches", "20 inches"],
        },
      ],
      status: "active",
      ratingAvg: 4.9,
      ratingCount: 27,
      createdAt: "2024-01-20T11:30:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345f",
      sellerId: "seller_006",
      title: "Organic Soy Candle in Hand-Thrown Ceramic Vessel",
      slug: "organic-soy-candle-ceramic-vessel",
      description:
        "Natural soy wax candle poured into a handmade ceramic vessel. Scented with essential oils and burns for approximately 45 hours. Vessel can be repurposed after use.",
      materials: [
        "100% soy wax",
        "Cotton wick",
        "Essential oils",
        "Handmade ceramic",
      ],
      category: "Home Decor",
      tags: [
        "candle",
        "soy wax",
        "ceramic",
        "essential oils",
        "natural",
        "aromatherapy",
      ],
      price: 28.99,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Soy candle in handmade ceramic vessel",
        },
        {
          url: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Candle burning with warm glow",
        },
      ],
      stock: 20,
      variants: [
        {
          name: "Scent",
          options: [
            "Lavender & Vanilla",
            "Eucalyptus & Mint",
            "Cedar & Bergamot",
            "Unscented",
          ],
        },
        {
          name: "Vessel Color",
          options: ["Natural Clay", "Sage Green", "Deep Blue"],
        },
      ],
      status: "active",
      ratingAvg: 4.5,
      ratingCount: 64,
      createdAt: "2024-02-14T13:20:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345g",
      sellerId: "seller_007",
      title: "Vintage Style Leather Journal with Brass Clasp",
      slug: "vintage-leather-journal-brass-clasp",
      description:
        "Handbound leather journal with aged brass clasp closure. Contains 200 pages of unlined handmade paper. Perfect for writing, sketching, or as a travel journal.",
      materials: [
        "Full grain leather",
        "Handmade paper",
        "Brass hardware",
        "Cotton thread",
      ],
      category: "Stationery",
      tags: ["leather", "journal", "notebook", "vintage", "handbound", "brass"],
      price: 55.5,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Vintage style leather journal with brass clasp",
        },
        {
          url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Open journal showing handmade paper pages",
        },
      ],
      stock: 7,
      variants: [
        {
          name: "Leather Color",
          options: ["Rich Brown", "Black", "Cognac", "Dark Green"],
        },
        {
          name: "Size",
          options: ['Pocket (5"x3")', 'Standard (8"x6")', 'Large (10"x7")'],
        },
      ],
      status: "active",
      ratingAvg: 4.7,
      ratingCount: 39,
      createdAt: "2024-01-25T08:45:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345h",
      sellerId: "seller_008",
      title: "Hand-Carved Wooden Spoon Set",
      slug: "hand-carved-wooden-spoon-set",
      description:
        "Set of 3 wooden cooking spoons hand-carved from sustainably sourced cherry wood. Each spoon has a different size for various cooking needs. Treated with food-safe oil.",
      materials: ["Cherry wood", "Food-safe mineral oil", "Beeswax finish"],
      category: "Kitchenware",
      tags: [
        "wooden spoons",
        "hand-carved",
        "kitchen utensils",
        "cherry wood",
        "sustainable",
      ],
      price: 24.99,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1556909114-7176f8b6b9ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Set of 3 hand-carved cherry wood spoons",
        },
        {
          url: "https://images.unsplash.com/photo-1580069798765-2c2cb1655bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Close-up showing wood grain and craftsmanship",
        },
      ],
      stock: 25,
      variants: [
        {
          name: "Wood Type",
          options: ["Cherry", "Maple", "Walnut"],
        },
      ],
      status: "active",
      ratingAvg: 4.8,
      ratingCount: 56,
      createdAt: "2024-02-07T12:10:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345i",
      sellerId: "seller_009",
      title: "Crocheted Baby Blanket in Organic Cotton",
      slug: "crocheted-baby-blanket-organic-cotton",
      description:
        'Soft and cozy baby blanket crocheted from 100% organic cotton yarn. Features a beautiful shell stitch pattern and measures 30"x36". Machine washable and hypoallergenic.',
      materials: ["100% organic cotton yarn", "Hypoallergenic"],
      category: "Baby & Kids",
      tags: [
        "baby blanket",
        "crocheted",
        "organic cotton",
        "handmade",
        "soft",
        "hypoallergenic",
      ],
      price: 48.0,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Crocheted baby blanket in soft pink",
        },
        {
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Close-up of shell stitch pattern",
        },
      ],
      stock: 6,
      variants: [
        {
          name: "Color",
          options: [
            "Soft Pink",
            "Baby Blue",
            "Mint Green",
            "Cream",
            "Lavender",
          ],
        },
      ],
      status: "active",
      ratingAvg: 4.9,
      ratingCount: 34,
      createdAt: "2024-01-30T15:55:00.000Z",
    },
    {
      _id: "64a1b2c3d4e5f6789012345j",
      sellerId: "seller_010",
      title: "Handwoven Wicker Storage Basket with Handles",
      slug: "handwoven-wicker-storage-basket-handles",
      description:
        "Beautiful storage basket handwoven from natural rattan with sturdy handles. Perfect for organizing blankets, toys, or laundry. Features a tight weave and durable construction.",
      materials: ["Natural rattan", "Cotton rope handles"],
      category: "Home Organization",
      tags: [
        "wicker basket",
        "storage",
        "handwoven",
        "rattan",
        "organization",
        "natural",
      ],
      price: 36.75,
      currency: "USD",
      images: [
        {
          url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Handwoven wicker storage basket with handles",
        },
        {
          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          alt: "Basket filled with folded blankets",
        },
      ],
      stock: 14,
      variants: [
        {
          name: "Size",
          options: ['Small (12"x8")', 'Medium (16"x12")', 'Large (20"x14")'],
        },
        {
          name: "Handle Style",
          options: ["Rope Handles", "Leather Handles", "No Handles"],
        },
      ],
      status: "active",
      ratingAvg: 4.6,
      ratingCount: 28,
      createdAt: "2024-02-12T10:25:00.000Z",
    },
  ];

  return NextResponse.json(products);
}

export async function POST() {
  return NextResponse.json({ 
    message: 'Product created successfully' 
  }, { status: 201 });
}