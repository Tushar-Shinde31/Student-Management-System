import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Single admission form submission
app.post("/api/admission", async (req, res) => {
  try {
    const {
      academicYear, firstName, middleName, lastName, dob,
      email, bloodGroup, address, prn, branch, admissionType,
    } = req.body;

    const newAdmission = await prisma.admission.create({
      data: {
        academicYear,
        firstName,
        middleName,
        lastName,
        dob: new Date(dob),
        email,
        bloodGroup,
        address,
        prn,
        branch,
        admissionType,
      },
    });

    res.status(201).json(newAdmission);
  } catch (error) {
    console.error("Error creating admission:", error);
    res.status(500).json({ error: "Failed to create admission" });
  }
});

// Bulk upload admission route
app.post("/api/admission/bulk", async (req, res) => {
  try {
    const admissions = req.body;

    if (!Array.isArray(admissions)) {
      return res.status(400).json({ error: "Expected an array of admissions" });
    }

    const formattedAdmissions = admissions.map((a) => ({
      academicYear: a.academicYear,
      firstName: a.firstName,
      middleName: a.middleName || "",
      lastName: a.lastName,
      dob: new Date(a.dob),
      email: a.email,
      bloodGroup: a.bloodGroup || "",
      address: a.address,
      prn: a.prn,
      branch: a.branch,
      admissionType: a.admissionType,
    }));

    const result = await prisma.admission.createMany({
      data: formattedAdmissions,
      skipDuplicates: true, // prevent duplicates for unique fields like email/prn
    });

    res.status(201).json({ message: "Bulk admission upload successful", count: result.count });
  } catch (error) {
    console.error("Error during bulk upload:", error);
    res.status(500).json({ error: "Bulk admission upload failed" });
  }
});

// Get all students who have NOT been assigned a division
app.get("/api/admission/no-division", async (req, res) => {
    try {
      const unassignedStudents = await prisma.admission.findMany({
        where: { division: null },
        orderBy: { createdAt: "desc" }, // optional: latest first
      });
  
      res.json(unassignedStudents);
    } catch (error) {
      console.error("Error fetching unassigned students:", error);
      res.status(500).json({ error: "Failed to fetch students without division" });
    }
  });

  
  // Assign division to student
app.patch("/api/admission/assign-division", async (req, res) => {
  const { id, division } = req.body;

  try {
    const updated = await prisma.admission.update({
      where: { id },
      data: { division },
    });
    res.json(updated);
  } catch (error) {
    console.error("Error assigning division:", error);
    res.status(500).json({ error: "Failed to assign division" });
  }
});


// Start server
app.listen(5000, () => console.log("Server running on port 5000"));