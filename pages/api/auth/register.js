/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../util/mongodb";
import { SMTPClient } from "emailjs";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await dbConnect();
  try {
    if (req.method === "POST") {
      const { name, phoneNumber, email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        res.status(422).json({ message: "User already Exists" });
      } else {
        if (
          password === "" ||
          password.length == 0 ||
          name === "" ||
          phoneNumber === ""
        ) {
          res.status(400).json({ message: "All fields must be filled" });
        } else {
          const secret = parseInt(process.env.JWT_SECRET);
          const HashedPassword = await bcrypt.hash(password, secret);
          const newUser = await new User({
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            password: HashedPassword,
            confirmation: "0",
          }).save();
          // SEND CONFİRMATİON MAİL TO ADMIN MAİL

          const client = new SMTPClient({
            user: process.env.GOOGLE_USER,
            password: process.env.GOOGLE_PASSWORD,
            host: "smtp.gmail.com",
            ssl: true,
          });

          const token = jwt.sign(
            {
              email: newUser.email,
              name: newUser.name,
              phoneNumber: newUser.phoneNumber,
            },
            String(secret),
            {
              expiresIn: "7d",
            }
          );
          const message = await client.sendAsync({
            text: `This user want to register extramus.eu . Please Click to link for see who want to register and approve ${process.env.NEXTAUTH_URL}/login/confirmByAdmin/${token}`,
            from: process.env.GOOGLE_USER,
            to: process.env.GOOGLE_ADMIN,
            subject: "testing Confirmation",
          });

          // SEND CONFİRMATİON MAİL TO ADMIN MAİL
          res.status(200).json({ message: "Sign Up Success" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
