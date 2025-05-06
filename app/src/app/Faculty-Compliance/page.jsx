"use client";
// Faculty Compliance

import React, { useState } from "react";
import Link from "next/link";
import TeachingAssignments from "./TeachingAssignments";
import LicensesAndCertifications from "./LicensesAndCertifications";
import ResearchOutputs from "./ResearchOutputs";
import {
  User,
  BookOpen,
  Briefcase,
  BadgeCheck,
  ClipboardList,
  File,
  House,
  ChartColumnBig,
  Cog,
  FileText,
  BarChart2,
  Settings,
  Bell,
  Search,
} from "lucide-react";

import "./facultyCompliance.css";

const FacultyForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    firstName: "Juan",
    lastName: "Dela Cruz",
    middleName: "Juan",
    suffix: "Juan",
    birthday: "07/27/2004",
    sex: "Male",
    civilStatus: "Married",
    address: "Makati City",
    contactNo: "09672411911",
    telNo: "Dela Cruz",
    email: "jayson@gmail.com",
    gsisNo: "09672411911",
    sssNo: "Dela Cruz",
    philHealthNo: "jayson@gmail.com",
    pagIbigNo: "Dela Cruz",
  });

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      message: "Your personal information has been updated",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Please complete your teaching assignments section",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      message: "Document review completed",
      time: "2 days ago",
      read: true,
    },
  ];

  const tabs = [
    { id: "personal", label: "Personal Information", icon: <User size={18} /> },
    {
      id: "educational",
      label: "Educational Background",
      icon: <BookOpen size={18} />,
    },
    { id: "experiences", label: "Experiences", icon: <Briefcase size={18} /> },
    {
      id: "licenses",
      label: "Credentials",
      icon: <BadgeCheck size={18} />,
    },
    {
      id: "teaching",
      label: "Teaching Assignments",
      icon: <ClipboardList size={18} />,
    },
    { id: "research", label: "Research Outputs", icon: <FileText size={18} /> },
    { id: "documents", label: "Documents", icon: <File size={18} /> },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Close profile dropdown if open
    if (showProfile) setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    // Close notifications if open
    if (showNotifications) setShowNotifications(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-[4.8rem] bg-[#125e20] flex flex-col items-center py-4">
        <div className="sideBar">
          <img src="./Images/CCIS.png" alt="" className="logo w-10 h-10 mb-6" />
          <Link href="/Faculty-Homepage">
            <div className="homeIcon p-2 hover:bg-green-700 rounded-md cursor-pointer mb-6">
              <House color="#ffffff" strokeWidth={2} />
            </div>
          </Link>

          <Link href="/Faculty-Compliance">
            <div className="complianceIcon p-2 bg-green-700 rounded-md cursor-pointer mb-6">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white p-4 shadow-md flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-green-800">
              Hello Jayson!
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={18} />
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <Bell size={20} className="text-gray-700" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className="text-sm text-gray-700">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-200 text-center">
                    <button className="text-sm text-green-600 hover:text-green-800">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="w-8 h-8 bg-green-800 rounded-full cursor-pointer"
              ></button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700">
                      Jayson Dela Cruz
                    </h3>
                    <p className="text-xs text-gray-500">jayson@gmail.com</p>
                  </div>
                  <div>
                    <Link href="/profile">
                      <div className="p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="text-sm text-gray-700">
                          My Profile
                        </span>
                      </div>
                    </Link>
                    <Link href="/settings">
                      <div className="p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="text-sm text-gray-700">Settings</span>
                      </div>
                    </Link>
                    <div className="p-3 border-t border-gray-200 hover:bg-gray-50 cursor-pointer">
                      <span className="text-sm text-gray-700">Sign Out</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border border-green-700 rounded-lg mx-4 mt-4 overflow-x-auto">
          <div className="flex justify-between px-2 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[7px] whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-green-100 font-semibold bg-green-700"
                    : "text-gray-500 hover:text-green-700 hover:bg-green-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === "personal" && (
              <div>
                <h2 className="text-xl font-bold text-green-800 mb-6 border-b pb-2 flex justify-center">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Suffix
                    </label>
                    <input
                      type="text"
                      name="suffix"
                      value={formData.suffix}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Birthday
                    </label>
                    <input
                      type="text"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Sex
                    </label>
                    <input
                      type="text"
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Civil Status
                    </label>
                    <input
                      type="text"
                      name="civilStatus"
                      value={formData.civilStatus}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-green-800 mt-8 mb-6 border-b pb-2  flex justify-center">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1 ">
                      Contact No.
                    </label>
                    <input
                      type="text"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Tel No.
                    </label>
                    <input
                      type="text"
                      name="telNo"
                      value={formData.telNo}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {activeTab === "educational" && (
              <div className="p-4 bg-white rounded-lg">
                <h2 className="text-xl font-semibold text-green-800 mb-6">
                  Educational Background
                </h2>

                {/* Elementary Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-green-700 mb-4">
                    Elementary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500 "
                        placeholder="Elementary School"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="Makati City"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Graduated
                      </label>
                      <input
                        type="text"
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Highschool Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-green-700 mb-4">
                    Highschool
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="High School"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="Makati City"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Graduated
                      </label>
                      <input
                        type="text"
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* College Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-green-700 mb-4">
                    College
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="College Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="Makati City"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Graduated
                      </label>
                      <input
                        type="text"
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Add Button */}
                <div className="flex justify-center mb-6">
                  <button
                    className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                    onClick={() => {
                      /* Add education entry logic */
                    }}
                  >
                    Add
                  </button>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => {
                      /* Submit form logic */
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            {activeTab === "experiences" && (
              <div className="p-4 bg-white rounded-lg">
                <h2 className="text-xl font-semibold text-green-800 mb-6">
                  Work Experiences
                </h2>

                {/* Company 1 Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-green-700 mb-4">
                    Company 1
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="J.P. Morgan & Co."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Senior Security Developer"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years Served
                      </label>
                      <input
                        type="number"
                        className="w-1/2 p-2 border border-gray-300 rounded-md"
                        placeholder="12"
                      />
                    </div>
                  </div>
                </div>

                {/* Company 2 Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-green-700 mb-4">
                    Company 2
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="J.P. Morgan & Co."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Senior Security Developer"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years Served
                      </label>
                      <input
                        type="number"
                        className="w-1/2 p-2 border border-gray-300 rounded-md"
                        placeholder="12"
                      />
                    </div>
                  </div>
                </div>

                {/* Add Button */}
                <div className="flex justify-center mb-6">
                  <button
                    className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                    onClick={() => {
                      /* Add experience entry logic */
                    }}
                  >
                    Add
                  </button>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => {
                      /* Submit form logic */
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {activeTab === "licenses" && <LicensesAndCertifications />}
            {activeTab === "teaching" && <TeachingAssignments />}
            {activeTab === "research" && <ResearchOutputs />}

            {activeTab === "documents" && (
              <div>
                <h2 className="text-xl font-semibold text-green-800 mb-6">
                  Documents
                </h2>
                <p className="text-gray-600">
                  Documents form content will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tab-content {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FacultyForm;
