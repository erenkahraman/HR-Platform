import { Sidebar } from ".";
const { default: Head } = require("next/head");
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import extramusLogoWhite from "../../public/extramusLogoWhite.png";
import { ArrowDropDown, NotificationsNoneOutlined } from "@mui/icons-material";
import Popup from "reactjs-popup";
import Notification from "../Feed/Notification";
import { parseCookies } from "nookies";
import { useSession, signOut, signIn } from "next-auth/react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ children }) {
  const cookies = parseCookies();
  const router = useRouter();
  const { data: session } = useSession();
  const [userState, setUserState] = useState();
  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : "";
  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user);
  }, [router]);
  const logoutHandler = async () => {
    if (session) {
      signOut();
    }
    const token = cookie.get("token");
    const user = cookie.get("user");
    if (token || user) {
      cookie.remove("token");
      cookie.remove("user");
      router.push("/login");
    }
  };

  const [open, setOpen] = useState(true);
  return (
    <>
      <Head>
        <title>HR Project</title>
      </Head>

      <main>
        <div className="flex sticky top-0 z-50 ">
          {/* TopBar */}
          <div className="flex h-16 w-screen bg-[#0B3768] justify-between py-3 px-4 sm:w-screen">
            {/* Extramus Logo White*/}
            <Link href="/dashboard">
              <div className="flex items-center ml-5 hover:cursor-pointer  sm:hidden  ">
                <Image
                  src={extramusLogoWhite}
                  alt="loginImg"
                  width="80"
                  height="40"
                />
              </div>
            </Link>
            <HiOutlineMenu
              className="md:hidden lg:hidden text-white text-3xl"
              onClick={() => setOpen(!open)}
            />
            {/* Right Side */}
            <div className="flex items-center justify-between text-white gap-3 mr-5">
              <Popup
                contentStyle={{ borderRadius: "30px", margin: "14px" }}
                trigger={
                  <button className="cursor-poiner relative scale-100 hover:scale-125">
                    <NotificationsNoneOutlined />
                    <span className="absolute rounded-full bg-red-600 w-[15px] h-[15px] top-[-1px] right-[-1px] flex items-center justify-center text-xs">
                      2
                    </span>
                  </button>
                }
                position="bottom center"
              >
                <div className="">
                  {/* <h2 className="border-4 rounded-xl text-black font-bold text-xl bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-50 text-semibold p-2">Notifications:</h2> */}
                  {/* <div className="h-0.5 bg-[gray]/75"></div> */}
                  <Notification />
                  <Notification />
                  <Notification />
                </div>
              </Popup>
              <p className="text-2xl"> │ </p>
              <Link href="/#">
                <p className="cursor-pointer ">
                  {userState && userState.email}
                </p>
              </Link>

              <Popup
                contentStyle={{ marginTop: "10px" }}
                trigger={
                  <button>
                    <ArrowDropDown className="cursor-pointer text-4xl" />
                  </button>
                }
                position="bottom center"
              >
                <div className="bg-[#0b3768] font-semibold rounded-md p-2 text-white transition ease-in-out delay-150 hover:text-[#0b3768] hover:bg-gray-100 hover:font-bold hover:-translate-y-0.5 hover:scale-90 hover: duration-200 ...">
                  <button onClick={logoutHandler}>Log Out</button>
                </div>
              </Popup>
            </div>
          </div>
        </div>
        {/* Main Container */}
        <div className="sm:static relative flex text-[#4F4F4F] ">
          {/* Left Side */}

          <div
            className={`h-full sticky top-16 drop-shadow-xl w-48 sm:w-40 bg-white ${
              open ? "sm:fixed" : "sm:hidden"
            } `}
          >
            <Sidebar />
          </div>

          {/* Right Side */}
          <div className="flex flex-[5] p-4 bg-gradient-to-r from-sky-50 to-purple-50">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
