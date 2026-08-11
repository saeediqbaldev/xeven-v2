"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await gqlClient.request<{ login: { token: string } }>(LOGIN, {
        username,
        password,
      });
      localStorage.setItem("xp-admin-token", data.login.token);
      router.push("/admin");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-dark px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface-dark p-8"
      >
        <h1 className="font-display text-xl font-bold text-white">Xeven Pixels Admin</h1>
        <p className="mt-1 text-sm text-white/60">Sign in to manage the site.</p>

        <label className="mt-6 block text-sm text-white/80">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-white/10 bg-base-dark px-4 py-2 text-white"
        />

        <label className="mt-4 block text-sm text-white/80">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-white/10 bg-base-dark px-4 py-2 text-white"
        />

        {error && <p className="mt-4 text-sm text-accent">{error}</p>}

        <button type="submit" disabled={loading} className="btn-cta mt-6 w-full">
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
