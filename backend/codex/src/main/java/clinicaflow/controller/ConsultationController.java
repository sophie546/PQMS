package clinicaflow.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clinicaflow.entity.ConsultationEntity;
import clinicaflow.service.ConsultationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/consultations")
public class ConsultationController {
    @Autowired
    private ConsultationService cservice;

    @PostMapping("/add")
    public ConsultationEntity saveConsultation(@RequestBody ConsultationEntity consultation) {
        return cservice.saveConsultation(consultation);
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
