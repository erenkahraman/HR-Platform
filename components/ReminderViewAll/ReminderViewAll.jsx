import { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";
//functıon to VıewAll
const ReminderViewAll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const token = cookie.get("token");
//functıon to formatDate
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

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <div>
      {sortedData.map((reminder) => (
        <div
          key={reminder.id}
          className="items-center w-full border-collapse bg-white"
        >
          <div className="flex m-2 py-4">
            <div className="flex-[5] flex flex-col">
              <div className="text-sm font-semibold">{reminder.title}</div>
              <div className="text-xs font-light ">{reminder.category}</div>
            </div>
            <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
              {formatDate(reminder.date)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReminderViewAll;
