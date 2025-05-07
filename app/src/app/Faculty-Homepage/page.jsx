"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  House,
  File,
  ChartColumnBig,
  Cog,
  Bell,
  X,
  Search,
} from "lucide-react";

const AccountManagementPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("home");

  const notifications = [
    {
      id: 1,
      message: "Dellosa submitted diploma.png",
      time: "5 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      message: "Dorin submitted diploma.png",
      time: "10 minutes ago",
      isRead: false,
    },
    {
      id: 3,
      message: "New account created: Althea Reyes",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: 4,
      message: "Document approved: Juan's diploma.png",
      time: "3 hours ago",
      isRead: true,
    },
    {
      id: 5,
      message: "System update completed",
      time: "1 day ago",
      isRead: true,
    },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navbar */}
      <div className="w-[4.8rem] bg-[#125e20] flex flex-col items-center py-4">
        <div className="sideBar">
          <img src="./Images/CCIS.png" alt="" className="logo w-10 h-10 mb-6" />
          <Link href="/Faculty-Homepage">
            <div className="homeIcon p-2 hover:bg-green-700 rounded-md cursor-pointer mb-6">
              <House color="#ffffff" strokeWidth={2} />
            </div>
          </Link>
          <Link href="/Faculty-Compliance">
            <div className="complianceIcon p-2 hover:bg-green-700 rounded-md cursor-pointer mb-6">
              <File color="#ffffff" strokeWidth={2} />
            </div>
          </Link>
          <div className="analyticsIcon p-2 hover:bg-green-700 rounded-md cursor-pointer mb-6">
            <ChartColumnBig color="#ffffff" strokeWidth={2} />
          </div>
          <div className="settingsIcon p-2 hover:bg-green-700 rounded-md cursor-pointer">
            <Cog color="#ffffff" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="h-17 border-b p-4 flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center">
            <div className="relative w-64">
              <h1 className="text-[#125e20] text-[2.5rem] font-bold ml-2">
                Good Day!
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              <button
                className="text-gray-600 hover:text-gray-800 relative"
                onClick={toggleNotifications}
              >
                <Bell size={22} />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20 border border-gray-200">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold text-green-800">
                      Notifications
                    </h3>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotifications(false);
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.isRead ? "bg-green-50" : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className="text-sm text-green-800 font-medium">
                              {notification.message}
                            </p>
                            {!notification.isRead && (
                              <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-center border-t border-gray-200">
                    <button className="text-sm text-green-800 hover:text-green-900 font-medium">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-sm font-semibold text-gray-600">JP</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-1">
              {/* Needs Action */}
              <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-lg font-medium text-green-800 mb-2">
                  Needs Action
                </h2>
                <hr className="mb-4" />
                <ul className="space-y-2">
                  {Array(5)
                    .fill("Juan submitted diploma.png")
                    .map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-800 mr-2">•</span>
                        <span className="text-green-800">{item}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Compliance Status */}
              <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-lg font-medium text-green-800 mb-2">
                  Compliance Status
                </h2>
                <hr className="mb-4" />
                <div className="space-y-4">
                  {[
                    { label: "Personal Information", percent: 50 },
                    { label: "Education Background", percent: 80 },
                  ].map(({ label, percent }, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-green-800">
                        <span>{label}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-800 h-2 rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Actions */}
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h2 className="text-lg font-medium text-green-800 mb-2">
                  Recent Actions
                </h2>
                <hr className="mb-4" />
                <ul className="space-y-2">
                  {[
                    "Uploaded Diploma.png",
                    "Submitted Accreditation",
                    "Updated Educational Background",
                    "Updated Profile Picture",
                    "Updated Personal Background",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-800 mr-2">•</span>
                      <span className="text-green-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Middle + Right Columns */}
            <div className="col-span-2">
              <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h2 className="text-lg font-medium text-green-800">
                      College of Computing and Information Sciences
                    </h2>
                    <p className="text-gray-500 text-sm">June 1, 2025</p>
                  </div>
                </div>
                <div className="bg-green-100 h-64 rounded-md">
                  <img src="./Images/Event.jpg" className=" w-full h-64 object-cover" alt="" />
                </div>
                <h2 className="text-xl font-medium text-green-800 mb-2">
                  CCIS Off-Camping Outreach Program
                </h2>
                <p className="text-gray-600 mb-4">
                  The CCIS Off-Campus Outreach Program is a community-centered
                  initiative led by the College of Computing and Information
                  Sciences. It aims to extend the college's knowledge, skills,
                  and services beyond the campus by engaging...
                </p>
                <div className="flex gap-4">
                  <button className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full">
                    Interested
                  </button>
                  <button className="border border-green-800 text-green-800 py-2 px-4 rounded-md hover:bg-green-50 w-full">
                    Not Interested
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h2 className="text-xl font-medium text-green-800 mb-4 text-center">
                    Generate Curriculum Vitae
                  </h2>
                  <button className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full">
                    Generate
                  </button>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h2 className="text-xl font-medium text-green-800 mb-4 text-center">
                    Generate Report
                  </h2>
                  <button className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;
