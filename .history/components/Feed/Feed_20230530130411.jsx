import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
        const { data } = await axios.get(
          `/api/whatsNew`,
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

  const read = (content) => {
    confirmAlert({
      title: <strong>What's New</strong>,
      message: <div className="h-96 overflow-y-scroll">{content}</div>,
      

      buttons: [
        {
          label: 'OK',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'Cancel',
          onClick: () => alert('Click No')
        }
      ]
    });
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
          <div className="flex flex-1 flex-col gap-2 p-2">
            <div className="text-sm font-semibold">{whatsNew.title}</div>
            <div className="text-xs font-light">{whatsNew.title}</div>
          </div>
          <div className="flex flex-[1] p-2">
            <button onClick={() => read(whatsNew.content)} className="flex flex-[1] p-2">
              <div className="flex h-fit text-sm font-semibold underline cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">
                Read More
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
