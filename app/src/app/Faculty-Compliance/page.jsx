"use client";

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
} from "lucide-react";

import "./facultyCompliance.css";

const FacultyForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
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
    label: "Licenses and Certifications",
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-[4.8rem] bg-[#125e20] flex flex-col items-center py-4">
        <div className="sideBar">
          <img src="./Images/CCIS.png" alt="" className="logo" />
          <Link href="/Faculty-Homepage">
            <div className="homeIcon">
              <House color="#ffffff" strokeWidth={2} />
            </div>
          </Link>

          <Link href="/Faculty-Compliance">
            <div className="complianceIcon">
              <File color="#ffffff" strokeWidth={2} />
            </div>
          </Link>
          <div className="analyticsIcon">
            <ChartColumnBig color="#ffffff" strokeWidth={2} />
          </div>
          <div className="settingsIcon">
            <Cog color="#ffffff" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-semibold text-green-800">
            Hello Jayson!
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-800 rounded-full"></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="overflow-x-auto bg-white border-b">
          <div className="flex whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700"
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

                <h2 className="text-xl font-bold text-green-800 mt-8 mb-6 border-b pb-2  flex justify-center">
                  Other Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      GSIS No.
                    </label>
                    <input
                      type="text"
                      name="gsisNo"
                      value={formData.gsisNo}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      SSS No.
                    </label>
                    <input
                      type="text"
                      name="sssNo"
                      value={formData.sssNo}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      PhilHealth No.
                    </label>
                    <input
                      type="text"
                      name="philHealthNo"
                      value={formData.philHealthNo}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">
                      Pag-Ibig No.
                    </label>
                    <input
                      type="text"
                      name="pagIbigNo"
                      value={formData.pagIbigNo}
                      onChange={handleChange}
                      className="w-full border focus:text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-md px-3 py-2"
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
