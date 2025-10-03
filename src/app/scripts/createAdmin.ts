import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

(async () => {
  await connectDB();
  const email = "admin@example.com";
  const passwordHash = await bcrypt.hash("admin123", 10);

  const exists = await User.findOne({ email });
  if (!exists) {
    await User.create({
      name: "Initial Admin",
      email,
      passwordHash,
      role: "admin",
    });
    console.log("Admin user created:", email);
  } else {
    console.log("Admin user already exists:", email);
  }
  process.exit();
})();
