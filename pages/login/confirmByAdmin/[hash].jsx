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
import ready from "@document/ready";

export default function Forgot() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  ready(async () => {
    if (router.asPath === "/login/confirmByAdmin/[hash]") {
    } else {
      // Create User information
      const content = async () => {
        const path = await router.asPath;
        const token = await path.slice(
          path.indexOf("confirmByAdmin/") + "confirmByAdmin/".length
        );
        await cookie.set("ConfirmByAdminToken", token);
        const fetchData = async () => {
          const data = await app("ConfirmByAdminToken");
          return data;
        };
        const result = fetchData().catch(console.error);

        result.then(function (val) {
          if (val !== true) {
            // jwt disapproved.
            alert("- Unknown token - ");
            cookie?.remove("ConfirmByAdminToken");
            router.push("/login");
          }
        });

        var decoded = jwt.decode(token);
        setEmail(decoded.email);
        setName(decoded.name);
        setPhoneNumber(decoded.phoneNumber);
        return 1;
      };
      const result = content().catch(console.error);
    }
  });

  const submitHandler = async (e) => {
    var proceed = confirm("Are you sure you want to proceed?");
    if (proceed) {
      //proceed
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `/api/auth/confirmUserByAdmin`,
          { email },
          config
        );
        alert("Successfully accepted");
        cookie?.remove("ConfirmByAdminToken");
        router.push("/dashboard");
      } catch (error) {
        alert(error.response.data);
        console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
      }
    } else {
      //don't proceed
    }
  };
  const denyHandler = async (e) => {
    var deny = confirm("Are you sure you want to deny?");
    if (deny) {
      //proceed
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `/api/auth/removeUser`,
          { email },
          config
        );
        alert("Successfully denied");
        cookie?.remove("ConfirmByAdminToken");
        router.push("/dashboard");
      } catch (error) {
        alert(error.response.data);
        console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
      }
    } else {
      //don't proceed
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
                Do you want to confirm the user?
              </p>
            </div>
            {/* User Informations */}
            <div className=" flex flex-col items-center sm">
              <h3>
                <strong>User Name : </strong>
                {name}
              </h3>
              <h3>
                <strong>User Email : </strong> {email}
              </h3>
              <h3>
                <strong>User PhoneNumber : </strong>
                {phoneNumber}
              </h3>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col items-center gap-1">
            <button
              onClick={submitHandler}
              className="w-60 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-3 py-2 text-center mb-4"
            >
              Accept
            </button>
            <button
              onClick={denyHandler}
              className="w-60 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-3 py-2 text-center mb-4"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
