import { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";

const UpcomingViewAll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const token = cookie.get("token");
  const [color, setColor] = useState([]);
  useEffect(() => {
    setLoading(true);
    const statusColor = (status) => {
      let colorText;
      status === "Arriving"
        ? (colorText = "text-green-500")
        : status === "Departure"
          ? (colorText = "text-blue-500")
          : (colorText = "text-red-500");
      setColor("flex-[3] flex items-center justify-start text-xs " + color);
    };
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },

        };
        const { data } = await axios.get(
          `/api/upComing`,
          { params: { token: token } },
          config
        );
        const sortedData = data.sort((b, a) => new Date(b.date) - new Date(a.date));
        setData(sortedData);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);
  const statusColor = (status) => {
    let colorText;
    status === "Arriving"
      ? (colorText = "text-green-500")
      : status === "Departure"
        ? (colorText = "text-blue-500")
        : (colorText = "text-red-500");
    return "flex-[3] flex items-center justify-start text-xs " + colorText;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((intern) => (
          <div
            key={intern.id}
            className="items-center w-full border-collapse bg-white"
          >
            <div className="flex m-2 py-4">
              <div className="flex-[5] flex flex-col">
                <div className="text-sm font-semibold">{intern.name}</div>
                <div className="text-xs font-light ">{intern.department}</div>
              </div>
              <div className={statusColor(intern.action)}>
                {intern.action}
              </div>
              <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
                {formatDate(intern.date)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingViewAll;