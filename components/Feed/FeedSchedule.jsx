import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";

const FeedSchedule = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const token = cookie.get("token");
  const [readMore, setReadMore] = useState();

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
          `/api/weeklySchedule`,
          { params: { token: token } },
          config
        );
        console.log(data)
        setData(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
    
  }, []);

  const read = () => {
    console.log({ readMore });
    confirmAlert({
      title: <strong>{readMore.title}</strong>,
      message: (
        <div className="h-96 overflow-y-scroll ">
          <p>{readMore.paragraph}</p>
        </div>
      ),
      buttons: [
        {
          label: "OK",
        },
      ],
    });
  };

  return (
    <>
    <div className="flex m-1 py-2">
      <div className="box-border flex m-1 py-2 w-2/4 border-solid border-2  "><strong>Morning Shift</strong></div>
      <div className="box-border flex m-1 py-2 w-2/4 border-solid border-2  "><strong>Afternoon Shift</strong></div>
    </div>
      {/* {data.map((weeklySchedule) => (
        <div className="flex m-2 py-4">
          <div className="flex flex-[1] flex-col gap-2 p-2">
            <div className="text-sm font-semibold">{weeklySchedule.date}</div>
            <div className="text-xs font-light">
              <div>posted by</div>
              <div>{weeklySchedule.postedBy}</div>
            </div>
          </div>
          <div className="flex flex-[3] flex-col gap-2 p-2">
            <div className="text-sm font-semibold">{weeklySchedule.title}</div>
            <div className="text-xs font-light h-48">
              <p className="h-48" style={{ overflow: "hidden" }}>
                {weeklySchedule.paragraph}
              </p>
            </div>
          </div>
          <button
            onClick={ () => {
               setReadMore(weeklySchedule);
               read();
            }}
            className="flex flex-[1] p-2"
          >
            <div className="flex h-fit text-sm font-semibold underline cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">
              Read More
            </div>
          </button>
        </div>
      ))} */}
    </>
  );
};

export default FeedSchedule;
