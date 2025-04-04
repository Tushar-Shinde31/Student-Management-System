import React, { useState } from "react";
import * as XLSX from "xlsx";

const CreateAdmission = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Admission successfully submitted!");
        setFormData({
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
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit admission form.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      try {
        const response = await fetch("http://localhost:5000/api/admission/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ admissions: json }),
        });

        const result = await response.json();
        if (response.ok) {
          alert(`Uploaded ${result.count} students successfully!`);
        } else {
          alert("Error: " + result.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload file.");
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Create Admission</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Academic Year</label>
          <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="border p-2 w-full rounded">
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
          Submit Admission
        </button>
      </form>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">Bulk Upload via CSV or XLSX</h3>
        <div className="flex flex-col items-center gap-4">
          <label className="cursor-pointer bg-gray-100 border border-dashed border-blue-400 text-blue-600 py-3 px-6 rounded-lg shadow hover:bg-blue-50 transition">
            Upload File
            <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="hidden" />
          </label>
          <p className="text-sm text-gray-500">Accepted formats: .csv, .xlsx | Ensure proper headers</p>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmission;
