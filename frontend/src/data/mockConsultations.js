const createConsultation = (id, symptoms, diagnosis, prescription, notes, date, patientId, staffId) => ({
  id,
  symptoms,
  diagnosis,
  prescription,
  notes,
  date,
  patientId,
  staffId
});

export const mockConsultations = [
  createConsultation(
    "CONS-001",
    "Headache, dizziness, high blood pressure",
    "Hypertension Stage 2",
    "Lisinopril 10mg once daily",
    "Follow up in 2 weeks, low sodium diet",
    "2025-01-03",
    "PAT-001",
    "STAFF-001"
  ),
  createConsultation(
    "CONS-002",
    "Wheezing, shortness of breath, chest tightness",
    "Acute Asthma Exacerbation",
    "Salbutamol inhaler, Prednisone 40mg",
    "Avoid triggers, use inhaler as needed",
    "2025-01-04",
    "PAT-002",
    "STAFF-002"
  ),
  createConsultation(
    "CONS-003",
    "Sneezing, runny nose, itchy eyes",
    "Allergic Rhinitis",
    "Loratadine 10mg daily",
    "Avoid allergens, follow up if symptoms persist",
    "2025-01-05",
    "PAT-003",
    "STAFF-001"
  )
];