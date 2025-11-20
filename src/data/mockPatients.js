class Patient {
  constructor(id, name, gender, age, contact, address, lastVisit = "No visits yet") {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.contact = contact;
    this.address = address;
    this.lastVisit = lastVisit;
  }
}

export const mockPatients = [
  new Patient("PAT-001", "Maria Santos", "Female", 45, "09123456789", "123 Main St, Barangay Centro", "Jan 15, 2024"),
  new Patient("PAT-002", "Juan Dela Cruz", "Male", 32, "09234567890", "456 Oak Ave, Barangay San Jose", "Feb 03, 2024"),
  new Patient("PAT-003", "Ana Reyes", "Female", 28, "09345678901", "789 Pine Rd, Barangay Poblacion", "Dec 20, 2023")
];