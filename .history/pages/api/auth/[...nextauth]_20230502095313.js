import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../api-lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  adapter: MongoDBAdapter({
    db: (await clientPromise).db("extramus"),
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    }
  }
});
