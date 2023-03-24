import {
  NotificationAddOutlined,
  UploadFileOutlined,
  AnnouncementOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import React, { useState } from "react";
import dashboardImage from "../../public/dashboardImage.png";
import { Reminder } from "../../components/Reminder";
import Feed from "../../components/Feed/Feed";
import FeedSchedule from "../../components/Feed/FeedSchedule";
import Upcoming from "../../components/Upcoming/Upcoming";
import { useRouter } from "next/router";
import { Birthdays } from "../../components/Birthdays";
import { CircularProgress, Backdrop } from "@mui/material";
import {
  PopUp,
  ButtonTrigger,
  PopupForm,
  ViewMore,
} from "./dashboardComponents";
import cookie from "js-cookie";
import Reports from "./reports";

const Dashboard = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const token = cookie?.get("token");

  //For Whats's New to add post
  const handleSubmitWhatsNew = async (event) => {
    event.preventDefault();

    const whatsNew = {
      title: event.target.title.value,
      postedBy: event.target.postedBy.value,
      date: event.target.date.value,
      paragraph: event.target.paragraph.value,
      token: token,
    };
    const JSONnew = JSON.stringify(whatsNew);
    console.log(JSONnew);
    const endpointNew = "/api/whatsNew";
    const New = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONnew,
    };
    await fetch(endpointNew, New);
    router.reload();
  };

  //For Reminder to add post
  const handleSubmitReminder = async (event) => {
    event.preventDefault();

    const reminder = {
      title: event.target.title.value,
      category: event.target.category.value,
      date: event.target.date.value,
      whoPosted: event.target.whoPosted.value,
      token: token,
    };
    const JSONReminder = JSON.stringify(reminder);
    console.log(JSONReminder);
    const endpointReminder = "/api/reminder";
    const Reminder = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONReminder,
    };
    await fetch(endpointReminder, Reminder);
    router.reload();
  };

  return (
    <div className="flex flex-col w-full">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Top */}
      <div className="flex flex-1">
        {/* Image Container */}
        <div className="pl-4 items-center justify-center">
          <Image src={dashboardImage} alt="test" width="180" height="180" />
        </div>
        {/* Right */}
        <div className="py-[5%] px-[2%] grid grid-flow-row auto-cols-max">
          {/* Title */}
          <div className="text-4xl font-semibold">Ciao, Ario!</div>
          <div className="text-sm">
            Welcome Back! You have 5{" "}
            <a className="underline" href="./">
              notifications.
            </a>
          </div>
        </div>
      </div>
      {/* Button Container*/}
      <div className="flex flex-wrap gap-3">
        {/* Add Post Button */}

        <PopUp
          triggerData={ButtonTrigger({
            btnIcon: <UploadFileOutlined />,
            btnText: " Add New Post",
            btnDescription: "Start adding your post to inform another employee",
            bgColor: "green",
            txtColor: "#2f7e1b",
          })}
        >
          {/* NEW POST */}
          <PopupForm heading="New Post" submitFunction={handleSubmitWhatsNew} />
        </PopUp>

        {/* Add Reminder Button */}
        <PopUp
          triggerData={ButtonTrigger({
            btnIcon: <NotificationAddOutlined />,
            btnText: "Add New Reminder",
            btnDescription: "Start adding your post to inform another employee",
            bgColor: "green",
            txtColor: "#2f7e1b",
          })}
        >
          {/* NEW Reminder */}
          <PopupForm
            heading="New Reminder"
            submitFunction={handleSubmitReminder}
          />
        </PopUp>

        {/* Add Notification Button */}
        <PopUp
          triggerData={ButtonTrigger({
            btnIcon: <AnnouncementOutlined />,
            btnText: "Send a notification",
            btnDescription: "Send important messages to colleagues",
            bgColor: "red",
            txtColor: "#ba1313",
          })}
        >
          {/* New notificaiton */}
          <PopupForm heading="New notification" submitFunction={[]} />
        </PopUp>
      </div>

      {/* Bottom */}
      <div className="flex flex-1 py-3 gap-3">
        {/* Left */}
        <div className="left-container flex flex-1 flex-col gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <ViewMore itemText="What's New" itemLink="../WhatsNewViewAll" />
            {/* What's New Content */}
            <div className="flex flex-col divide-y bg-white rounded-md border-2">
              <Feed />
            </div>
            {/* Weekly Schedule */}
          </div>
          {/* <Reports /> */}
        </div>

        {/* Right */}
        <div className="flex flex-[1] flex-col gap-3">
          {/* Daily Reminder */}
          <div className="flex flex-col gap-2">
            {/* Daily Reminder Title*/}
            <ViewMore itemText="Daily Reminder" itemLink="../reminderViewAll" />
            {/* Daily Reminder Content */}
            <div className="flex flex-col gap-3 h-fit bg-white rounded-md border-2 py-2">
              <Reminder setOpen={setOpen} />
            </div>
          </div>

          {/* Arrival Departure */}
          <div className="flex flex-col gap-2">
            {/* Bottom Right Side - Title */}
            <ViewMore
              itemText="Upcoming Arrival and Departure"
              itemLink="../UpcomingViewAll"
            />
            {/* Arrival Departure Content*/}
            <div className="flex flex-col gap-3 h-fit bg-white rounded-md border-2 py-2 px-4">
              <Upcoming />
            </div>
          </div>

          {/* Birthday */}
          <div className="flex flex-col gap-2">
            {/* Daily Reminder Title*/}
            <ViewMore itemText="This Month's Birthdays 🥳🍰🎉" itemLink="#" />
            {/* Birthday Content */}
            <div className="flex flex-col gap-3 h-fit bg-white rounded-md border-2 py-2">
              <Birthdays />
            </div>
          </div>
          <div className="flex flex-[1.5] flex-col gap-2">
            <ViewMore itemText="Weekly Schedule" itemLink="weeklySchedule" />
            {/* Weekly Schedule Content */}
            <div className="flex flex-col gap-2 divide-y bg-white rounded-md border-2">
              <FeedSchedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
