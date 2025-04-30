import React, { useState } from "react";

const StudentAdmission = () => {
  const [formData, setFormData] = useState({
    academicYear: "2024-25",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    email: "",
    bloodGroup: "",
    address: "",
    prn: "",
    branch: "Computer Engineering",
    admissionType: "Regular CAP",
  });

  const [prnInput, setPrnInput] = useState(""); // for search input
  const [isUpdating, setIsUpdating] = useState(false); // determines PATCH or POST

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFetch = async () => {
    if (!prnInput) {
      alert("Please enter a PRN to fetch your details.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/admission/${prnInput}`);
      if (!res.ok) {
        alert("No student found with that PRN.");
        return;
      }

      const data = await res.json();
      setFormData({
        ...data,
        dob: data.dob.split("T")[0], // format date for input
      });
      setIsUpdating(true);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch student data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isUpdating
      ? `http://localhost:5000/api/admission/update/${formData.prn}`
      : "http://localhost:5000/api/admission";

    const method = isUpdating ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Admission ${isUpdating ? "updated" : "submitted"} successfully!`);
        setIsUpdating(true); // Once submitted, consider it update mode
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit admission form.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        {isUpdating ? "Update Admission" : "Student Admission Form"}
      </h2>

      {/* PRN Input to fetch existing record */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter PRN to fetch your data"
          value={prnInput}
          onChange={(e) => setPrnInput(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleFetch}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Fetch Details
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Academic Year</label>
          <select
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option>2024-25</option>
            <option>2025-26</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2 w-full rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Middle Name</label>
            <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>
          <div>
            <label className="block font-semibold">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border p-2 w-full rounded" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 w-full rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full rounded" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Blood Group</label>
            <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>
          <div>
            <label className="block font-semibold">PRN</label>
            <input type="text" name="prn" value={formData.prn} onChange={handleChange} className="border p-2 w-full rounded" required />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} className="border p-2 w-full rounded" required></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Branch</label>
            <select name="branch" value={formData.branch} onChange={handleChange} className="border p-2 w-full rounded">
              <option>Computer Engineering</option>
              <option>IT Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Civil Engineering</option>
              <option>Electronics Engineering</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Admission Type</label>
            <select name="admissionType" value={formData.admissionType} onChange={handleChange} className="border p-2 w-full rounded">
              <option>Regular CAP</option>
              <option>Regular N-CAP</option>
              <option>Regular DSY</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4">
          {isUpdating ? "Update Admission" : "Submit Admission"}
        </button>
      </form>
    </div>
  );
};

export default StudentAdmission;
