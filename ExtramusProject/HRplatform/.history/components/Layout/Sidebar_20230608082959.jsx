import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import CoPresentIcon from "@mui/icons-material/CoPresent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  CalendarMonthOutlined,
  DashboardOutlined,
  FlightLandOutlined,
  FlightTakeoffOutlined,
  GroupOutlined,
  InsertDriveFileOutlined,
  List,
} from "@mui/icons-material";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const Menus = [
    // Menu items...
  ];

  const sideBarListItem = () => {
    let result =
      "flex  w-full sm:w-32 items-center px-1 sm:pl-0 py-2 gap-2 hover:text-[#2F80ED] hover:bg-sky-50";
  
    return result;
  };
  
  const sideBarListSeperator = () => {
    let result = "flex  items-center px-1 py-2 mt-4 sm:pl-0 text-gray-700 hidden lg:block";

    return result;
  };

  return (
    <div className="fixed h-screen text-gray-400">
      <div className="w-full sm:h-screen mt-4 lg:px-4">
        <ul className="sm:h-screen text-sm items-center font-light flex flex-wrap justify-center flex-row lg:inline-block">
          {Menus.map((menu, index) => (
            <li key={index}>
              {menu.isSeperator === undefined ? (
                <Link href={menu.href}>
                  <a
                    className={
                      menu.isOn === false
                        ? sideBarListItem()
                        : sideBarListItem() + " text-[#2F80ED] bg-sky-50"
                    }
                  >
                    {menu.icon}
                    <p>{menu.title}</p>
                  </a>
                </Link>
              ) : (
                <a className={sideBarListSeperator()}>{menu.title}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
