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
                    <div className={`flex flex-col flex-1 lg:flex-row w-full justify-start`}>
                        {/* SideNavbar */}
                        <div className={` ${open? "" : "hidden" }`}>
                            <Sidebar/>
                        </div>

                        {/* Right Side */}
                        <div className={""}>{children}</div>
                    </div>

                </Box>
            </Box>
        </>
    );
}
