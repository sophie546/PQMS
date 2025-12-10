package clinicaflow.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clinicaflow.entity.ConsultationEntity;
import clinicaflow.service.ConsultationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import clinicaflow.dto.request.ConsultationRequest;

@RestController
@RequestMapping("/consultations")
@CrossOrigin(origins = "http://localhost:3000")
public class ConsultationController {
    @Autowired
    private ConsultationService cservice;

   @PostMapping("/add")
    public ConsultationEntity addConsultation(@RequestBody ConsultationRequest request) { 
        ConsultationEntity consultationEntity = new ConsultationEntity();
        
        // Mapping properties from the Request object to the Entity
        consultationEntity.setSymptoms(request.getSymptoms());
        consultationEntity.setDiagnosis(request.getDiagnosis());
        consultationEntity.setMedicinePrescribed(request.getMedicinePrescribed());
        consultationEntity.setRemarks(request.getRemarks());
        consultationEntity.setConsultationDate(request.getConsultationDate());
        

        // Pass the ID and the entity to the service
        return cservice.saveConsultation(request.getPatientId(), consultationEntity);    
    }
    
    
    @GetMapping("/all")
    public List<ConsultationEntity> getAllConsultations() {
        return cservice.getAllConsultations();
    }
    
    @PutMapping("update/{id}")
    public ConsultationEntity putConsultation(@PathVariable int id, @RequestBody ConsultationEntity consultation) {
        return cservice.putConsultation(id, consultation);        
    }

    @DeleteMapping("/delete/{id}")
    public String deleteConsultation(@PathVariable int id) {
        return cservice.deleteConsultation(id);
    }
}
