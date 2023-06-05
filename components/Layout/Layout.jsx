import React, {useState} from "react";
import Sidebar from "./Sidebar";

const {default: Head} = require("next/head");
import {Box} from "@mui/system";
import {Grid} from "@mui/material";
import Topbar from "./Topbar";

export default function Layout({children}) {
    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
        setOpen((oldState) => {
            return !oldState
        });
    };
    return (
        <>
            <Box>
                <Topbar isOpen={open} handler={handleDrawerOpen}/>
                <Head>
                    <title>HR Project</title>
                </Head>
                {/* Main Container */}
                <Box component="main" sx={{flexGrow: 1}}>

                    <div className={`grid grid-cols-7`}>
                        {/* SideNavbar */}
                        <div className={`col-span-1  ${open? "" : "hidden" }`}>
                            <Sidebar/>
                        </div>

                        {/* Right Side */}
                        <div className={` ${open ? "col-span-6": "col-span-7 px-5"} `}>{children}</div>
                    </div>

                </Box>
            </Box>
        </>
    );
}
