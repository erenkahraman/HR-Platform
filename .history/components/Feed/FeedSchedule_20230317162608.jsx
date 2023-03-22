import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";

const FeedSchedule = () => {
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
          <div className="box-border flex m-1 py-2 w-2/4 border-solid border-2">
            <strong>Morning Shift</strong>
          </div>
          <div className="box-border flex m-1 py-2 w-2/4 border-solid border-2">  
            <strong>Afternoon Shift</strong>
          </div>
        </div>
        
        {isloading ? (
          <div className="flex justify-center items-center h-96">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        ) : (
          <div className="flex flex-col">
            {data.map((weeklySchedule) => (
              <div className="flex m-1 py-2">
                <div className="box-border flex m-1 py-2 w-2/4 border-solid border-2">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">Date:</p>
                        <p className="text-sm font-semibold">Time:</p>
                        <p className="text-sm font-semibold">Location:</p>
                        <p className="text-sm font-semibold">Description:</p>
                      </div>
                      <div className="flex flex-col ml-2">
                        <p className="text-sm">{weeklySchedule.date}</p>
                        <p className="text-sm">{weeklySchedule.time}</p>
                        <p className="text-sm">{weeklySchedule.location}</p>
                        <p className="text-sm">{weeklySchedule.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-border flex m-1 py-2 w-2/4 border-solid border-2">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">Date:</p>
                        <p className="text-sm font-semibold">Time:</p>
                        <p className="text-sm font-semibold">Location:</p>
                        <p className="text-sm font-semibold">Description:</p>
                      </div>
                      <div className="flex flex-col ml-2">
                        <p className="text-sm">{weeklySchedule.date}</p>
                        <p className="text-sm">{weeklySchedule.time}</p>
                        <p className="text-sm">{weeklySchedule.location}</p>
                        <p className="text-sm">{weeklySchedule.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

export default FeedSchedule;