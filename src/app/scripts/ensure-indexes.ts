// scripts/ensure-indexes.ts
import { connectDB } from '@/lib/db';
import Product from '@/models/Products';
import User from '@/models/User';
import Order from '@/models/Order';
import Review from '@/models/Review';

async function ensureIndexes() {
  await connectDB();

  // Product indexes
  await Product.collection.createIndexes([
    { key: { sellerId: 1 } },
    { key: { slug: 1 }, unique: true },
    { key: { status: 1 } },
    { key: { price: 1 } },
    { key: { tags: 1 } },
    { key: { materials: 1 } },
    { key: { createdAt: -1 } }
  ]);

  // User indexes
  await User.collection.createIndexes([
    { key: { email: 1 }, unique: true },
    { key: { role: 1 } }
  ]);

  // Order indexes
  await Order.collection.createIndexes([
    { key: { buyerId: 1 } },
    { key: { status: 1 } },
    { key: { createdAt: -1 } }
  ]);

  // Review indexes
  await Review.collection.createIndexes([
    { key: { productId: 1 } },
    { key: { authorId: 1 } },
    { key: { moderatedStatus: 1 } }
  ]);

  console.log('✅ Database indexes ensured');
  process.exit(0);
}

ensureIndexes().catch((err) => {
  console.error('❌ Error ensuring indexes:', err);
  process.exit(1);
});
