import { parseCookies } from "nookies";
import axios from "axios";
import { useState } from "react";

export async function app() {
  const cookies = parseCookies();
  const token = cookies?.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if(token !== undefined) {
    var data = await axios.post(`/api/auth/tokenCheck`, { token }, config);
    }
  } catch (e) {
    console.error(e);
  }

  if (data?.data?.message === "true") {
    return true;
  } else {
    return false;
  }
}
