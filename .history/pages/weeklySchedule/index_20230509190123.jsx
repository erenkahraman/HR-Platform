import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";

export default function weeklySchedule() {
  
  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full ">
        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded bg-white max-w-screen mx-auto">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">Weekly Schedule</h1>
            </div>
          </div>
          {/* End of Title Container */}
              <div className="block w-full overflow-x-auto">
            {/* Date  */}
            <div className="flex flex-row justify-between items-center px-4 py-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center">
                  <div className="text-sm text-center font-semibold rounded-2xl">08/05/2023 - 12/05/2023 </div>
                </div>
                  
                
                </div>
                </div>
                {/* End of Date */}
                {/* Table */}
                <div className="flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">  
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Time
                                aa
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Monday
                              </th>
                              <th

                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tuesday
                              </th>
                              
                              </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8:00 - 9:00</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Math</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Math</td>

                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9:00 - 10:00</td>
                            </tr>
                            
                            </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
          </div>  
        </div>
      </div>
    </section>
  );
}
