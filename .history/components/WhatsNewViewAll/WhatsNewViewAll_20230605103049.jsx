import { useEffect, useState } from "react";
import Feed from "../../components/Feed/Feed";
import axios from "axios";
import cookie from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";

const WhatsNewViewAll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const token = cookie.get("token");

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          token: token,
        },
      };
      await axios.delete(`/api/whatsNew/${id}`, config);
      const response = await axios.get(`/api/whatsNew`, config);
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            token: token,
          },
        };
        const response = await axios.get(`/api/whatsNew`, config);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);

  return (
    <div>
      {data.map((whatsNew) => (
        <div
          key={whatsNew.id}
          className="items-center w-full border-collapse bg-white"
        >
          <div className="flex m-2 py-4">
            <div className="flex flex-[1] flex-col gap-2 p-2">
              <div className="text-sm font-semibold">{whatsNew.date}</div>
              <div className="text-xs font-light">
                <div>posted by</div>
                <div>{whatsNew.postedBy}</div>
              </div>
            </div>
            <div className="flex flex-[3] flex-col gap-2 p-2">
              <div className="text-sm font-semibold">{whatsNew.title}</div>
              <div className="text-xs font-light">{whatsNew.paragraph}</div>
            </div>
            <div className="flex flex-[1] p-2">
              <div className="flex h-fit text-sm font-semibold underline cursor-pointer">
                Read More
              </div>
              <button onClick={() => handleDelete(whatsNew.id)} className="ml-2">
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