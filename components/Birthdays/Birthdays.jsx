import { Circle } from "@mui/icons-material";
import { useEffect, useState } from "react";
const Reminder = ({ color }) => {
  const circleColor = () => {
    let result = "text-sm " + color;
    return result;
  };
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/intern")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {data.map((reminder) => (
        <div key={reminder.id} className="flex w-full">
          <div className="flex-[1] flex items-center justify-center">
            <Circle className={circleColor()} />
          </div>
          <div className="flex-[5] flex flex-col">
            <div className="text-sm font-semibold">
              {reminder.student.firstName}
              {reminder.student.lastName}
            </div>
            <div className="text-xs font-light ">{reminder.departement}</div>
          </div>
          <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
            {reminder.student.dateOfBirth}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reminder;