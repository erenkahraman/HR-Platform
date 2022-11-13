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
    fetch("/api/birthday")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

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
                {student.applicant.position}
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
