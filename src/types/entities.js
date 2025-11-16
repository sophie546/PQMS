export class Patient {
  constructor(patientId, name, gender, age, contactNo, address) {
    this.patientId = patientId;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.contactNo = contactNo;
    this.address = address;
  }
}

export class MedicalStaff {
  constructor(staffId, name, role, contactNo, specialty, status, email, schedule, patientsToday) {
    this.staffId = staffId;
    this.name = name;
    this.role = role;
    this.contactNo = contactNo;
    this.specialty = specialty;
    this.status = status;
    this.email = email;
    this.schedule = schedule;
    this.patientsToday = patientsToday;
  }
}

export class Consultation {
  constructor(consultationId, symptoms, diagnosis, medicinePrescribed, remarks, consultationDate, patientId, staffId) {
    this.consultationId = consultationId;
    this.symptoms = symptoms;
    this.diagnosis = diagnosis;
    this.medicinePrescribed = medicinePrescribed;
    this.remarks = remarks;
    this.consultationDate = consultationDate;
    this.patientId = patientId;
    this.staffId = staffId;
  }
}