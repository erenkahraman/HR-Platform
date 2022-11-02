import { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";

const ReminderViewAll = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/reminderViewAll")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
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
              {reminder.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ReminderViewAll;
