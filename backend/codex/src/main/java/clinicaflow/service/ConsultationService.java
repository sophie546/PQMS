package clinicaflow.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import clinicaflow.entity.ConsultationEntity;
import clinicaflow.entity.MedicalStaffEntity;
import clinicaflow.entity.PatientEntity;
import clinicaflow.repository.ConsultationRepository;
import clinicaflow.repository.MedicalStaffRepository;
import clinicaflow.repository.PatientRepository;

@Service
public class ConsultationService {
    @Autowired
    private ConsultationRepository crepo;

    @Autowired
    private PatientRepository prepo;

    @Autowired
    private MedicalStaffRepository srepo;

    // Update method signature to accept staffId
    public ConsultationEntity saveConsultation(int patientId, int staffId, ConsultationEntity consultation) {
        
        // 1. Fetch Patient
        PatientEntity patient = prepo.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));

        // 2. Fetch Doctor/Staff (THIS WAS MISSING)
        MedicalStaffEntity staff = srepo.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Staff not found"));

        // 3. Set Relationships
        consultation.setPatient(patient);
        consultation.setMedicalStaff(staff); // or .setDoctor(staff) depending on your Entity naming

        // 4. Save
        return crepo.save(consultation);
    }

    //read
    public List<ConsultationEntity> getAllConsultations() {
        return crepo.findAll();
    }

    //update
    @SuppressWarnings("finally")
    public ConsultationEntity putConsultation(int id, ConsultationEntity newConsultationDetails) { 
        ConsultationEntity consultation = new ConsultationEntity();
        try{
            consultation = crepo.findById(id).get();
            consultation.setSymptoms(newConsultationDetails.getSymptoms());
            consultation.setDiagnosis(newConsultationDetails.getDiagnosis());
            consultation.setMedicinePrescribed(newConsultationDetails.getMedicinePrescribed());
            consultation.setRemarks(newConsultationDetails.getRemarks());
            consultation.setConsultationDate(newConsultationDetails.getConsultationDate());
        } catch (NoSuchElementException e){
            System.out.println("Consultation " + id + " does not exist");
        } finally {
            return crepo.save(consultation);
        }
    }

    //delete
    public String deleteConsultation(int consultationId) {
        crepo.deleteById(consultationId);
        return "Consultation removed! " + consultationId;
    }

}
