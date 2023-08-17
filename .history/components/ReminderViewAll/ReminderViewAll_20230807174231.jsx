import { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";

const ReminderViewAll = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const token = cookie.get("token");


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
            <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
              {formatDate(reminder.date)}
            </div>
            <div className="flex flex-[1] items-end p-2">
              <div className="flex h-fit text-sm font-semibold underline cursor-pointer">
                Read More
              </div>
              <div>
              <button onClick={() => handleDelete(whatsNew.id)} className="ml-2 self-start">
                <DeleteIcon />
              </button>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { ReminderViewAll };