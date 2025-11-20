class Patient {
  constructor(id, name, gender, age, contact, address) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.contact = contact;
    this.address = address;
  }
}

export const mockPatients = [
  new Patient("PAT-001", "Maria Santos", "Female", 45, "09123456789", "123 Main St, Barangay Centro"),
  new Patient("PAT-002", "Juan Dela Cruz", "Male", 32, "09234567890", "456 Oak Ave, Barangay San Jose"),
  new Patient("PAT-003", "Ana Reyes", "Female", 28, "09345678901", "789 Pine Rd, Barangay Poblacion")
];