"use client";

import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useChainId,
  useReadContract,
} from "wagmi";
import { contractAddresses, abi } from "../constants";
import {
Trash
} from "lucide-react";

const WorkExperiences = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const contractAddress = contractAddresses[chainId.toString()]?.[0];

  // State for form data
  const [experiences, setExperiences] = useState([
    {
      companyName: "",
      position: "",
      yearsServed: "",
    },
  ]);

  // State for fetched data
  const [fetchedExperiences, setFetchedExperiences] = useState([]);

  // Fetch Work Experiences from the smart contract
  const {
    data: experiencesInfo,
    isLoading: isExperiencesLoading,
    error: experiencesError,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getWorkExperiences",
    args: [address], // Use connected wallet address
    enabled: !!address && isConnected, // Only fetch if connected
  });

  // Update experiences when data is fetched
  useEffect(() => {
    if (experiencesInfo && experiencesInfo.exists) {
      setFetchedExperiences(
        experiencesInfo.experiences.map((exp) => ({
          companyName: exp.companyName,
          position: exp.position,
          yearsServed: exp.yearsServed.toString(),
        }))
      );
    }
  }, [experiencesInfo]);

  // Get status
  const getStatus = () => {
    if (!experiencesInfo || !experiencesInfo.exists) return "Not Submitted";
    return experiencesInfo.approved ? "Approved" : "Pending";
  };

  const status = getStatus();

  const { isPending, writeContract } = useWriteContract({});

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [name]: value,
    };
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        companyName: "",
        position: "",
        yearsServed: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      const updatedExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(updatedExperiences);
    }
  };

  const handleSubmitWorkExperiences = async (e) => {
    e.preventDefault();
    try {
      // Format experiences for contract submission
      const companyNames = experiences.map((exp) => exp.companyName);
      const positions = experiences.map((exp) => exp.position);
      const yearsServed = experiences.map(
        (exp) => parseInt(exp.yearsServed) || 0
      );

      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "submitWorkExperiences",
        args: [companyNames, positions, yearsServed],
        chainId: chainId,
      });
      alert("Work Experiences submitted successfully!");
    } catch (error) {
      console.error("Error submitting work experiences to contract:", error);
      alert(`Error submitting work experiences: ${error.message || error}`);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold text-green-800 mb-6 border-b pb-2 flex justify-center">
        Work Experiences
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
        {experiencesError && (
          <p className="text-red-500 text-sm mt-2">
            Error fetching data: Work Experiences not submitted
          </p>
        )}
        {isExperiencesLoading && (
          <p className="text-gray-500 text-sm mt-2">Loading...</p>
        )}
      </div>

      {/* Display Fetched Data */}
      {fetchedExperiences.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Submitted Work Experiences
          </h3>

          {fetchedExperiences.map((exp, index) => (
            <div
              key={index}
              className="mb-6 p-4 border border-gray-200 rounded-lg"
            >
              <h4 className="text-md font-medium text-green-700 mb-3">
                Experience {index + 1}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                    {exp.companyName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                    {exp.position}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years Served
                  </label>
                  <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                    {exp.yearsServed}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form for Submission/Edit */}
      {!experiencesInfo ||
      !experiencesInfo.exists ||
      !experiencesInfo.approved ? (
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            {experiencesInfo && experiencesInfo.exists
              ? "Edit Work Experiences"
              : "Submit Work Experiences"}
          </h3>

          {experiences.map((experience, index) => (
            <div
              key={index}
              className="mb-8 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-md font-medium text-green-700">
                  Experience {index + 1}
                </h4>
                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-100 bg-red-600 p-[6px] rounded hover:bg-red-700 hover:text-[#ffff]"
                  >
                    <Trash />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={experience.companyName}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={experience.position}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Position Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years Served
                  </label>
                  <input
                    type="number"
                    name="yearsServed"
                    value={experience.yearsServed}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Number of years"
                    min="0"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Button */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={addExperience}
              className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
            >
              Add Experience
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmitWorkExperiences}
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
          Your work experiences are approved and cannot be edited.
        </p>
      )}
    </div>
  );
};

export default WorkExperiences;
