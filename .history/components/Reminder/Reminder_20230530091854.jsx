import { Circle } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { confirmAlert } from "react-confirm-alert"; // Import

const Reminder = ({ color }) => {
  const circleColor = () => {
    let result = "text-sm " + color;
    return result;
  };
  const [data, setData] = useState([]);
  const token = cookie.get("token");
  const [isloading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    setLoading(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/reminder`,
          { params: { token: token } },
          config
        );
        setData(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);

  return (
    <div>
      {data.slice(data.length - 3).map((reminder, i) => (
        <div key={i} className="flex w-full">
          <div className="flex-[1] flex items-center justify-center">
            <Circle className={circleColor()} />
          </div>
          <div className="flex-[5] flex flex-col">
            <div className="text-sm font-semibold">{reminder.title}</div>
            <div className="text-xs font-light ">{reminder.category}</div>
          </div>
          <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
            {formatDate(reminder.date)}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Reminder;
