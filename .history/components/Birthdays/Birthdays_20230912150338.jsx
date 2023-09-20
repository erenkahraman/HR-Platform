import { Circle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const Reminder = ({ color }) => {
  const circleColor = () => {
    let result = "text-sm " + color;
    return result;
  };

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
          `/api/birthday`,
          { params: { token: token } },
          config
        );
        
        const sortedData = data.sort((a, b) => {
          const aDate = new Date(new Date().getFullYear(), a.month - 1, a.day);
          const bDate = new Date(new Date().getFullYear(), b.month - 1, b.day);
          return aDate - bDate;
        });

        setData(sortedData.slice(0,5));
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, [token]);

  if (data.length !== 0) {
    return (
      <div>
        {data.map((student) => (
          <div key={student.id} className="flex w-full">
            <div className="flex-[1] flex items-center justify-center">
              <Circle className={circleColor()} />
            </div>
            <div className="flex-[5] flex flex-col">
              <div className="text-sm font-semibold">
                {student.firstName} {student.lastName}
              </div>
              <div className="text-xs font-light ">
                {student.internTest.position}
              </div>
            </div>
            <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
              {student.day} / {student.month}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex items-center ml-5 justify-start text-gray-500">
        No Birthdays for this month
      </div>
    );
  }
};

export default Reminder;
