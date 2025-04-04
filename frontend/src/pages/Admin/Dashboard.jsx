import React, { useState } from "react";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    admissionYear: "2024-25",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    email: "",
    prn: "",
    bloodGroup: "",
    address: "",
    branch: "",
    admissionType: "",
  });

  const [message, setMessage] = useState("");

  const branches = ["Computer Engineering", "IT Engineering", "AI & DS", "Mechanical Engineering", "Civil Engineering"];
  const admissionTypes = ["Regular CAP", "Regular N-CAP", "Regular DSY"];
  const years = ["2024-25", "2025-26", "2026-27"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admission Data Submitted:", formData);
    setMessage("Student admission details submitted successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Create Student Admission</h2>

      {/* Success Message */}
      {message && <p className="bg-green-100 text-green-800 p-2 rounded mb-4 text-center">{message}</p>}

      {/* Admission Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Admission Year */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Admission Year:</label>
          <select
            name="admissionYear"
            value={formData.admissionYear}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Enter middle name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Student PRN:</label>
            <input
              type="text"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
              placeholder="Enter PRN"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Blood Group:</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              placeholder="Enter Blood Group"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Branch */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Branch:</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        {/* Admission Type */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Admission Type:</label>
          <select
            name="admissionType"
            value={formData.admissionType}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Admission Type</option>
            {admissionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-6"
        >
          Submit Admission
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
