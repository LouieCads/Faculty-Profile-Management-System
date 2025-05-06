"use client";
import React from "react";
import "./facultyhomepage.css";
import {
  House,
  Upload,
  ChartNoAxesCombined,
  Settings,
  BellRing,
  UserRound,
} from "lucide-react";

const page = () => {
  return (
    <div className="leftContainer">
        <p>testing</p>
    </div>
    <div className="rightContainer">
        <p>testing</p>
    </div>

    // Main Container
    // <div className="flex flex-row min-h-screen w-full bg-white">
    //   {/* Right (Navbar) */}
    //   <div className="flex flex-col w-1/16 h-screen bg-[#125E20] p-4">
    //     {/* <div className="flex flex-col w-1/16 h-screen bg-[#122E20] p-4 m-4 rounded-[1rem]"> */}
    //     {/* Logo */}
    //     <div className="mb-8">
    //       <img
    //         className="w-[4rem] h-auto"
    //         src="/Images/CCIS.png"
    //         alt="CCIS Logo"
    //       />
    //     </div>

    //     {/* Navigation */}
    //     <div className="flex flex-col h-full items-center gap-6">
    //       {/* Homepage */}
    //       <a href="">
    //         <div className="bg-[#63a02b] p-2 rounded-md flex flex-col items-center">
    //           <House size={22} />
    //         </div>
    //       </a>
    //       {/* Upload */}
    //       <a href="/Faculty-Upload">
    //         <div className="bg-[#63a02b] p-2 rounded-md flex flex-col items-center">
    //           <Upload size={22} />
    //         </div>
    //       </a>
    //       {/* Statistics */}
    //       <a href="/Faculty-Statistics">
    //         <div className="bg-[#63a02b] p-2 rounded-md flex flex-col items-center">
    //           <ChartNoAxesCombined size={22} />
    //         </div>
    //       </a>
    //       {/* Settings */}
    //       <a href="/Faculty-Settings">
    //         <div className="bg-[#63a02b] p-2 rounded-md flex flex-col items-center">
    //           <Settings size={22} />
    //         </div>
    //       </a>
    //     </div>
    //   </div>

    //   {/*Left (Contents)  */}
    //   <div className="flex flex-col w-screen">
    //     {/* Upper */}
    //     <div className="flex flex-row items-center justify-end h-[8%] bg-[#e4e4e4] gap-8 pr-6">
    //       {/* Right Part */}
    //       <div className="bg-gray-500 p-1 rounded">
    //         <BellRing size={20} color="black" />
    //       </div>
    //       <div className="bg-gray-500 p-1">
    //         <UserRound size={20} color="black" />
    //       </div>
    //     </div>

    //     {/* Lower */}
    //     <div></div>
    //   </div>
    // </div>
  );
};

export default page;
