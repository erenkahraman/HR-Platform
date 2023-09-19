import { useState, useEffect } from "react";

const useTableSearch = ({ data, searchedVal }) => {
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (searchedVal) {
      const filtered = data.filter((attendance) => {
        return JSON.stringify(attendance)
          .toLocaleLowerCase()
          .includes(searchedVal.toString().toLocaleLowerCase());
      });
      setFilteredData(filtered);
    } else setFilteredData(data);
  }, [searchedVal, data]);
  return { filteredData };
};

export default useTableSearch;
