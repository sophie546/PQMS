package clinicaflow.controller;

import clinicaflow.entity.UserAccountEntity;
import clinicaflow.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/useraccount")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserAccountController {

    @Autowired
    private UserAccountService service;

    // CREATE 
    @PostMapping("/add")
    public UserAccountEntity addAccount(@RequestBody UserAccountEntity account) {
        return service.addAccount(account);
    }

    // READ ALL
    @GetMapping("/all")
    public List<UserAccountEntity> getAllAccounts() {
        return service.getAllAccounts();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Optional<UserAccountEntity> getAccountById(@PathVariable int id) {
        return service.getAccountById(id);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public UserAccountEntity updateAccount(@PathVariable int id, @RequestBody UserAccountEntity account) {
        return service.updateAccount(id, account);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteAccount(@PathVariable int id) {
        service.deleteAccount(id);
        return "User account with ID " + id + " has been deleted.";
    }
}