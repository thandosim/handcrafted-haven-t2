import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// Hash password utility function
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    
    // Check if any admin already exists
    const adminExists = await User.findOne({ role: "admin" });
    
    if (adminExists) {
      return NextResponse.json(
        { error: "Admin user already exists" }, 
        { status: 400 }
      );
    }

    // Get credentials from environment variables
    const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    const adminName = process.env.INITIAL_ADMIN_NAME || "Admin";

    // Validate required environment variables
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Initial admin credentials not configured in environment variables" },
        { status: 500 }
      );
    }

    // Check if a user with this email already exists (any role)
    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create the first admin user
    const firstAdmin = await User.create({
      name: adminName,
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
      role: "admin"
    });

    // Return success without exposing password hash
    return NextResponse.json(
      { 
        message: "Initial admin user created successfully",
        user: {
          id: firstAdmin._id,
          name: firstAdmin.name,
          email: firstAdmin.email,
          role: firstAdmin.role
        }
      }, 
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("Admin seed error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Failed to create initial admin: ${errorMessage}` },
      { status: 500 }
    );
  }
}