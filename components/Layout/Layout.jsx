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
                {/*flex flex-col flex-1 lg:flex-row w-full flex-wrap  gap-10 min-w-0*/}
                    <div className={`grid grid-cols-1 lg:grid-cols-7  gap-10`}>
                        {/* SideNavbar */}
                        <div className={`col-span-7 lg:col-span-1 ${open? "" : "hidden" }`}>
                            <Sidebar/>
                        </div>

                        {/* Right Side */}
                        <div className={`w-full   ${open? "col-span-7 lg:col-span-6" : "col-span-7 lg:col-span-7" }`}>{children}</div>
                    </div>


            </Box>
        </>
    );
}
