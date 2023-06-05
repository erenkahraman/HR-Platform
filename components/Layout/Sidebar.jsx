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
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardOutlined />,
      isOn: false,
    },
    {
      title: "Schedule",
      href: "/InterviewScheduled/Scheduled",
      icon: <CalendarMonthOutlined />,
      isOn: false,
    },
    {
      title: "Community",
      href: "/Profile/list",
      icon: <GroupOutlined />,
      isOn: false,
    },

    {
      title: "Email",
      href: "/email/send-email",
      icon: <MailOutlineIcon />,
      isOn: false,
    },
    { title: "APPLICANTS", isSeperator: true },
    { title: "List", href: "/applicants/list", icon: <List />, isOn: false },
    {
      title: "Documents",
      href: "/applicants/documents",
      icon: <InsertDriveFileOutlined />,
      isOn: false,
    },
    {
      title: "Arrival",
      href: "/applicants/Arrival",
      icon: <FlightLandOutlined />,
      isOn: false,
    },
    {
      title: "Statistics",
      href: "/applicants/Statistics",
      icon: <InsertChartIcon />,
      isOn: false,
    },
    { title: "INTERNS", isSeperator: true },
    {
      title: "List",
      href: "/interns/InternsList",
      icon: <List />,
      isOn: false,
    },
    {
      title: "Documents",
      href: "/interns/InternsDocuments",
      icon: <InsertDriveFileOutlined />,
      isOn: false,
    },
    {
      title: "Attendance",
      href: "/interns/attendence",
      icon: <CoPresentIcon />,
      isOn: false,
    },
    /*{
      title: "View",
      href: "/interns/InternViewsAll",
      icon: <GridViewIcon />,
      isOn: false,
    },*/
    { title: "END INTERNSHIP", isSeperator: true },
    /*{
      title: "List",
      href: "/EndInternship/EndList",
      icon: <List />,
      isOn: false,
    },
    {
      title: "Documents",
      href: "/EndInternship/EndDocuments",
      icon: <InsertDriveFileOutlined />,
      isOn: false,
    },*/
    {
      title: "Departure",
      href: "/EndInternship/EndDeparture",
      icon: <FlightTakeoffOutlined />,
      isOn: false,
    },
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
    <div className="  sm:h-screen  text-gray-400">
      <>
        <div className=" w-full sm:h-screen  mt-4">
          <ul className=" sm:h-screen text-sm font-light flex flex-wrap justify-center flex-row lg:inline-block">
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
      </>
    </div>
  );
}
