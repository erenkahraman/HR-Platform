import { ConnectingAirportsOutlined } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";
import { useState, useEffect } from "react";

const Upcoming = () => {
  const token = cookie.get("token");
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);

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
        setData(data);
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

    let result =
      "flex-[1] flex items-center justify-center text-xs " + colorText;
    return result;
  };

  return (
    <div>
      {data.slice(data.length - 3).map((reminder, i) => (
      <div key={i} className="flex w-full">
      

export default Upcoming;
