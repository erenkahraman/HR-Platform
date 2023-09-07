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
        const filteredData = data.filter(internTest => new Date(internTest.date) >= new Date());
        filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setData(filteredData.slice(0, 5)); // Limit the data to 5 interns
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
        data.reverse().map((intern, i) => (
          <div key={i} className="flex w-full">
            <div className="flex-[1] flex flex-col">
              <div className="text-sm font-semibold">{internTest.firstName}</div>
              <div className="text-xs font-light ">{internTest.department}</div>
            </div>
            <div className={statusColor(internTest.action)}>{internTest.action}</div>
            <div className="flex-[1] flex items-center justify-center text-xs text-gray-500">
              {formatDate(internTest.date)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Upcoming;
