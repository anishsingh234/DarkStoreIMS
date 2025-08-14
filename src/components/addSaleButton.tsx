"use client";

import gqlClient from '@/lib/_db/gql';
import React, { useState } from 'react';
import { CREATE_SALE } from '@/lib/gql/mutation';

type Product = {
  id: string;
  stock: number;
  title: string;
};

export default function AddSaleButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSale() {
    if (quantity <= 0) {
      alert("Quantity must be at least 1");
      return;
    }
    if (product.stock < quantity) {
      alert("Sale quantity can't be more than available quantity");
      return;
    }

    setLoading(true);
    try {
      const data = await gqlClient.request(CREATE_SALE, {
        createSaleId: product.id,
        quantity,
      });

      if (data?.createSale) {
        alert("Sale recorded successfully!");
        setQuantity(1); // reset input
      } else {
        alert("Failed to record sale");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md w-fit">
      <input
        type="number"
        min={1}
        max={product.stock}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value) || 0)}
        placeholder="Quantity"
        className="border border-gray-300 rounded px-2 py-1 w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button
        onClick={handleSale}
        disabled={loading || product.stock === 0}
        className={`px-4 py-1 rounded text-white font-medium transition ${
          loading || product.stock === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Add to Sale"}
      </button>
    </div>
  );
}
