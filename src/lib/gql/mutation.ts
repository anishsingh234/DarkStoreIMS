import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
    $role: String!
  ) {
    createUser(
      name: $name
      email: $email
      username: $username
      password: $password
      role: $role
    ) {
      username
      email
      id
      name
      password
      avatar
      role
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imageUrl: String!
  ) {
    addProduct(
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    ) {
      id
      description
      category
      imageUrl
      price
      stock
      title
    }
  }
`;

export const CREATE_SALE = gql`
  mutation Mutation($createSaleId: String!, $quantity: Int) {
    createSale(id: $createSaleId, quantity: $quantity)
  }
`;
