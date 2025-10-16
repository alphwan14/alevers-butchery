"use client";

import { useState } from "react";
import { getFirebase } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { auth } = getFirebase();
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/admin");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl bg-white border border-[#D2B48C] p-6 shadow-sm"
      >
        <h1 className="text-xl font-bold">Admin Login</h1>
        <div className="mt-4">
          <label className="block text-sm font-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-[#D2B48C] bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-[#D2B48C] bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-[#8B0000] px-5 py-3 font-semibold text-white shadow hover:bg-[#660000] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}


