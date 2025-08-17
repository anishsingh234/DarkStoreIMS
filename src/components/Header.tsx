"use client";
import Image from "next/image";
import { Avatar, Box, Card, Flex, Text, Tooltip } from "@radix-ui/themes";
import React, { useContext } from "react";
import { UserContext } from "./_context/userContext";
import { ThemeContext } from "./_context/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { user } = useContext(UserContext);
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/12474/12474059.png"
                alt="Store Management"
                fill
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <Text
              size="5"
              weight="bold"
              className="hidden sm:block text-gray-900 dark:text-gray-100"
            >
              Store Manager
            </Text>
          </div>


          <div className="flex items-center gap-4">
           
            <Tooltip content={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <button
                onClick={() => setIsDark && setIsDark(!isDark)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
              >
                {isDark ? (
                  <Moon size={20} className="text-gray-900 dark:text-gray-100" />
                ) : (
                  <Sun size={20} className="text-yellow-500" />
                )}
              </button>
            </Tooltip>

            {/* User Profile */}
            <Card
              variant="ghost"
              className="hover:bg-gray-100/70 dark:hover:bg-gray-800/60 rounded-xl transition-colors duration-200 cursor-pointer"
            >
              <Flex gap="3" align="center" className="py-1 px-3">
                <Avatar
                  size="3"
                  src={
                    user?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/12474/12474059.png"
                  }
                  radius="full"
                  fallback={user?.name?.charAt(0)?.toUpperCase() || "U"}
                  className="ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <Box className="hidden sm:block text-right">
                  <Text
                    as="div"
                    size="2"
                    weight="medium"
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {user?.name || "Guest User"}
                  </Text>
                  <Text
                    as="div"
                    size="1"
                    className="text-gray-500 dark:text-gray-400 capitalize"
                  >
                    {user?.role || "User"}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </div>
        </div>
      </div>
    </header>
  );
}
