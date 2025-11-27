package clinicaflow.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import clinicaflow.entity.PatientEntity;
import clinicaflow.repository.PatientRepository;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepo;

    //create
    public PatientEntity savePatient(PatientEntity patient) {
        return patientRepo.save(patient);
    }

    //read
    public List<PatientEntity> getAllPatients() {
        return patientRepo.findAll();
    }

    //update
    public PatientEntity putPatient(int id, PatientEntity newPatientDetails) { 
        PatientEntity patient = patientRepo.findById((int) id) .orElseThrow(() -> new NoSuchElementException("Patient " + id + " does not exist")); 
        patient.setFirstName(newPatientDetails.getFirstName()); 
        patient.setLastName(newPatientDetails.getLastName()); 
        patient.setAge(newPatientDetails.getAge()); 
        patient.setGender(newPatientDetails.getGender()); 
        patient.setContactNo(newPatientDetails.getContactNo()); 
        patient.setAddress(newPatientDetails.getAddress());
        return patientRepo.save(patient); 
    }

    //delete
    public String deletePatient(int patientId) {
        patientRepo.deleteById(patientId);
        return "Patient removed! " + patientId;
    }
}


