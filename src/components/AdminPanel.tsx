"use client";
import CreateUserDialog from "./CreateUserButton";
import { User } from "../../generated/prisma";
import gqlClient from "@/lib/_db/gql";
import { useState, useEffect } from "react";
import { GET_ALL_USER } from "@/lib/gql/queries";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import CreateProductDialog from "./CreateProductButton";
import ProductList from "./product-list";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getAllUsers() {
      const data: { getAllUsers: User[] } = await gqlClient.request(
        GET_ALL_USER
      );
      const users = data?.getAllUsers || [];
      setUsers(users);
    }
    getAllUsers();
  }, []);

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Products
          </h2>
          <CreateProductDialog />
        </div>
        <ProductList />
      </div>

     
      <aside className="w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Users
          </h2>
          <CreateUserDialog />
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[600px] pr-1">
          {users.map((user) => (
            <Card
              key={user.id}
              className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                   transition-all duration-200 rounded-xl shadow-sm"
            >
              <Flex gap="3" align="center" className="p-3">
                <Avatar
                  size="3"
                  src={user?.avatar || ""}
                  radius="full"
                  fallback={user?.name?.charAt(0) || "U"}
                  className="ring-2 ring-gray-200 dark:ring-gray-600"
                />
                <Box>
                  <Text
                    as="div"
                    size="2"
                    weight="bold"
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {user.name}
                  </Text>
                  <Text
                    as="div"
                    size="1"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    @{user.username}
                  </Text>
                </Box>
              </Flex>
            </Card>
          ))}
        </div>
      </aside>
    </div>
  );
}
