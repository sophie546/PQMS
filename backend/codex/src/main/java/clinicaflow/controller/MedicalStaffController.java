package clinicaflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import clinicaflow.entity.MedicalStaffEntity;
import clinicaflow.service.MedicalStaffService;

@RestController
@RequestMapping("/api/medicalstaff")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicalStaffController {

    @Autowired
    private MedicalStaffService service;

    // CREATE
    @PostMapping("/add")
    public MedicalStaffEntity addStaff(@RequestBody MedicalStaffEntity staff) {
        return service.addStaff(staff);
    }

    // READ ALL
    @GetMapping("/all")
    public List<MedicalStaffEntity> getAllStaff() {
        return service.getAllStaff();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Optional<MedicalStaffEntity> getStaffById(@PathVariable int id) {
        return service.getStaffById(id);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public MedicalStaffEntity updateStaff(@PathVariable int id, @RequestBody MedicalStaffEntity staff) {
        return service.updateStaff(id, staff);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteStaff(@PathVariable int id) {
        service.deleteStaff(id);
        return "Medical staff with ID " + id + " has been deleted.";
    }
}
