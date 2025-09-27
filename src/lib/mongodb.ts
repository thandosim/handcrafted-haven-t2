// import { MongoClient } from "mongodb";
// import { attachDatabasePool } from "@vercel/functions";

// // ... existing connection setup ...

// // After creating the MongoClient, attach it to Vercel's pool manager
// if (process.env.NODE_ENV === "development") {
//   if (!globalWithMongo._mongoClient) {
//     globalWithMongo._mongoClient = new MongoClient(uri, options);
//   }
//   client = globalWithMongo._mongoClient;
// } else {
//   client = new MongoClient(uri, options);
//   attachDatabasePool(client);
// }

// src/lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

// Ensure we actually have a URI
if (!uri) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Add a type-safe declaration for the global cache
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development, reuse the client across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
