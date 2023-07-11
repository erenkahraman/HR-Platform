import { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";

const ReminderViewAll = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const token = cookie.get("token");
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
      {data.map((reminder) => (
        <div
          key={reminder.id}
          className="items-center w-full border-collapse bg-white"
        >
          <div className="flex m-2 py-4">
            <div className="flex-[5] flex flex-col">
              <div className="text-sm font-semibold">{reminder.title}</div>
              <div className="text-xs font-light ">{reminder.category}</div>
            </div>
            <div className=" flex items-center justify-start text-xs text-gray-500">
              {reminder.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ReminderViewAll;
