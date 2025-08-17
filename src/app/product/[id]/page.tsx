"use client";

import { useState, useEffect } from "react";
import gqlClient from "@/lib/_db/gql";
import { GET_PRODUCT_DETAIL } from "@/lib/gql/queries";
import { useParams } from "next/navigation";
import { Product } from "../../../../generated/prisma";
import AddSaleButton from "@/components/addSaleButton";
import ProductSaleChart from "@/components/productSaleChart";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: { GetProductDetail: Product } = await gqlClient.request(
          GET_PRODUCT_DETAIL,
          { id: id as string }
        );
        setProduct(data?.GetProductDetail);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading product details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center mt-10">No product found.</p>;

  const chartData =
    product?.sales?.map((sale) => {
      const date = new Date(Number.parseInt(sale.createdAt));
      const format = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
      return { date: format, quantity: sale.quantity };
    }) || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column - Product Info */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full max-h-[400px] object-cover rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300"
          />
          
          <div className="mt-6 space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {product.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{product.category}</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              ₹{product.price}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stock: <span className="font-medium">{product.stock}</span>
            </p>

            <AddSaleButton product={product} />
          </div>
        </div>

        {/* Right Column - Sales Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Sales History
          </h2>
          <div className="h-80">
            <ProductSaleChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
