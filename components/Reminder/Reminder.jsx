import { Circle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const Reminder = ({ color, setOpen }) => {
  const circleColor = () => {
    let result = "text-sm " + color;
    return result;
  };
  const [data, setData] = useState([]);
  const token = cookie.get("token");
  useEffect(() => {
    setOpen(true);
    const asyncRequest = async () => {
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
      setOpen(false);
    };
    try {
      asyncRequest();
    } catch (e) {
      console.error(e);
      setOpen(false);
    }
  }, []);
  return (
    <div>
      {data
        ?.slice(-3)
        .reverse()
        .map((reminder) => (
          <div key={reminder.id} className="flex w-full">
            <div className="flex-[1] flex items-center justify-center">
              <Circle className={circleColor()} />
            </div>
            <div className="flex-[5] flex flex-col">
              <div className="text-sm font-semibold">{reminder.title}</div>
              <div className="text-xs font-light ">{reminder.category}</div>
            </div>
            <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
              {reminder.date}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Reminder;
