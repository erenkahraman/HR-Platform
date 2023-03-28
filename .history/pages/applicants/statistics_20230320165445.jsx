import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useQuery } from "react-query";
import { getWeeklySchedule } from "../../lib/api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useQuery } from "react-query";
import { getWeeklySchedule } from "../../lib/api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";


export default function Statistics() {
    return (
        <div>
            <h1>Statistics</h1>
        </div>
    )

};




