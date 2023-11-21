import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const WhatsNewViewAll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const token = cookie.get("token");
  var currentDate = new Date().toISOString().split('T')[0];
  var formatCurrentDate = formatDate(currentDate);
  const handleDelete = async (id) => {
    debugger;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          token: token,
        },
      };
      var result = confirm("Want to delete?");
      if (result) {
        await axios.delete(`/api/whatsNew/${id}`, config);
        const response = await axios.get("/api/whatsNew", config);
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            token: token,
          },
        };
        const response = await axios.get("/api/whatsNew", config);

        const sortedData = response.data
          .slice()
          .sort((b, a) => new Date(b.date) - new Date(a.date));

        setData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  console.log(data);
  console.log("currentDate " + currentDate + "\n");
  // .toISOString().split('T')[0])
  // data.map((whatsNew) => (console.log(Date.parse(whatsNew.date.split('T')[0]) > Date.parse(currentDate)))

  return (
    <div>
      {data.map((whatsNew) => (Date.parse(whatsNew.date.split('T')[0]) < Date.parse(currentDate)) ? (" ")
        :
        (
          <div
            key={whatsNew._id}
            className="items-center w-full border-collapse bg-white"
          >
            <div className="flex m-2 py-4">
              <div className="flex flex-[1] flex-col gap-2 p-2">
                <div className="text-sm font-semibold">
                  {formatDate(whatsNew.date)}
                </div>
                <div className="text-xs font-light">
                  <div>posted by</div>
                  <div>{whatsNew.postedBy}</div>
                </div>
              </div>
              <div className="flex flex-[3] flex-col gap-2 p-2">
                <div className="text-sm font-semibold">{whatsNew.title}</div>
                <div className="text-xs font-light">{whatsNew.paragraph}</div>
              </div>
              <div className="flex flex-[1] items-end p-2">

                <button
                  onClick={() => handleDelete(whatsNew._id)}
                  className="ml-2 self-start"
                >
                  <DeleteIcon />
                </button>

              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WhatsNewViewAll;

