import {
  ArrowRightAlt,
  AssignmentTurnedInOutlined,
  CheckCircleOutline,
  MoreHoriz,
  WorkOutline,
} from "@mui/icons-material";
import { Circle } from "@mui/icons-material";
import { useEffect, useState } from "react";

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

const DocumentList = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/applicant")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="flex flex-col w-full gap-2">
      {data.map((student) => (
        <div
          className="flex flex-col w-full py-2 px-6 gap-2 bg-white border rounded-md"
          key={student.id}
        >
          {/* Top */}
          <div className="flex justify-between">
            {/* Top Left */}
            <div className="flex gap-4 items-center">
              <div className="flex font-semibold">
                <p>
                  {student.student.firstName} {student.student.lastName}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-light text-gray-500">
                <WorkOutline className="text-sm" />
                <p>{student.department}</p>
              </div>
            </div>
            {/* Top Right */}
            <div className="flex gap-2">
              <div className="py-1 px-2 text-xs rounded bg-sky-200 text-blue-900">
                Arriving at {student.arrivalDate}
              </div>
              <MoreHoriz className="cursor-pointer" />
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
              />
            ))}
          </div>
          {/* Bottom */}
          <div className="flex justify-between">
            {/* Bottom Left */}
            <div className="flex items-center gap-1 text-xs font-light text-gray-500">
              <p>Applied on {student.applicationDate}</p>
            </div>
            <div className="flex cursor-pointer">
              {/* Bottom Right */}
              <div className="py-1 px-2 text-xs text-blue-900">
                View All Documents
              </div>
              <ArrowRightAlt />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
