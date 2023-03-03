import { useRouter } from "next/router";
import React from "react";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import List from "@mui/material/List";
import ListIcon from "@mui/icons-material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  CalendarMonthOutlined,
  DashboardOutlined,
  FlightLandOutlined,
  FlightTakeoffOutlined,
  GroupOutlined,
  InsertDriveFileOutlined,
} from "@mui/icons-material";

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
    title: "Profile",
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
  { title: "List", href: "/applicants/list", icon: <ListIcon />, isOn: false },
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
  { title: "INTERNS", isSeperator: true },
  {
    title: "List",
    href: "/interns/InternsList",
    icon: <ListIcon />,
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
    icon: <ListIcon />,
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

export default function Sidebar({ open }) {
  const router = useRouter();

  const sideBarListItem = () => {
    let result = "px-6 hover:text-[#2F80ED] hover:bg-sky-100";

    return result;
  };

  const sideBarListSeperator = () => {
    let result = "items-center px-6 py-2 mt-4 sm:pl-0 text-gray-700";

    return result;
  };

  return (
    <List className="fixed">
      {Menus.map((menu, index) => (
        <ListItem key={index} disablePadding sx={{ display: "flex" }}>
          {menu.isSeperator === undefined ? (
            <ListItemButton
              sx={{
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              href={menu.href}
              className={
                menu.isOn === false
                  ? sideBarListItem()
                  : sideBarListItem() + " text-[#2F80ED] bg-sky-50"
              }
            >
              {open ? (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
              ) : (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#3a87ee",
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={menu.title}
                sx={{ opacity: open ? 1 : 0, my: 0.1 }}
              />
            </ListItemButton>
          ) : (
            <ListItemText
              className={sideBarListSeperator()}
              primary={menu.title}
              sx={{ opacity: open ? 1 : 0 }}
            />
          )}
        </ListItem>
      ))}
    </List>
  );
}
