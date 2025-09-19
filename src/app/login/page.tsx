"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import { loginUser } from "@/lib/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (formData: FormData) => {
    const result = await loginUser(formData);
    if (result.success) {
      // Redirect to homepage or dashboard
      window.location.href = ("/");
    }
    // handle result, e.g., show error or redirect
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111] text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <Hero />

      <main className="flex justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

          <form action={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-900 text-white dark:bg-gray-100 dark:text-black rounded hover:opacity-90 transition"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
