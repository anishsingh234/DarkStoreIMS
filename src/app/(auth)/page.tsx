"use client";

import Admin from "@/components/AdminPanel";
import { UserContext } from "@/components/_context/userContext";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user?.role === "admin" && <Admin />}
    </div>
  );
}
