// @ts-nocheck
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql } from "graphql-request";
import gqlClient from "@/services/gql";


export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-md shadow-sm p-6">
        <div className="text-center mb-6">
          <span className="flex justify-center items-center">
            <img src="/logp.svg" alt="Logo" className="w-10 h-10 m-1" />
            <h1 className="text-3xl font-bold text-teal-600 ">BlogAPP</h1>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Create account
          </h2>

          {statusMessage && (
            <div className="text-red-600 text-sm text-center">
              {statusMessage}
            </div>
          )}

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anish@example.com"
              className="block w-full border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-sm transition duration-150"
          >
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">
            Already have an account?
          </span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <button
          onClick={() => router.push("/login")}
          className="w-full border border-gray-400 text-sm text-gray-800 py-2 rounded-sm hover:bg-gray-50"
        >
          Login
        </button>
      </div>
    </div>
  );
}
