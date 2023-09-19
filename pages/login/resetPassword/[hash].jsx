import Image from "next/image";
import React, { useEffect, useState } from "react";
import forgotImage from "../../../public/forgotimg.jpg";
import extramusLogo from "../../../public/extramusLogo.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { app } from "../../verifyToken/index";
import { confirmAlert } from "react-confirm-alert";

export default function Forgot() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  /// for Token Check
  const submitHandler = async (e) => {
    if (password !== confirmPassword) {
      alert(
        "Password and Confirm password are different. They should be same."
      );
    } else {
      const path = router.asPath;
      const token = path.slice(
        path.indexOf("resetPassword/") + "resetPassword/".length
      );
      cookie.set("PasswordChangeToken", token);
      const fetchData = async () => {
        const data = await app("resetPassword");
        return data;
      };
      const result = fetchData().catch(console.error);

      result.then(function (val) {
        if (val !== true) {
          // jwt disapproved.
          router.push("/login");
          cookie?.remove("PasswordChangeToken");
        }
      });

      var decoded = jwt.decode(token);
      const email = decoded.email;
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `/api/auth/resetPassword`,
          { email, password },
          config
        );
        alert("Password changed successfully");
        cookie?.remove("PasswordChangeToken");
        router.push("/login")

      } catch (error) {
        alert(error.response.data)
        console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
      }
     ;
    }
  };

  return (
    <div className=" h-screen py-20 px-[200px] text-gray-600 sm:px-0">
      {/* Container */}
      <div className=" h-full flex">
        {/* Left Side */}
        <div className="shadow-xl w-1/2 flex items-center justify-center sm:hidden">
          <Image src={forgotImage} alt="loginImg" />
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col items-center justify-center gap-12 pb-[60px] sm:w-screen">
          <div className="w-full flex flex-col gap-5">
            {/* Extramus Logo */}
            <div className=" w-full flex justify-center">
              <Image
                src={extramusLogo}
                alt="loginImg"
                width="200"
                height="100"
              />
            </div>

            {/* Title and Sub Title */}
            <div className="w-full flex flex-col items-center gap-1 mb-2 sm:w-screen">
              <p className="text-4xl sm:ml-6">
                Will you reset your password ?{" "}
              </p>
              <p className="mt-8 text-xl">
                Please enter here your password and confirm password :
              </p>
            </div>
            {/* Input */}
            <div className=" flex flex-col items-center sm">
              <input
                type="password"
                className="text-black rounded-md w-96 placeholder:italic sm:w-80"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="*********"
                required
              />
              <input
                type="password"
                className="text-black mt-8 rounded-md w-96 placeholder:italic sm:w-80"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="*********"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col items-center gap-1">
            <button
              onClick={submitHandler}
              className="w-60 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-3 py-2 text-center mb-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
