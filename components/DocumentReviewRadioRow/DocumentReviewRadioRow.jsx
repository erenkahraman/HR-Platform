import React, { useState, useEffect } from "react";

const DocumentReviewRadioRow = ({ value, title, register, type }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    // Set the default value when the component mounts
    setSelectedValue(value);
    console.log(selectedValue);
  }, []);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="grid grid-cols-4 border-slate-400 border-solid border-[1px] w-[100%] h-[3rem]">
        <div className="flex items-center pl-[1rem]">{title}</div>
        <div className="flex items-center justify-center">
            <input className="ring-0 focus:ring-0 focus:outline-none"
            onChange={handleChange}
            value="Not Submitted" type="radio" name={title} id={title} 
            {...register(`${type}.documents.${title}`, {
            required: `Please, submit the ${title}`,
            })} checked={selectedValue ==="Not Submitted"} />
        </div>
        <div className="flex items-center justify-center">
            <input className="ring-0 focus:ring-0 focus:outline-none"
            onChange={handleChange}
            value="Needs Review" type="radio" name={title} id={title}
            {...register(`${type}.documents.${title}`, {
            required: `Please, submit the ${title}`,
            })}  checked={selectedValue ==="Needs Review"} />
        </div>
        <div className="flex items-center justify-center">
            <input className="ring-0 focus:ring-0 focus:outline-none"
            onChange={handleChange}
            value="Correct" type="radio" name={title} id={title}
            {...register(`${type}.documents.${title}`, {
            required: `Please, submit the ${title}`,
            })}  checked={selectedValue ==="Correct"} />
        </div>
    </div>
  );
};

export default DocumentReviewRadioRow;
