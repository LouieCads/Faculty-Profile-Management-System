"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./accountManagement.css";
import { House, UserRound, ListCheck, Cog, X, Bell, Pencil, Trash2 } from 'lucide-react';

const AccountManagementPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "Dellosa submitted diploma.png", time: "5 minutes ago", isRead: false },
    { id: 2, message: "Dorin submitted diploma.png", time: "10 minutes ago", isRead: false },
    { id: 3, message: "New account created: Althea Reyes", time: "1 hour ago", isRead: true },
    { id: 4, message: "Document approved: Juan's diploma.png", time: "3 hours ago", isRead: true },
    { id: 5, message: "System update completed", time: "1 day ago", isRead: true },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="containers flex h-screen bg-white">
      <div className="leftContainer">
        <div className="sideBar">
          <img src="./Images/CCIS.png" alt="CCIS Logo" className="logo" />
          <Link href="/Admin-Homepage">
            <div className="homeIcon">
              <House color="#ffffff" strokeWidth={2} />
            </div>
          </Link>
          <Link href="/Account-Management">
            <div className="complianceIcon">
              <UserRound color="#ffffff" strokeWidth={2} />
            </div>
          </Link>
          <div className="analyticsIcon">
            <ListCheck color="#ffffff" strokeWidth={2} />
          </div>
          <div className="settingsIcon">
            <Cog color="#ffffff" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="h-16 border-b px-6 flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                className="text-green-800 pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-800"
              />
              <div className="absolute left-3 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
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
                    <h3 className="font-semibold text-green-800">Notifications</h3>
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
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.isRead ? "bg-green-50" : ""}`}
                        >
                          <div className="flex justify-between">
                            <p className="text-sm text-green-800 font-medium">{notification.message}</p>
                            {!notification.isRead && (
                              <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
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

            {/* User Icon */}
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-sm font-semibold text-gray-600">JP</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Account Management</h2>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-medium text-green-600">
                All users <span className="text-green-700 ml-2">69</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="text-green-600 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-800"
                />
                <Link href="/Create-Account">
                  <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    Add User
                  </button>
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 ">
                    <th className="py-3 px-4 text-left font-medium text-green-800">Name</th>
                    <th className="py-3 px-4 text-left font-medium text-green-800">Email Address</th>
                    <th className="py-3 px-4 text-left font-medium text-green-800">Date Created</th>
                    <th className="py-3 px-4 text-left font-medium text-green-800">Status</th>
                    <th className="py-3 px-4 text-left font-medium text-green-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(8)].map((_, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 text-green-600">
                      <td className="py-3 px-4">Juan Dela Cruz</td>
                      <td className="py-3 px-4">JDelaCruz.k1234@umak.edu.ph</td>
                      <td className="py-3 px-4">05/21/2025</td>
                      <td className="py-3 px-4">
                        <span className={index % 2 === 0 ? "text-green-600" : "text-yellow-600"}>
                          {index % 2 === 0 ? "Active" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-green-600 hover:text-green-800">
                            <Pencil size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;