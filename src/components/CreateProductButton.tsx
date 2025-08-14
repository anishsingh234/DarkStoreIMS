"use client";

import gqlClient from "@/lib/_db/gql";
import { CREATE_PRODUCT } from "@/lib/gql/mutation";
import {
  Dialog,
  Button,
  Text,
  TextField,
  Flex,
  Select,
} from "@radix-ui/themes";
import { useState } from "react";
import { Product } from "../../generated/prisma";
export default function CreateProductDialog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("others");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    try {
      const data: {
        addProduct: Product;
      } = await gqlClient.request(CREATE_PRODUCT, {
        title,
        description,
        category,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        imageUrl,
      });
      if (data.addProduct) {
        alert("Product Created Successfully");
      } else {
        alert("Operation failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something Went Wrong");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create Product</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="500px">
        <Dialog.Title>Create New Product</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the details to create a new product.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextField.Root
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Category
            </Text>
            <Select.Root value={category} onValueChange={setCategory}>
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="electronics">Electronics</Select.Item>
                <Select.Item value="beauty">Beauty</Select.Item>
                <Select.Item value="food">Food</Select.Item>
                <Select.Item value="decor">Decor</Select.Item>
                <Select.Item value="accessories">Accessories</Select.Item>
                <Select.Item value="clothing">Clothing</Select.Item>
                <Select.Item value="furniture">Furniture</Select.Item>
                <Select.Item value="others">Others</Select.Item>
              </Select.Content>
            </Select.Root>
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Price
            </Text>
            <TextField.Root
              type="number"
              step="0.01"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Stock
            </Text>
            <TextField.Root
              type="number"
              placeholder="Enter stock quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Image URL
            </Text>
            <TextField.Root
              placeholder="Enter product image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
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
