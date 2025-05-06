"use client";

import React, { useState } from "react";

const ResearchOutputs = () => {
  const [researchOutputs, setResearchOutputs] = useState([
    { id: 1, title: "", datePublished: "", document: null },
    { id: 2, title: "", datePublished: "", document: null },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentResearchId, setCurrentResearchId] = useState(null);

  // Add a new research entry
  const addResearch = () => {
    const newId =
      researchOutputs.length > 0
        ? Math.max(...researchOutputs.map((r) => r.id)) + 1
        : 1;
    setResearchOutputs([
      ...researchOutputs,
      { id: newId, title: "", datePublished: "", document: null },
    ]);
  };

  // Handle input changes
  const handleChange = (id, field, value) => {
    setResearchOutputs(
      researchOutputs.map((research) =>
        research.id === id ? { ...research, [field]: value } : research
      )
    );
  };

  // Handle document upload
  const handleDocumentUpload = (id, file) => {
    setResearchOutputs(
      researchOutputs.map((research) =>
        research.id === id ? { ...research, document: file } : research
      )
    );
    setShowPopup(false);
  };

  // Open upload popup
  const openUploadPopup = (id) => {
    setCurrentResearchId(id);
    setShowPopup(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Research outputs submitted:", researchOutputs);
    alert("Research outputs submitted successfully!");
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-semibold text-green-800 mb-6 border-b pb-2 flex justify-center">
        Research Outputs
      </h2>

      {researchOutputs.map((research) => (
        <div key={research.id} className="mb-8">
          <h3 className="text-lg font-medium text-green-700 mb-4">
            Research {research.id}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Research Title
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Enter research title"
                value={research.title}
                onChange={(e) =>
                  handleChange(research.id, "title", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Published
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                value={research.datePublished}
                onChange={(e) =>
                  handleChange(research.id, "datePublished", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Document
            </label>
            <button
              onClick={() => openUploadPopup(research.id)}
              className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
            >
              {research.document ? "Change File" : "Upload"}
            </button>
            {research.document && (
              <span className="text-sm text-green-600">
                {research.document.name}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Add Button */}
      <div className="flex justify-center mb-6">
        <button
          className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
          onClick={addResearch}
        >
          Add
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
              Upload Research Document
            </h3>
            <p className="text-gray-600 mb-4">
              Please select a file to upload for your research. Accepted
              formats: PDF, DOC, DOCX.
            </p>
            <div className="mb-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
                onChange={(e) =>
                  handleDocumentUpload(currentResearchId, e.target.files[0])
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

export default ResearchOutputs;
