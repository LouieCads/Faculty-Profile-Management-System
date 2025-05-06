import { useState } from "react";

const TeachingAssignments = () => {
  // State for teaching assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      type: "Elementary",
      schoolName: "",
      address: "",
      dateGraduated: "",
    },
  ]);

  // Add new assignment
  const handleAddAssignment = () => {
    setAssignments((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? Math.max(...prev.map((a) => a.id)) + 1 : 1,
        type: "Elementary", // Default type, can be modified as needed
        schoolName: "",
        address: "",
        dateGraduated: "",
      },
    ]);
  };

  // Update assignment field
  const handleInputChange = (id, field, value) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id ? { ...assignment, [field]: value } : assignment
      )
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Submitting teaching assignments:", assignments);
    // Add API call or form submission logic here
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-semibold text-green-800 mb-6">
        Teaching Assignments
      </h2>

      {assignments.map((assignment) => (
        <div key={assignment.id} className="mb-8">
          <h3 className="text-lg font-medium text-green-700 mb-4">
            {assignment.type}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Elementary School"
                value={assignment.schoolName}
                onChange={(e) =>
                  handleInputChange(assignment.id, "schoolName", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Makati City"
                value={assignment.address}
                onChange={(e) =>
                  handleInputChange(assignment.id, "address", e.target.value)
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Graduated
              </label>
              <input
                type="text"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
                value={assignment.dateGraduated}
                onChange={(e) =>
                  handleInputChange(
                    assignment.id,
                    "dateGraduated",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Button */}
      <div className="flex justify-center mb-6">
        <button
          className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
          onClick={handleAddAssignment}
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
    </div>
  );
};

export default TeachingAssignments;