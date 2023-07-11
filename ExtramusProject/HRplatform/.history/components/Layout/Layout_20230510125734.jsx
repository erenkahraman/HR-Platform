import React, { useState } from "react";
import Sidebar from "./Sidebar";
const { default: Head } = require("next/head");
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box>
        <Topbar isOpen={open} handler={handleDrawerOpen} />
        <Head>
          <title>HR Project</title>
        </Head>
        {/* Main Container */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid
              sx={{width:"15%"}}
              item
              className="text-[#4F4F4F] bg-gradient-to-r to-sky-50 from-purple-50"
            >
              {/* SideNavbar */}
              <Sidebar isOpen={open} />
            </Grid>
            <Grid
              item
              sx={{width: open ? "85%" : "100%"}}
              overflow="hidden"
              className="flex flex-1 w-full grow p-4 bg-gradient-to-r from-sky-50 to-purple-50"
            >
              {/* Right Side */}
              <div>{children}</div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
