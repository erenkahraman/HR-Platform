import { useEffect, useState } from "react";
import Feed from "../../components/Feed/Feed";
import axios from "axios";
import cookie from "js-cookie";

const WhatsNewViewAll = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
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

  return (
    <div>
      {data.map((whatsNew) => (
        <div
          key={whatsNew.id}
          className="items-center  w-full border-collapse bg-white"
        >
          <div className="flex flex-grow m-2 py-4">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default WhatsNewViewAll;
