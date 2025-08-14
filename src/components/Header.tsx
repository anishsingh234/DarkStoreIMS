"use client";
import Image from "next/image";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useContext } from "react";
import { UserContext } from "./_context/userContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/12474/12474059.png"
                alt="Store Management"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <Text size="4" weight="bold" className="text-gray-900">
                Store Manager
              </Text>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center">
            <Box>
              <Card variant="ghost" className="hover:bg-gray-50 transition-colors duration-200">
                <Flex gap="3" align="center" className="py-1 px-2">
                  <Avatar
                    size="2"
                    src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12474/12474059.png"}
                    radius="full"
                    fallback={user?.name?.charAt(0)?.toUpperCase() || "U"}
                    className="ring-2 ring-gray-100"
                  />
                  <Box className="hidden sm:block text-right">
                    <Text as="div" size="2" weight="medium" className="text-gray-900">
                      {user?.name || "Guest User"}
                    </Text>
                    <Text as="div" size="1" className="text-gray-500 capitalize">
                      {user?.role || "User"}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </div>
        </div>
      </div>
    </header>
  );
}