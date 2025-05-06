'use client'; // Add this if using Next.js App Router
import React, { useState } from 'react';
import Link from 'next/link';
import { House, UserRound, ListCheck, Cog, X, Clock, Check, Bell } from 'lucide-react';
import "./adminHomepage.css";

const AdminHomePage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const recentSubmissions = [
    { name: 'Dellosa', document: 'diploma.png' },
    { name: 'Dorin', document: 'diploma.png' },
    { name: 'Pahayahay', document: 'diploma.png' },
    { name: 'Edgar', document: 'diploma.png' },
    { name: 'Dela Cruz', document: 'diploma.png' },
    { name: 'Juan', document: 'diploma.png' },
  ];

  const recentAccounts = [
    'Althea Reyes',
    'Miguel Santos',
    'Lorenzo Dela Cruz',
    'Isabela Navarro',
    'Joaquin Mendoza',
  ];
  
  const notifications = [
    { id: 1, message: 'Dellosa submitted diploma.png', time: '5 minutes ago', isRead: false },
    { id: 2, message: 'Dorin submitted diploma.png', time: '10 minutes ago', isRead: false },
    { id: 3, message: 'New account created: Althea Reyes', time: '1 hour ago', isRead: true },
    { id: 4, message: 'Document approved: Juan\'s diploma.png', time: '3 hours ago', isRead: true },
    { id: 5, message: 'System update completed', time: '1 day ago', isRead: true },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex h-screen">
      {showNotifications && (
        <div 
          className="fixed inset-0 bg-opacity-30 z-10"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
      
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
                      <div>
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.isRead ? 'bg-green-50' : ''}`}
                          >
                            <div className="flex justify-between">
                              <p className="text-sm text-green-800 font-medium">{notification.message}</p>
                              {!notification.isRead && (
                                <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
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
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-sm font-semibold text-gray-600">JP</span>
            </div>
          </div>
        </div>
        
        <div className="flex p-6 gap-6 flex-1">
          <div className="w-1/3 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-green-800 text-lg font-bold mb-2">Recently Submitted</h2>
              <hr className="border-gray-200 mb-4" />
              <ul className="space-y-2">
                {recentSubmissions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-800 mr-2">•</span>
                    <p className="text-green-800">{item.name} submitted {item.document}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-green-800 text-lg font-bold mb-2">Recently Created Account</h2>
              <hr className="border-gray-200 mb-4" />
              <ul className="space-y-2">
                {recentAccounts.map((name, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-800 mr-2">•</span>
                    <p className="text-green-800">{name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-2/3">
            <div className="bg-white rounded-lg shadow p-6 h-full">
              {/* Improved Compliance Status Section */}
              <h2 className="text-green-800 text-2xl font-bold text-center mb-8">Compliance Status</h2>
              
              <div className="flex justify-between items-start px-6 mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-3">
                    <X color="white" size={32} />
                  </div>
                  <p className="text-green-800 font-medium mb-1">Disapproved</p>
                  <p className="text-4xl font-bold text-green-800">2344</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-3">
                    <Clock color="white" size={32} />
                  </div>
                  <p className="text-green-800 font-medium mb-1">Pending Approval</p>
                  <p className="text-4xl font-bold text-green-800">2344</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center mb-3">
                    <Check color="white" size={32} />
                  </div>
                  <p className="text-green-800 font-medium mb-1">Approved</p>
                  <p className="text-4xl font-bold text-green-800">2344</p>
                </div>
              </div>

              {/* Improved Analytics Cards */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-100 rounded-lg shadow p-5 text-center">
                  <p className="text-green-800 font-medium mb-2">Total Faculty</p>
                  <p className="text-3xl font-bold text-green-800">486</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg shadow p-5 text-center">
                  <p className="text-green-800 font-medium mb-2">Submissions This Week</p>
                  <p className="text-3xl font-bold text-green-800">92</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg shadow p-5 text-center">
                  <p className="text-green-800 font-medium mb-2">Most Compliant Dept</p>
                  <p className="text-2xl font-bold text-green-800">Computer Science</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg shadow p-5 text-center">
                  <p className="text-green-800 font-medium mb-2">Total Documents</p>
                  <p className="text-3xl font-bold text-green-800">1370</p>
                </div>
              </div>

              {/* Improved Report Button */}
              <div className="flex justify-center">
                <button className="bg-green-800 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow text-lg flex">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;