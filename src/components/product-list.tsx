import React, { useEffect, useState } from 'react';
import { Box, Card, Flex, Avatar, Text } from '@radix-ui/themes';
import { gql } from 'graphql-request';
import { GET_ALL_PRODUCTS } from '@/lib/gql/queries';
import { Product } from '../../generated/prisma';
import gqlClient from '@/lib/_db/gql';
import Link from 'next/link';



export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await gqlClient.request<{ getAllProducts: Product[] }>(
          GET_ALL_PRODUCTS
        );
        setProducts(data.getAllProducts || []);
        console.log('Fetched products:', data.getAllProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    getProducts();
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '16px',
      }}
    >
      {products.map((product) => (
        <Link href={"/product/"+product.id}>
        <Box key={product.id} maxWidth="240px">
          <Card>
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={product.imageUrl}
                radius="full"
                fallback={product.title?.[0] ?? 'P'}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {product.title}
                </Text>
                <Text as="div" size="2" color="gray">
                  {product.category}
                </Text>
                <Text as="div" size="1" color="gray">
                  ${product.price?.toFixed(2) ?? '0.00'}
                </Text>
              </Box>
            </Flex>
          </Card>

        </Box>
        </Link>
      ))}
    </div>
  );
}
