import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./schema.graphql.js";
import { resolvers } from "./resolvers.js";
import { getUserFromRequest } from "./auth.js";

const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || "http://localhost:3000").split(","),
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

app.use(
  "/graphql",
  expressMiddleware(apollo, {
    context: async ({ req }) => ({
      prisma,
      user: getUserFromRequest(req),
    }),
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Xeven Pixels API ready at http://localhost:${PORT}/graphql`);
});
