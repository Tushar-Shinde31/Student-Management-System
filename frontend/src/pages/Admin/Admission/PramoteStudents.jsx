import React, { useEffect, useState } from "react";

const PromoteStudents = () => {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const currentYear = "2024-25";
  const nextYear = "2025-26";

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch(`http://localhost:5000/api/admission/by-year/${currentYear}`);
      const data = await res.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const promoteSelected = async () => {
    if (selected.length === 0) return alert("Select students to promote.");

    const res = await fetch("http://localhost:5000/api/admission/promote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentIds: selected, nextYear }),
    });

    const result = await res.json();
    if (res.ok) {
      alert(`${result.count} students promoted to ${nextYear}`);
      setStudents((prev) => prev.filter((s) => !selected.includes(s.id)));
      setSelected([]);
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Promote Students of 2024-25</h2>
      {students.length === 0 ? (
        <p className="text-center text-gray-600">No students in {currentYear}</p>
      ) : (
        <>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 border">Select</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">PRN</th>
                <th className="py-2 px-4 border">Branch</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="text-center border-t">
                  <td className="py-2 px-4 border">
                    <input
                      type="checkbox"
                      checked={selected.includes(student.id)}
                      onChange={() => toggleSelect(student.id)}
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="py-2 px-4 border">{student.prn}</td>
                  <td className="py-2 px-4 border">{student.branch}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            onClick={promoteSelected}
          >
            Promote Selected
          </button>
        </>
      )}
    </div>
  );
};

export default PromoteStudents;
