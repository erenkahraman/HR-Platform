import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DeleteIcon from "@mui/icons-material/Delete";

const Feed = () => {
  const token = cookie.get("token");
  const [data, setData] = useState([]);
  const [, setLoading] = useState(true);

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
        const { data } = await axios.get(`/api/whatsNew`, { params: { token: token } }, config);
        setData(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);

  const read = (item) => {
    confirmAlert({
      title: <strong>Whats New</strong>,
      message:
        <div className="h-96 overflow-y-scroll ">
          <p>

            <div>
                  <div className={"flex flex-col"}>
                    <div className={"flex flex-row justify-between mb-10"}>
                      <div className="text-sm font-semibold">{formatDate(item.date)}</div>
                      <div className="text-xs font-light flex flex-col">
                        <div>posted by</div>
                        <div className={"text-end"}>{item.postedBy}</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-xs font-light">{item.paragraph}</div>
                  </div>
            </div>
          </p>
        </div>,
      buttons: [
        {
          label: "Close",
          onClick: () => {},
        },
      ],
    });
  };






  const handleDelete = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, content: '' }; // Clear the content of the item
      }
      return item;
    });
    setData(updatedData);
  };



  return (
    <div>
      {data.slice(data.length - 3).map((whatsNew) => (
        <div className="flex m-2 py-4" key={whatsNew.id}>
          <div className="flex flex-[1] flex-col gap-2 p-2">
            <div className="text-sm font-semibold">{formatDate(whatsNew.date)}</div>
            <div className="text-xs font-light">
              <div>posted by</div>
              <div>{whatsNew.postedBy}</div>
            </div>
          </div>
          <div className="flex w-5 flex-1 flex-col gap-2 p-2  ">
            <div className="text-sm font-semibold  truncate  text-ellipsis">{whatsNew.title}</div>
            <div className="text-xs font-light  truncate  text-ellipsis">{whatsNew.paragraph}</div>
          </div>
          <div className="flex items-center justify-between p-2">
            <button onClick={() => read(whatsNew)} className="flex items-center p-2">
              <div className="text-sm truncate  font-semibold underline cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300">
                Read More
             </div>
            </button>
            <button onClick={() => handleDelete(whatsNew.id)} className="ml-2">
              <DeleteIcon />
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Feed;
