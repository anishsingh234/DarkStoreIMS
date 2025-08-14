"use client"
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
      const data: { getAllUsers: User[] } = await gqlClient.request(GET_ALL_USER);
      const users = data?.getAllUsers || [];
      setUsers(users);
    }
    getAllUsers();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div>
          <CreateProductDialog/>
          <ProductList/>
        </div>
        <div className="w-96">
          <div>
            <CreateUserDialog />
          </div>
          <div>
            {users.map((user) => (
              <Box key={user.id} maxWidth="300px">
                <Card>
                  <Flex gap="3" align="center">
                    <Avatar
                      size="3"
                      src={user?.avatar || ""}
                      radius="full"
                      fallback={user?.name?.charAt(0) || "U"}
                    />
                    <Box>
                      <Text as="div" size="2" weight="bold">
                        {user.name}
                      </Text>
                      <Text as="div" size="2" color="gray">
                        {user.username}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
