/*This file exports custom components used in the dashboard */

import Popup from "reactjs-popup";
import { ArrowForward, Verified } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";

//Button used in tigger for Popup
export default ButtonTrigger = ({
  btnIcon,
  btnText,
  btnDescription,
  bgColor,
  txtColor,
}) => {
  //seeting props for the Button
  return (
    <Grid
      className="flex-1 bg-white p-4 justify-start"
      flex
      sx={{
        flexDirection: "column",
        borderRadius: 2,
        border: `1px solid ${txtColor}`,
      }}
    >
      <Button sx={{ color: { txtColor }, backgroundColor: { bgColor } }}>
        {btnIcon}
        <Typography className="buttonText mx-6">{btnText}</Typography>
      </Button>
      <Typography variant="body2" component="div">
        {btnDescription}
      </Typography>
    </Grid>
  );
};

//PopUp component function
export const PopUp = ({ triggerData, children }) => {
  return (
    <Popup
      contentStyle={{ background: "#0B3768", borderRadius: "0.25rem" }}
      //when this function is called, don't forget to assign props
      trigger={triggerData}
      position="bottom"
    >
      {children}
    </Popup>
  );
};

//popup form component
export const PopupForm = ({ heading, submitFunction }) => {
  return (
    /* NEW POST */
    <div className="m-2 p-4">
      <form onSubmit={submitFunction}>
        <div>
          <h6 className="font-semibold text-md text-white pt-2 pb-4">
            {heading}
          </h6>
          <div className="flex flex-row mx-2 mt-2 mb-4">
            <h2 className="font-semibold text-l text-white ">By: </h2>
            <input
              id="whoPosted"
              type="text"
              className="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
              placeholder="Type your name..."
              required
            />
          </div>
        </div>

        {/* INFORMATION BOX */}
        <div className="flex flex-col">
          <div className="pb-2 pt-6">
            <input
              id="title"
              type="text"
              className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
              placeholder="Type the title..."
              required
            />
          </div>
          <div>
            <textarea
              id="category"
              className="rounded border-none bg-[#e0f2fe] text-black h-72 w-80 ml-2 pl-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
              placeholder="Type the category..."
              required
            />
          </div>
        </div>

        {/* BUTTOM PART */}
        <div className="flex flex-row pt-20">
          <input
            id="date"
            type="date"
            className="rounded border-none bg-[#e0f2fe] text-#0B3768 h-7 ml-2 "
          />
          <div className="pl-20">
            {/* <button className="pr-2 ">
                  {" "}
                  <Cancel className=" fill-[#e0f2fe] hover:fill-[#991b1b]" />{" "}
                </button> */}
            <button type="submit">
              {" "}
              <Verified className="fill-[#e0f2fe] hover:fill-[#15803d]" />{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

/*This component can be called to replce all the redundant "View All" items
Don't forget to pass props when rendering
You can add or change the props based on features*/
export const ViewMore = ({ itemText, itemLink }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-md font-semibold">{itemText}</div>
      <a
        href={itemLink}
        className="flex items-center justify-center text-[#2F80ED]"
      >
        <div>View All </div>
        <div>
          {" "}
          <ArrowForward className="text-md" />
        </div>
      </a>
    </div>
  );
};
