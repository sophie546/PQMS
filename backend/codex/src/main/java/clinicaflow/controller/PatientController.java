package clinicaflow.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import clinicaflow.entity.PatientEntity;
import clinicaflow.service.PatientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    @Autowired
    private PatientService pservice;

    //create
    @PostMapping("/add")
    public PatientEntity postPatient(@RequestBody PatientEntity patient) {
        return pservice.savePatient(patient);
    }
    
    //read
    @GetMapping("/all")
    public List<PatientEntity> getAllPatients() {
        return pservice.getAllPatients();
    }

    //update
    @PutMapping("/update/{id}")
    public PatientEntity putPatient(@PathVariable int id, @RequestBody PatientEntity newPatientDetails) {
        return pservice.putPatient(id, newPatientDetails);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public String deletePatient(@PathVariable int id) {
        return pservice.deletePatient(id);
    }
}