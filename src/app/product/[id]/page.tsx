// app/product/[id]/page.tsx
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
        const data:{
          GetProductDetail:Product
        } = await gqlClient.request(GET_PRODUCT_DETAIL, { id: id as string });
        setProduct(data?.GetProductDetail);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product: {error}</p>;

  if (!product) return <p>No product found.</p>;
  console.log(product.sales)
  const chartData=product?.sales?.map((sale)=>{
    const date=new Date(Number.parseInt(sale.createdAt));
    const format=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    const quantity=sale.quantity;

    const obj={
      date:format,
      quantity
    }
    return obj;
  }) || []
  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full max-h-96 object-cover rounded-lg shadow"
      />
      <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-500">{product.category}</p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-4 text-lg font-semibold">₹{product.price}</p>
      <p className="text-sm text-gray-600">Stock: {product.stock}</p>
      <AddSaleButton product={product}/>


      <div className="w-1/3 h-96">
        <ProductSaleChart data={chartData}/>
      </div>
    </div>
  );
}
