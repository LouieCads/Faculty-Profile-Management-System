// Admin_Submmission-Review
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  User,
  BookOpen,
  Briefcase,
  BadgeCheck,
  ClipboardList,
  File,
  FileText,
  House,
  ChartColumnBig,
  Cog,
  Check,
  XCircle,
  Search,
  Trash,
} from "lucide-react";

const AdminSubmissionReview = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("documents");

  const [facultySubmissions, setFacultySubmissions] = useState([
    {
      id: 1,
      name: "Juan Dela Cruz",
      idNumber: "K12150411",
      email: "elor.k12150411@umak.edu.ph",
      status: "pending",
    },
    {
      id: 2,
      name: "Maria Santos",
      idNumber: "K12150412",
      email: "santos.k12150412@umak.edu.ph",
      status: "pending",
    },
    {
      id: 3,
      name: "Pedro Reyes",
      idNumber: "K12150413",
      email: "reyes.k12150413@umak.edu.ph",
      status: "pending",
    },
    {
      id: 4,
      name: "Ana Gonzales",
      idNumber: "K12150414",
      email: "gonzales.k12150414@umak.edu.ph",
      status: "approved",
    },
    {
      id: 5,
      name: "Carlos Mendoza",
      idNumber: "K12150415",
      email: "mendoza.k12150415@umak.edu.ph",
      status: "approved",
    },
    {
      id: 6,
      name: "Elena Torres",
      idNumber: "K12150416",
      email: "torres.k12150416@umak.edu.ph",
      status: "disapproved",
    },
  ]);

  const counts = useMemo(() => {
    return {
      pending: facultySubmissions.filter((s) => s.status === "pending").length,
      approved: facultySubmissions.filter((s) => s.status === "approved")
        .length,
      disapproved: facultySubmissions.filter((s) => s.status === "disapproved")
        .length,
    };
  }, [facultySubmissions]);

  const tabs = [
    { id: "all", label: "All", count: facultySubmissions.length },
    { id: "pending", label: "Pending", count: counts.pending },
    { id: "approved", label: "Approved", count: counts.approved },
    { id: "disapproved", label: "Disapproved", count: counts.disapproved },
  ];

  const navItems = [
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

  const handleApprove = (id) => {
    setFacultySubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === id
          ? { ...submission, status: "approved" }
          : submission
      )
    );
  };

  const handleReject = (id) => {
    setFacultySubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === id
          ? { ...submission, status: "disapproved" }
          : submission
      )
    );
  };

  const filteredSubmissions = useMemo(() => {
    return facultySubmissions
      .filter((submission) =>
        activeTab === "all" ? true : submission.status === activeTab
      )
      .filter(
        (submission) =>
          searchQuery === "" ||
          submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          submission.idNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          submission.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [facultySubmissions, activeTab, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
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

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-semibold text-green-800">
            Hello Jayson!
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-800 rounded-full"></div>
          </div>
        </div>

        {/* Top Navigation Bar */}
        <div className="bg-white border border-green-700 rounded-lg mx-4 mt-4 overflow-x-auto">
          <div className="flex justify-between px-2 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNavItem(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[7px] whitespace-nowrap transition-colors ${
                  activeNavItem === item.id
                    ? "text-green-100 font-semibold bg-green-700"
                    : "text-gray-500 hover:text-green-700 hover:bg-green-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-green-800 text-center">
                SUBMISSION REVIEW
              </h2>
              <hr />
            </div>

            <div className="flex flex-row items-center justify-between mb-6">
              <div>
                <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-[1.3rem] px-4 py-2 ${
                        activeTab === tab.id
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6">
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
                <button className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors">
                  Add User
                </button>
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((faculty) => (
                  <div
                    key={faculty.id}
                    className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4"
                  >
                    <div className="border border-gray-300 rounded-md p-4 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-[1.3rem] font-semibold text-green-800">
                          {faculty.name}
                        </h3>
                        <p className="text-gray-600 text-[0.9rem]">
                          {faculty.idNumber}
                        </p>
                        <p className="text-gray-600 text-[0.9rem]">
                          {faculty.email}
                        </p>
                        {activeTab === "all" && (
                          <p className="text-sm mt-2 text-gray-600">
                            Status:{" "}
                            <span
                              className={`font-semibold ${
                                faculty.status === "approved"
                                  ? "text-green-600"
                                  : faculty.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {faculty.status.toUpperCase()}
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <button className="text-gray-600 text-[0.8rem] font-semibold cursor-pointer hover:text-gray-800">
                          View more...
                        </button>
                        {activeTab !== "all" && (
                          <div className="space-x-4">
                            {activeTab === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(faculty.id)}
                                  className="px-3 py-2 bg-green-800 text-white rounded-md hover:bg-green-600"
                                >
                                  <Check size={20} />
                                </button>
                                <button
                                  onClick={() => handleReject(faculty.id)}
                                  className="px-3 py-2 bg-red-800 text-white rounded-md hover:bg-red-600"
                                >
                                  <Trash size={20} />
                                </button>
                              </>
                            )}
                            {activeTab === "approved" && (
                              <button
                                onClick={() => handleReject(faculty.id)}
                                className="px-3 py-2 bg-red-800 text-white rounded-md hover:bg-red-600"
                              >
                                <Trash size={20} />
                              </button>
                            )}
                            {activeTab === "disapproved" && (
                              <button
                                onClick={() => handleApprove(faculty.id)}
                                className="px-3 py-2 bg-green-800 text-white rounded-md hover:bg-green-600"
                              >
                                <Check size={20} />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center p-8 text-gray-500">
                  No submissions found in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissionReview;
