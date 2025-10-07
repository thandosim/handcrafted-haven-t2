"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractFriendlyErrors } from "../frontend/lib/errorHandler";


export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log("Raw error object:", data.error);

        const friendlyMessages = extractFriendlyErrors(data.error);
        setError(friendlyMessages.join(" | "));
        return;
      }

      // Cookie is already set by the API
      router.push("/"); // Redirect to homepage or dashboard
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="p-massive max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-accent2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-accent2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-accent2"
          />
        </div>

        {/* {error && <p className="text-sm text-red-600">{error}</p>} */}
        {typeof error === "string" && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-accent2 text-gray-900 font-semibold rounded-md hover:bg-accent2-dark"
        >
          Register
        </button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-accent2 font-medium hover:underline">
          Login here
        </a>
      </p>
    </main>
  );
}
