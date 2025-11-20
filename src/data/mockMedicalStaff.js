import { MedicalStaff } from '../types/entities.js';

export const mockMedicalStaff = [
  new MedicalStaff("STAFF-001", "Dr. Maria Cruz", "Doctor", "09123456789", "General Medicine", "Available", "maria.cruz@clinic.com", "Mon-Fri, 8:00 AM - 5:00 PM", 8),
  new MedicalStaff("STAFF-002", "Dr. Roberto Santos", "Doctor", "09234567890", "General Medicine", "Busy", "roberto.santos@clinic.com", "Mon-Sat, 9:00 AM - 6:00 PM", 12),
  new MedicalStaff("STAFF-003", "Nurse Maria Reyes", "Nurse", "09567890123", "Emergency Care", "Off Duty", "maria.reyes@clinic.com", "Tue-Sat, 8:00 AM - 5:00 PM", 5)
];