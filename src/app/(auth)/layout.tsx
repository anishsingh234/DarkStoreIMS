import getUserFromCookies from "@/lib/services/helper";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import UserProvider from "@/components/_context/userContext";
import { User } from "../../../generated/prisma";
import Header from "@/components/Header";

export default async function Layout({ children }: { children: ReactNode }) {
  const user: User | null = await getUserFromCookies();
  if (!user) redirect("/login");

  return (
    <UserProvider user={user}>
      <div>
        <Header/>
        {children}
        </div>
    </UserProvider>
  );
}
