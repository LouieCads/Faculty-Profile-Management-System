"use client";

import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useChainId,
  useReadContract,
} from "wagmi";
import { contractAddresses, abi } from "../constants";

const EducationalBackground = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const contractAddress = contractAddresses[chainId.toString()]?.[0];

  // State for form data
  const [formData, setFormData] = useState({
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

  // Fetch Educational Background from the smart contract
  const {
    data: educationalInfo,
    isLoading: isEducationalInfoLoading,
    error: educationalInfoError,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getEducationalBackground",
    args: [address], // Use connected wallet address
    enabled: !!address && isConnected, // Only fetch if connected
  });

  // Update formData when educationalInfo is fetched
  useEffect(() => {
    if (educationalInfo && educationalInfo[9]) {
      // Check if exists == true
      setFormData((prev) => ({
        ...prev,
        elementarySchoolName: educationalInfo[0],
        elementaryDateGraduated: educationalInfo[1],
        elementaryAddress: educationalInfo[2],
        highschoolSchoolName: educationalInfo[3],
        highschoolDateGraduated: educationalInfo[4],
        highschoolAddress: educationalInfo[5],
        collegeSchoolName: educationalInfo[6],
        collegeDateGraduated: educationalInfo[7],
        collegeAddress: educationalInfo[8],
      }));
    }
  }, [educationalInfo]);

  // Get status
  const getStatus = () => {
    if (!educationalInfo || !educationalInfo[9]) return "Not Submitted";
    return educationalInfo[10] ? "Approved" : "Pending";
  };

  const status = getStatus();

  const { isPending, writeContract } = useWriteContract({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitEducationalBackground = async (e) => {
    e.preventDefault();
    try {
      await writeContract({
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
      alert("Educational Background submitted successfully!");
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
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold text-green-800 mb-6 border-b pb-2 flex justify-center">
        Educational Background
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
        {educationalInfoError && (
          <p className="text-red-500 text-sm mt-2">
            Error fetching data: Educational Background not submitted
          </p>
        )}
        {isEducationalInfoLoading && (
          <p className="text-gray-500 text-sm mt-2">Loading...</p>
        )}
      </div>

      {/* Display Fetched Data */}
      {educationalInfo && educationalInfo[9] && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Submitted Educational Background
          </h3>

          {/* Elementary Section */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-green-700 mb-2">
              Elementary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[0]}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[2]}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Graduated
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[1]}
                </p>
              </div>
            </div>
          </div>

          {/* High School Section */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-green-700 mb-2">
              High School
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[3]}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[5]}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Graduated
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[4]}
                </p>
              </div>
            </div>
          </div>

          {/* College Section */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-green-700 mb-2">College</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[6]}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[8]}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Graduated
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  {educationalInfo[7]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form for Submission/Edit */}
      {!educationalInfo || !educationalInfo[9] || !educationalInfo[10] ? (
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            {educationalInfo && educationalInfo[9]
              ? "Edit Educational Background"
              : "Submit Educational Background"}
          </h3>

          {/* Elementary Section */}
          <div className="mb-8">
            <h4 className="text-md font-medium text-green-700 mb-4">
              Elementary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  name="elementarySchoolName"
                  value={formData.elementarySchoolName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Elementary School"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="elementaryAddress"
                  value={formData.elementaryAddress}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Graduated
                </label>
                <input
                  type="text"
                  name="elementaryDateGraduated"
                  value={formData.elementaryDateGraduated}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
          </div>

          {/* High School Section */}
          <div className="mb-8">
            <h4 className="text-md font-medium text-green-700 mb-4">
              High School
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  name="highschoolSchoolName"
                  value={formData.highschoolSchoolName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="High School"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="highschoolAddress"
                  value={formData.highschoolAddress}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Graduated
                </label>
                <input
                  type="text"
                  name="highschoolDateGraduated"
                  value={formData.highschoolDateGraduated}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
          </div>

          {/* College Section */}
          <div className="mb-8">
            <h4 className="text-md font-medium text-green-700 mb-4">College</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  name="collegeSchoolName"
                  value={formData.collegeSchoolName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="College Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="collegeAddress"
                  value={formData.collegeAddress}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Graduated
                </label>
                <input
                  type="text"
                  name="collegeDateGraduated"
                  value={formData.collegeDateGraduated}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmitEducationalBackground}
              disabled={isPending}
              className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">
          Your educational background is approved and cannot be edited.
        </p>
      )}
    </div>
  );
};

export default EducationalBackground;
