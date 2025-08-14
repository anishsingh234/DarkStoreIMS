import { ProductCategory } from "../../../../../generated/prisma";
import prismaClient from "@/lib/_db/prisma";

export async function addProduct(
  _: any,
  args: {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
    stock: number;
  }
) {
  try {
    const createdProduct = await prismaClient.product.create({
      data: {
        title: args.title,
        description: args.description,
        imageUrl: args.imageUrl,
        category: args.category as ProductCategory, 
        price: args.price,
        stock: args.stock,
      },
    });
    return createdProduct;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllProducts() {
  try {
    const products = await prismaClient.product.findMany();
    return products;
  } catch (error) {
    return false;
  }
}
export async function GetProductDetail(_:any,args:{
  id:string
}){
  try{
    const product=await prismaClient.product.findUnique({
      where:{
        id:args.id
      },
      include:{
        sales:{
          orderBy:{
            createdAt:"asc"
          }
        }
      }
    })
    return product
  }catch(error){
    return false;
  }
}

export async function createSale(_: any, args: {
    id:string,
    quantity:number
}){
    try{
        const sale=await prismaClient.sale.create({
            data:{
                productId:args.id,
                quantity:args.quantity
            }
        })
        if(sale){
          await prismaClient.product.update({
            where:{
              id:args.id
            },data:{
              stock:{
                decrement:args.quantity
              }
            }
          })
        }
        return true;
    }
    catch(error){
        return false;
    }
}
