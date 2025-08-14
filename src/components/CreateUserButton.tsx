"use client";

import gqlClient from "@/lib/_db/gql";
import { CREATE_USER } from "@/lib/gql/mutation";
import { Dialog, Button, Text, TextField, Flex, Select } from "@radix-ui/themes";

import { useState } from "react";

export default function CreateUserDialog() {
  // Separate states for each input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("staff");

  const handleSubmit = async () => {
    const userData = { name, email, username, password, avatar, role };
    console.log("Creating user:", userData);
    try{
      const data=await gqlClient.request(CREATE_USER,{
        name, email, username, password, avatar, role 
      })
      if(data.createUser){
        alert("user Created Successfully")
      }
      else{
         alert("operation failed")
      }

    }catch(error){
      alert("Something Went Wrong")
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create User</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create New User</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the details to create a new user.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Avatar URL
            </Text>
            <TextField.Root
              placeholder="Optional avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Role
            </Text>
            <Select.Root value={role} onValueChange={setRole}>
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="staff">Staff</Select.Item>
                <Select.Item value="manager">Manager</Select.Item>
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSubmit}>Create</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
