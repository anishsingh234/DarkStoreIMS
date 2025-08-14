import { gql } from "graphql-request";

export const LOGIN_USER = gql`
  query Query($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`;

export const GET_ALL_USER = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      password
      role
      username
      email
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      id
      title
      description
      category
      price
      stock
      imageUrl
    }
  }
`;
export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($id: String!) {
    GetProductDetail(id: $id) {
      sales {
        createdAt
        id
        quantity
        productId
      }
      category
      description
      imageUrl
      id
      price
      stock
      title
    }
  }
`;
