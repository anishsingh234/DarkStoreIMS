import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-request";
import { addProduct, createSale, getAllProducts, GetProductDetail } from "./resolver/product";
import loginUser, {
  createUser,
  getAllUsers,
  updateUserProfile,
} from "./resolver/userauth";
import getUserFromCookies from "@/lib/services/helper";
import { RoleType } from "../../../../generated/prisma";
import prismaClient from "@/lib/_db/prisma";

const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    GetProductDetail(id:String):Product

  }
  type Sale{
    id:String,
    productId:String,
    quantity:Int,
    createdAt:String
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      role: String!
    ): User
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(
      userId: String!
      name: String!
      email: String!
      username: String!
      avatar: String
    ): Boolean
    addProduct(
      title: String!
      description: String!
      category: String!
      price: Float!
      stock: Int!
      imageUrl: String!
    ): Product
     createSale(id:String!,quantity:Int):Boolean
  }

  type User {
    id: String
    name: String
    username: String
    email: String
    password: String
    avatar: String
    role: String
  }

  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales:[Sale]
  }
`;
const resolvers = {
  Query: {
    loginUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    GetProductDetail
  },
  Mutation: {
    createUser,
    updateUserRole: async (
      _: any,
      args: {
        userId: string;
        role: RoleType;
      }
    ) => {
      try {
        const user = await getUserFromCookies();
        if (user?.role != "admin") return false;
        const updatedUser = await prismaClient.user.update({
          where: {
            id: args.userId,
          },
          data: {
            role: args.role,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    updateUserProfile,
    addProduct,
    createSale,
   
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
