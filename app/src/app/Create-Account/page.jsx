"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./createAccount.css";
import { House, UserRound, ListCheck, Cog, X, Clock, Check, Bell, ChevronDown } from 'lucide-react';

const Page = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [role, setRole] = useState("Professor");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const notifications = [
    { id: 1, message: "Dellosa submitted diploma.png", time: "5 minutes ago", isRead: false },
    { id: 2, message: "Dorin submitted diploma.png", time: "10 minutes ago", isRead: false },
    { id: 3, message: "New account created: Althea Reyes", time: "1 hour ago", isRead: true },
    { id: 4, message: "Document approved: Juan's diploma.png", time: "3 hours ago", isRead: true },
    { id: 5, message: "System update completed", time: "1 day ago", isRead: true },
  ];

  const roles = ["Professor", "Student", "Admin", "Staff"];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleRoleDropdown = () => {
    setShowRoleDropdown(!showRoleDropdown);
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    setShowRoleDropdown(false);
  };

  const handleClear = () => {
    // Clear all form fields
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
    setRole("Professor");
  };

  return (
    <div className="containers flex h-screen bg-white">
      <div className="leftContainer">
        <div className="sideBar">
          <img src="./Images/CCIS.png" alt="" className="logo" />
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
          <Link href="Admin-Settings">
          <div className="settingsIcon">
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

        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-md shadow-sm p-8 relative">
            <div className="absolute top-5 left-5">
              <Link href="/Account-Management">
                <button className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700">
                  Back
                </button>
              </Link>
            </div>
            
            <div className="text-center mb-5">
              <h1 className="text-2xl font-bold text-green-800">Create an Account</h1>
            </div>
            
            <hr className="border-gray-300 mb-6" />
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1" htmlFor="idNumber">
                    ID Number
                  </label>
                  <input 
                    type="text" 
                    id="idNumber" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-800" 
                    placeholder="Enter ID number" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1" htmlFor="firstName">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-800" 
                    placeholder="Enter first name" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1" htmlFor="middleName">
                    Middle Name
                  </label>
                  <input 
                    type="text" 
                    id="middleName" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-800" 
                    placeholder="Enter middle name" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1" htmlFor="lastName">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-800" 
                    placeholder="Enter last name" 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1" htmlFor="email">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-800" 
                    placeholder="Enter email address" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1" htmlFor="suffix">
                    Suffix
                  </label>
                  <input 
                    type="text" 
                    id="suffix" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-800" 
                    placeholder="Enter suffix (if any)" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1" htmlFor="contactNo">
                    Contact No.
                  </label>
                  <input 
                    type="tel" 
                    id="contactNo" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-800" 
                    placeholder="Enter contact number" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1" htmlFor="role">
                    Role
                  </label>
                  <div className="relative">
                    <div 
                      className="w-full border border-gray-300 rounded-md px-4 py-2 flex justify-between items-center cursor-pointer"
                      onClick={toggleRoleDropdown}
                    >
                      <span>{role}</span>
                      <ChevronDown size={18} />
                    </div>
                    
                    {showRoleDropdown && (
                      <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
                        {roles.map((r) => (
                          <div 
                            key={r} 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectRole(r)}
                          >
                            {r}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-10">
              <button 
                className="px-12 py-2 border border-gray-300 rounded-md hover:bg-gray-100 w-36"
                onClick={handleClear}
              >
                Clear
              </button>
              <button className="px-12 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 w-36">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;