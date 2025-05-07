"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./settings.css";
import { House, UserRound, ListCheck, Cog, X, Bell, Download, Edit, Archive, HelpCircle, AlertCircle, Settings } from 'lucide-react';

const SettingsPage = () => {
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
          <Link href="/Settings">
            <div className="settingsIcon active">
              <Cog color="#ffffff" strokeWidth={2} />
            </div>
          </Link>
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
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Download Reports Card */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Download color="#166534" size={24} />
                </div>
                <h3 className="text-lg font-medium text-green-800 ml-4">Download Reports</h3>
              </div>
              <p className="text-green-600 mb-4">Export and download reports in various formats for your records and analysis</p>
              <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
                Access Reports
              </button>
            </div>

            {/* Edit Forms Card */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Edit color="#166534" size={24} />
                </div>
                <h3 className="text-lg font-medium text-green-800 ml-4">Edit Forms</h3>
              </div>
              <p className="text-green-600 mb-4">Customize and manage form templates and questionnaires for data collection</p>
              <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
                Manage Forms
              </button>
            </div>

            {/* Archives Card */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Archive color="#166534" size={24} />
                </div>
                <h3 className="text-lg font-medium text-green-800 ml-4">Archives</h3>
              </div>
              <p className="text-green-600 mb-4">Access and restore archived data, documents, and historical records</p>
              <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
                View Archives
              </button>
            </div>

            {/* System Preferences Card */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Settings color="#166534" size={24} />
                </div>
                <h3 className="text-lg font-medium text-green-800 ml-4">System Preferences</h3>
              </div>
              <p className="text-green-600 mb-4">Configure system settings, appearance, and general preferences</p>
              <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
                Configure System
              </button>
            </div>

            {/* Notifications Settings Card */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <AlertCircle color="#166534" size={24} />
                </div>
                <h3 className="text-lg font-medium text-green-800 ml-4">Notification Settings</h3>
              </div>
              <p className="text-green-600 mb-4">Configure your notification preferences and alert settings</p>
              <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
                Manage Notifications
              </button>
            </div>

            {/* Help & Support Card */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <HelpCircle color="#166534" size={24} />
                </div>
                <h3 className="text-lg font-medium text-green-800 ml-4">Help & Support</h3>
              </div>
              <p className="text-green-600 mb-4">Access documentation, FAQs, tutorials, and contact support</p>
              <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;