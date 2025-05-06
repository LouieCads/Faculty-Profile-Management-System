"use client";

import React, { useState } from "react";

const LicensesAndCertifications = () => {
  const [licenses, setLicenses] = useState([
    { id: 1, profession: "", dateAchieved: "", document: null },
    { id: 2, profession: "", dateAchieved: "", document: null },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentLicenseId, setCurrentLicenseId] = useState(null);

  // Add a new license entry
  const addLicense = () => {
    const newId =
      licenses.length > 0 ? Math.max(...licenses.map((l) => l.id)) + 1 : 1;
    setLicenses([
      ...licenses,
      { id: newId, profession: "", dateAchieved: "", document: null },
    ]);
  };

  // Handle input changes
  const handleChange = (id, field, value) => {
    setLicenses(
      licenses.map((license) =>
        license.id === id ? { ...license, [field]: value } : license
      )
    );
  };

  // Handle document upload
  const handleDocumentUpload = (id, file) => {
    setLicenses(
      licenses.map((license) =>
        license.id === id ? { ...license, document: file } : license
      )
    );
    setShowPopup(false);
  };

  // Open upload popup
  const openUploadPopup = (id) => {
    setCurrentLicenseId(id);
    setShowPopup(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Licenses submitted:", licenses);
    alert("Licenses and certifications submitted successfully!");
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-semibold text-green-800 mb-6 border-b pb-2 flex justify-center">
        Licenses and Certifications
      </h2>

      {licenses.map((license) => (
        <div key={license.id} className="mb-8">
          <h3 className="text-lg font-medium text-green-700 mb-4">
            License {license.id}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profession
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="e.g. Licensed Professional Teacher"
                value={license.profession}
                onChange={(e) =>
                  handleChange(license.id, "profession", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Achieved
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                value={license.dateAchieved}
                onChange={(e) =>
                  handleChange(license.id, "dateAchieved", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Document
            </label>
            <button
              onClick={() => openUploadPopup(license.id)}
              className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
            >
              {license.document ? "Change File" : "Upload"}
            </button>
            {license.document && (
              <span className="text-sm text-green-600">
                {license.document.name}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Add Button */}
      <div className="flex justify-center mb-6">
        <button
          className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
          onClick={addLicense}
        >
          Add License
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Upload Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Upload Document
            </h3>
            <p className="text-gray-600 mb-4">
              Please select a file to upload for your license or certification.
            </p>
            <div className="mb-4">
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-100 file:text-green-700
                  hover:file:bg-green-300"
                onChange={(e) =>
                  handleDocumentUpload(currentLicenseId, e.target.files[0])
                }
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicensesAndCertifications;
