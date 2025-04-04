-- CreateTable
CREATE TABLE "Admission" (
    "id" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "prn" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "admissionType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admission_email_key" ON "Admission"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admission_prn_key" ON "Admission"("prn");
