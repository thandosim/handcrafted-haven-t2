"use server"; // Enables server actions in Next.js App Router

import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma"; // Uncomment when DB is ready

// 🔐 Login Action
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Simulated login check
  if (email === "user@nextmail.com" && password === "123456") {
    return { success: true };
  }

  return { success: false, message: "Invalid credentials" };
}

// 🆕 Signup Action
export async function signupUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // TODO: Save to DB
  console.log("Creating user:", { name, email, password });
}

// 🛍️ Create Product Action
export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const price = parseFloat(formData.get("price") as string);
  const artistId = parseInt(formData.get("artistId") as string);

  // TODO: Save to DB
  console.log("Creating product:", { title, price, artistId });
}
