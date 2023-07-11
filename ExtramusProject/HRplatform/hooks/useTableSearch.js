import { useState, useEffect } from "react";

const useTableSearch = ({ data, searchedVal }) => {
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (searchedVal) {
      const filtered = data.filter((student) => {
        return JSON.stringify(student)
          .toLocaleLowerCase()
          .includes(searchedVal.toString().toLocaleLowerCase());
      });
      setFilteredData(filtered);
    } else setFilteredData(data);
  }, [searchedVal, data]);
  return { filteredData };
};

export default useTableSearch;
