import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../api-lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

export default async function authHandler(req, res) {
  const client = await clientPromise;
  
  return NextAuth(req, res, {
    adapter: MongoDBAdapter({ db: client.db("your-database-name") }),
    secret: process.env.JWT_SECRET,
    providers: [
      // OAuth authentication providers...
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      // Passwordless / email sign in
    ],
  });
}
