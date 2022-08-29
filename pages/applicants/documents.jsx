import { Circle } from "@mui/icons-material";
import { DocumentList } from "../../components/DocumentList";
import {
  ArrowRightAlt,
  AssignmentTurnedInOutlined,
  CheckCircleOutline,
  MoreHoriz,
  WorkOutline,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Documents() {
  const Contents = [
    { title: "Curiculum Vitae", pos: "left", status: "correct" },
    { title: "Learning Agreement", pos: "mid", status: "correct" },
    { title: "Invitation Letter", pos: "mid", status: "review" },
    { title: "Accomodation Letter", pos: "mid", status: "null" },
    { title: "Arrival Tickets", pos: "mid", status: "null" },
    { title: "Intern Dev Plan", pos: "mid", status: "incorrect" },
    { title: "Confidentiality Letter", pos: "mid", status: "null" },
    { title: "Identification", pos: "mid", status: "null" },
    { title: "PCR Result", pos: "right", status: "null" },
  ];
  const DocumentListContent = ({ title, pos, status }) => {
    const Border = () => {
      let isRounded;
      let statusColor;

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
        ? (statusColor = " bg-blue-400 ")
        : (statusColor = " bg-gray-400 ");

      let result =
        "flex flex-col items-center px-2 py-1 w-full gap-1 text-white " +
        isRounded +
        statusColor;
      return result;
    };

    return (
      <div className={Border()}>
        <div className="text-[10px] ">{title}</div>
        <CheckCircleOutline className="text-sm" />
      </div>
    );
  };
  return <DocumentList />;
}
