import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

export function getClient(token?: string) {
  return new GraphQLClient(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export const gqlClient = getClient();
