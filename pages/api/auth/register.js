/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../util/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
dbConnect();

export default async (req, res) => {
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
          const HashedPassword = await bcrypt.hash(
            password,
            process.env.JWT_SECRET
          );
          const newUser = await new User({
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            password: HashedPassword,
          }).save();
          res.status(200).json({ message: "Sign Up Success" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
