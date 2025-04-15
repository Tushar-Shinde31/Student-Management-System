import React, { useEffect, useState } from "react";

const CreateDivision = () => {
  const [students, setStudents] = useState([]);
  const [updatedDivisions, setUpdatedDivisions] = useState({});

  // Fetch students with no division on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admission/no-division");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };

    fetchStudents();
  }, []);

  const handleDivisionChange = (studentId, division) => {
    setUpdatedDivisions((prev) => ({
      ...prev,
      [studentId]: division,
    }));
  };

  const handleAssignDivision = async (studentId) => {
    const division = updatedDivisions[studentId];
    if (!division) return alert("Please select a division first.");

    try {
      const res = await fetch("http://localhost:5000/api/admission/assign-division", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: studentId, division }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Division '${division}' assigned to ${data.firstName} ${data.lastName}`);
        setStudents((prev) => prev.filter((s) => s.id !== studentId)); // remove student from list
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error assigning division:", error);
      alert("Failed to assign division.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Assign Divisions</h2>

      {students.length === 0 ? (
        <p className="text-center text-gray-600">No students to assign.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">PRN</th>
              <th className="py-2 px-4 border">Branch</th>
              <th className="py-2 px-4 border">Division</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center border-t">
                <td className="py-2 px-4 border">
                  {student.firstName} {student.middleName} {student.lastName}
                </td>
                <td className="py-2 px-4 border">{student.prn}</td>
                <td className="py-2 px-4 border">{student.branch}</td>
                <td className="py-2 px-4 border">
                  <select
                    className="border rounded px-2 py-1"
                    value={updatedDivisions[student.id] || ""}
                    onChange={(e) => handleDivisionChange(student.id, e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleAssignDivision(student.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreateDivision;
