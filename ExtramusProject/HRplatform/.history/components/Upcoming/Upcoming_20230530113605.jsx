import { ConnectingAirportsOutlined } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";
import { useState, useEffect } from "react";

const Upcoming = () => {
  const token = cookie.get("token");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
          `/api/upComing`,
          { params: { token: token } },
          config
        );
        const filteredData = data.filter(intern => new Date(intern.date) >= new Date());
        filteredData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA.getMonth() !== dateB.getMonth()) {
            return dateB.getMonth() - dateA.getMonth();
          } else {
            return dateB.getDate() - dateA.getDate();
          }
        });
        setData(filteredData);
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
      : (colorText = "text-red-500");
    return "flex-[1] flex items-center justify-center text-xs " + colorText;
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
        data.map((intern, i) => (
          <div key={i} className="flex w-full">
            <div className="flex-[1] flex flex-col">
              <div className="text-sm font-semibold">{intern.name}</div>
              <div className="text-xs font-light ">{intern.department}</div>
            </div>
            <div className={statusColor(intern.action)}>{intern.action}</div>
            <div className="flex-[1] flex items-center justify-center text-xs text-gray-500">
              {formatDate(intern.date)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Upcoming;
