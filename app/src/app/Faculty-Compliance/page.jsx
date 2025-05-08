"use client";
// Faculty Compliance

import React, { useState, useEffect } from "react";
import Link from "next/link";
import EducationalBackground from "./EducationalBackground";
import WorkExperiences from "./WorkExperiences";
import TeachingAssignments from "./TeachingAssignments";
import LicensesAndCertifications from "./LicensesAndCertifications";
import ResearchOutputs from "./ResearchOutputs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
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
} from "lucide-react";
import {
  useAccount,
  useWriteContract,
  useChainId,
  useReadContract,
} from "wagmi";
import { contractAddresses, abi } from "../constants";

// import "./facultyCompliance.css";

const FacultyForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [activeNavItem, setActiveNavItem] = useState("personal");
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const contractAddress = contractAddresses[chainId.toString()]?.[0];

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthday: "",
    civilStatus: "",
    address: "",
    contactNo: "",
    email: "",
    telNo: "",
    elementarySchoolName: "",
    elementaryAddress: "",
    elementaryDateGraduated: "",
    highschoolSchoolName: "",
    highschoolAddress: "",
    highschoolDateGraduated: "",
    collegeSchoolName: "",
    collegeAddress: "",
    collegeDateGraduated: "",
  });

  // Fetch PersonalInfo from the smart contract
  const {
    data: personalInfo,
    isLoading: isPersonalInfoLoading,
    error: personalInfoError,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getPersonalInfo",
    args: [address], // Use connected wallet address
    enabled: !!address && isConnected, // Only fetch if connected
  });

  // Update formData when personalInfo is fetched
  useEffect(() => {
    if (personalInfo && personalInfo[8]) {
      // Check if exists == true
      setFormData((prev) => ({
        ...prev,
        firstName: personalInfo[0],
        middleName: personalInfo[1],
        lastName: personalInfo[2],
        suffix: personalInfo[3],
        birthday: personalInfo[4],
        civilStatus: personalInfo[5],
        address: personalInfo[6],
      }));
    }
  }, [personalInfo]);

  // Get status
  const getStatus = () => {
    if (!personalInfo || !personalInfo[8]) return "Not Submitted";
    return personalInfo[7] ? "Approved" : "Pending";
  };

  const status = getStatus();

  const { data, isLoading, isSuccess, isError, isPending, writeContract } =
    useWriteContract({});

  const navItems = [
    { id: "personal", label: "Personal Information", icon: <User size={18} /> },
    {
      id: "educational",
      label: "Educational Background",
      icon: <BookOpen size={18} />,
    },
    { id: "experiences", label: "Experiences", icon: <Briefcase size={18} /> },
    { id: "licenses", label: "Credentials", icon: <BadgeCheck size={18} /> },
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
    setActiveNavItem(tabId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitPersonalInfo = async (e) => {
    e.preventDefault();
    try {
      writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "submitPersonalInfo",
        args: [
          formData.firstName,
          formData.middleName,
          formData.lastName,
          formData.suffix,
          formData.birthday,
          formData.civilStatus,
          formData.address,
        ],
        chainId: chainId,
      });
    } catch (error) {
      console.error("Error submitting form to contract:", error);
      alert(`Error submitting form: ${error.message || error}`);
    }
  };

  const handleSubmitEducationalBackground = async (e) => {
    e.preventDefault();
    try {
      writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "submitEducationalBackground",
        args: [
          formData.elementarySchoolName,
          formData.elementaryDateGraduated,
          formData.elementaryAddress,
          formData.highschoolSchoolName,
          formData.highschoolDateGraduated,
          formData.highschoolAddress,
          formData.collegeSchoolName,
          formData.collegeDateGraduated,
          formData.collegeAddress,
        ],
        chainId: chainId,
      });
    } catch (error) {
      console.error(
        "Error submitting educational background to contract:",
        error
      );
      alert(
        `Error submitting educational background: ${error.message || error}`
      );
    }
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
          <h1 className="text-[#125e20] text-[2.5rem] font-bold ml-2">
            Good Day!
          </h1>
          <ConnectButton
            label="Connect"
            accountStatus="address"
            chainStatus="icon"
            showBalance={false}
          />
        </div>

        {/* Conditional Content */}
        {isConnected ? (
          <>
            {/* Top Navigation Bar (Replaced Tab Navigation with this) */}
            <div className="bg-white border border-green-700 rounded-lg mx-4 mt-4 overflow-x-auto">
              <div className="flex justify-between px-2 py-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
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

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === "personal" && (
                  <div>
                    <h2 className="text-xl font-bold text-green-800 mb-6 border-b pb-2 flex justify-center">
                      Personal Information
                    </h2>

                    {/* Status Display */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-green-800">
                        Status:
                        <span
                          className={`ml-2 px-2 py-1 rounded ${
                            status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {status}
                        </span>
                      </p>
                      {isPersonalInfoLoading && (
                        <p className="text-gray-500 text-sm mt-2">Loading...</p>
                      )}
                    </div>

                    {/* Display Fetched Data */}
                    {personalInfo && personalInfo[8] && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-green-700 mb-4">
                          Submitted Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-green-800 mb-1">
                              First Name
                            </label>
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                              {personalInfo[0]}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-800 mb-1">
                              Last Name
                            </label>
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                              {personalInfo[2]}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-800 mb-1">
                              Middle Name
                            </label>
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                              {personalInfo[1]}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-800 mb-1">
                              Suffix
                            </label>
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                              {personalInfo[3]}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-800 mb-1">
                              Birthday
                            </label>
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                              {personalInfo[4]}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-800 mb-1">
                              Civil Status
                            </label>
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                              {personalInfo[5]}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-800 mb-1">
                              Address
                            </label>
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                              {personalInfo[6]}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form for Submission/Edit */}
                    {!personalInfo || !personalInfo[8] || !personalInfo[7] ? (
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-4">
                          {personalInfo && personalInfo[8]
                            ? "Edit Personal Information"
                            : "Submit Personal Information"}
                        </h3>
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
                              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                              placeholder="YYYY-MM-DD"
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
                              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                          </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                          <button
                            onClick={handleSubmitPersonalInfo}
                            disabled={isPending}
                            className={`bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors ${
                              isPending ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {isPending ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 mt-4">
                        Your personal information is approved and cannot be
                        edited.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "educational" && <EducationalBackground />}
                {activeTab === "experiences" && <WorkExperiences />}
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
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
              <div className="text-red-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 0V7m0 2h2m-2 0H9"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-green-800 mb-4">
                Wallet Not Connected
              </h2>
              <p className="text-gray-600 mb-6">
                Please connect your wallet to access the faculty compliance
                forms and submission features.
              </p>
            </div>
          </div>
        )}
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
