"use client";
import { Button, Card, Heading, Text, TextField, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import gqlClient from "@/lib/_db/gql";
import { LOGIN_USER } from "@/lib/gql/queries";

export default function Page() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError({});
    setLoading(true);
    try {
      const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
        userCred,
        password,
      });

      if (data.loginUser) {
        window.location.href = "/";
      } else {
        setError({ message: "Invalid credentials" });
      }
    } catch (error) {
      setError({
        message: "Something went wrong. Please contact the admin.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <Card
        style={{
          width: 400,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          borderRadius: "1rem",
          background: "white",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-20 w-20 rounded-full overflow-hidden shadow-md">
            <Image
              fill
              src="https://cdn-icons-png.flaticon.com/512/12474/12474059.png"
              alt="Store Management"
            />
          </div>
          <Heading size="4" className="text-center text-gray-800 dark:text-white">
            Welcome Back
          </Heading>
          <Text size="2" className="text-gray-500 dark:text-gray-400 text-center">
            Log in to continue to your dashboard
          </Text>
        </div>

        <TextField.Root
          style={{ height: 40 }}
          placeholder="Username or Email"
          className="w-full"
          value={userCred}
          onChange={(e) => setUserCred(e.target.value)}
        />

        <TextField.Root
          style={{ height: 40 }}
          placeholder="Password"
          type="password"
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error.message && (
          <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md">{error.message}</p>
        )}

        <Button
          style={{ width: "100%", marginTop: "10px" }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <Spinner /> : <Text>Log in</Text>}
        </Button>

        <div className="text-center mt-2">
          <Text size="2" className="text-gray-500">
            Don’t have an account?{" "}
            <a href="mailto:@admin" className="text-blue-600 hover:underline">
              Connect to admin 
            </a>
          </Text>
        </div>
      </Card>
    </main>
  );
}
