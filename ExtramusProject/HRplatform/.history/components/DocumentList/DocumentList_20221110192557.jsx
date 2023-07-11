import {
  ArrowRightAlt,
  AssignmentTurnedInOutlined,
  CheckCircleOutline,
  MoreHoriz,
  WorkOutline,
  ErrorOutline,
  Visibility,
  AccessTime,
} from "@mui/icons-material";
import { createPopper } from "@popperjs/core";
import * as React from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { DocumentReview } from "../../components/DocumentReview";

const DocumentListContent = ({ title, pos, status, icon }) => {
  const Border = () => {
    let isRounded;
    let statusColor;
    let icon_b;

    pos === "left"
      ? (isRounded = " rounded-l-md ")
      : pos === "right"
      ? (isRounded = " rounded-r-md ")
      : isRounded;

    status === "correct"
      ? (statusColor = " bg-green-400 ")
      : status === "incorrect"
      ? (statusColor = " bg-red-400 ")
      : status === "review"
      ? (statusColor = " bg-[#0B3768] ")
      : (statusColor = " bg-gray-400 ");

    icon === "correct"
      ? (icon_b = <CheckCircleOutline />)
      : icon === "incorrect"
      ? (icon_b = <ErrorOutline />)
      : icon === "review"
      ? (icon_b = <Visibility />)
      : (icon_b = <AccessTime />);

    let result =
      "flex flex-col items-center px-2 py-0 w-full gap-1 text-white " +
      isRounded +
      statusColor +
      icon_b;
    return result;
  };
  /*
	let setIcon = icon =>{
        switch(icon){
            case 'correct':
                return <CheckCircleOutline/>;
            case 'incorrect':
                return <ErrorOutline/>;
            case 'review':
                return <Visibility/> ;
            case 'null':
                return <AccessTime/> ;
            default:
                return ''
        }

    }*/

  return (
    <div className={Border()}>
      <div className="text-[10px] ">{title}</div>
      <div className="">{icon}</div>
      {/* <ErrorOutline className="text-sm" /> */}
    </div>
  );
};

const Contents = [
  {
    title: "Curiculum Vitae",
    pos: "left",
    status: "correct",
    icon: <CheckCircleOutline className="text-sm" />,
  },
  {
    title: "Learning Agreement",
    pos: "mid",
    status: "correct",
    icon: <CheckCircleOutline className="text-sm" />,
  },
  {
    title: "Acceptance Letter",
    pos: "mid",
    status: "null",
    icon: <AccessTime className="text-sm" />,
  },
  {
    title: "Accommodation L .",
    pos: "mid",
    status: "review",
    icon: <Visibility className="text-sm" />,
  },
  {
    title: "Arrival Tickets",
    pos: "mid",
    status: "null",
    icon: <AccessTime className="text-sm" />,
  },
  {
    title: "Intern Dev Plan",
    pos: "mid",
    status: "incorrect",
    icon: <ErrorOutline className="text-sm" />,
  },
  {
    title: "Confidentiality L .",
    pos: "mid",
    status: "null",
    icon: <AccessTime className="text-sm" />,
  },
  {
    title: "Identification",
    pos: "mid",
    status: "incorrect",
    icon: <ErrorOutline className="text-sm" />,
  },
  {
    title: "Grant",
    pos: "mid",
    status: "review",
    icon: <Visibility className="text-sm" />,
  },
  {
    title: "Extramus Email",
    pos: "mid",
    status: "correct",
    icon: <CheckCircleOutline className="text-sm" />,
  },
  {
    title: "Extramus Folder",
    pos: "right",
    status: "null",
    icon: <AccessTime className="text-sm" />,
  },
];

