"use client";
import { Theme } from "@radix-ui/themes";
import React, { createContext, ReactNode } from "react";
import { useState } from "react";
import { RoleType, User } from "../../../generated/prisma";

type UserWithoutPassword = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string | null;
  role: RoleType;
};
export const UserContext = createContext<{
  user?: User;
}>({});
export default function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user?: User;
}) {
  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
