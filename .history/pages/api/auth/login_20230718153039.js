/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../util/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await dbConnect();
  try {
    console.log("request body -->",req.body)
    if (req.method === "POST") {
      console.log("post method")
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        console.log("User Doesn't Exists");
        res.status(422).json({ message: "User Doesn't Exists" });
      } else {
        if (password === "" || password.length == 0) {
          console.log("Password is Required");
          res.status(400).json({ message: "Password is Required" });
        } else {
          const doMatch = await bcrypt.compare(password, user.password);
          if (!doMatch) {
            console.log("Password Doesn't Match");
            res.status(404).json({ message: "Password Doesn't Match" });
          } else {
            if (user.confirmation === "0") {
              console.log("Account not approved");
              res.status(404).json({
                message:
                  "Your account is not yet approved by Extramus. Please get contact with an Authorized person to approve your registration.",
              });
            } else {
              const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                {
                  expiresIn: "7d",
                }
              );
              const { email, _id } = user;
              res.status(200).json({
                message: "Login Successful",
                user: { email, _id },
                token,
              });
              console.log("User Login Successful");
            }
          }
        }
      }
    }
  } catch (error) {
    console.log("error block")
    console.log(error);
  }
};