const DocumentList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);


  return (
    <div className="flex flex-col w-full py-2 px-6 gap-2 bg-white border rounded-md">
      {/* Top */}
      <div className="flex justify-between">
        {/* Top Left */}
        <div className="flex gap-4 items-center">
          <div className="flex font-semibold">
            <p>Fabrizio David</p>
          </div>

          <div className="flex items-center gap-1 text-xs font-light text-gray-500">
            <WorkOutline className="text-sm" />
            <p>Project Management</p>
          </div>

          <div className="flex items-center gap-1 text-xs font-light text-gray-500">
            <AssignmentTurnedInOutlined className="text-sm" />
            Completed
          </div>
        </div>

        {/* Top Right */}
        <div className="flex gap-2">
          <div className="py-1 px-2 text-xs rounded bg-sky-200 text-blue-900">
            Arriving at 03 September, 2021
          </div>
          <div className="">
            <Fragment className=" bg-zinc-200  fixed inset-0 z-50">
              <Tooltip
                className="bg-transparent text-black"
                content="Edit"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <Button
                  onClick={handleOpen}
                  variant="gradient"
                  className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                >
                  <MdOutlineModeEditOutline />
                </Button>
              </Tooltip>

              <Dialog
                open={open}
                handler={handleOpen}
                className="fixed  w-2/3 h-2/3 ml-64 px-80 p-0 pl-8 mt-32 border-2 border-[#0B3768] rounded-xl shadow-lg shadow-[#0B3768]"
              >
                <DialogHeader>Edit Documents</DialogHeader>
                <DialogBody className="" divider>
                  <div className="flex p-4">
                    <div className="flex flex-col w-full gap-4">
                      <div className="flex gap-6 justify-start">
                        <div className="flex w-48 flex-col gap-2">
                          <label
                            htmlFor="cv"
                            className="block text-sm font-semibold"
                          >
                            Curriculum Vitae
                          </label>
                          <select
                            name="cv"
                            id="cv"
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option>Have</option>
                            <option>Don't have</option>
                          </select>
                        </div>

                        <DocumentReview title="Learning Agreement" />
                        <DocumentReview title="Acceptance Letter" />
                        <div className="flex w-48 flex-col gap-2">
                          <label
                            htmlFor="cv"
                            className="block text-sm font-semibold"
                          >
                            Accommodation Letter
                          </label>
                          <select
                            name="cv"
                            id="cv"
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option>Send</option>
                            <option>Don't send</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-6 justify-start">
                        <DocumentReview title="Arrival Tickets" />
                        <DocumentReview title="Intern Development Plan" />
                        <DocumentReview title="Confidentiality Letter" />
                        <DocumentReview title="Identification" />
                      </div>
                      <div className="flex gap-6 justify-start">
                        <DocumentReview title="Grant" />
                        <div className="flex w-48 flex-col gap-2">
                          <label
                            htmlFor="cv"
                            className="block text-sm font-semibold"
                          >
                            Extramus email
                          </label>
                          <select
                            name="cv"
                            id="cv"
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option>Do it</option>
                            <option>It's done </option>
                          </select>
                        </div>
                        <div className="flex w-48 flex-col gap-2">
                          <label
                            htmlFor="cv"
                            className="block text-sm font-semibold"
                          >
                            Extramus Folder
                          </label>
                          <select
                            name="cv"
                            id="cv"
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option>Do it</option>
                            <option>It's done</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogBody>
                <DialogFooter >
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-4 ml-auto px-6 text-red-400 bg-white hover:bg-red-400 hover:text-white border-red-400 rounded-xl border-2"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    variant="gradient"
                    color="green"
                    onClick={handleOpen}
                    className="px-9 text-green-400 bg-white hover:bg-green-400 hover:text-white border-green-400 rounded-xl border-2"
                  >
                    <span>Edit</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </Fragment>
          </div>
        </div>
      </div>

      {/* Middle */}
      <div className="flex gap-[2px]">
        {Contents.map((content, index) => (
          <DocumentListContent
            key={index}
            title={content.title}
            pos={content.pos}
            status={content.status}
            icon={content.icon}
          />
        ))}
      </div>

      {/* Bottom */}
      <div className="flex justify-between">
        {/* Bottom Left */}
        <div className="flex items-center gap-1 text-xs font-light text-gray-500">
          <p>Applied on 25 August, 2021</p>
        </div>
        <div className="flex cursor-pointer">
          {/* Bottom Right */}
          <div className="py-1 px-2 mt-1 text-xs text-blue-900">
            View All Documents
          </div>
          {/* Link to all documents will be attached here (google drive link) */}
          <a href="./news">
            <button className="text-xl text-black transition ease-in-out delay-150 rounded-xl hover:-translate-y-1 hover:scale-110 hover:text-blue-500 hover:shadow-xl hover:shadow-blue-500  duration-300">
              <ArrowRightAlt />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
