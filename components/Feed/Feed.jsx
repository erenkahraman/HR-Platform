import { useEffect, useState } from "react";
const Feed = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/whatsNew")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div>
      {data.slice(data.length - 3).map((whatsNew) => (
        <div className="flex m-2 py-4" key={whatsNew.id}>
          <div className="flex flex-[1] flex-col gap-2 p-2">
            <div className="text-sm font-semibold">{whatsNew.date}</div>
            <div className="text-xs font-light">
              <div>posted by</div>
              <div>{whatsNew.postedBy}</div>
            </div>
          </div>
          <div className="flex flex-[3] flex-col gap-2 p-2">
            <div className="text-sm font-semibold">{whatsNew.title}</div>
            <div className="text-xs font-light">{whatsNew.title}</div>
          </div>
          <div className="flex flex-[1] p-2">
            <div className="flex h-fit text-sm font-semibold underline cursor-pointer">
              Read More
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
