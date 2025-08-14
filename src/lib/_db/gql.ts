import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");

export default gqlClient