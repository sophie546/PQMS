package com.example.codex.aloriag4.controller;

import com.example.codex.aloriag4.entity.UserAccountEntity;
import com.example.codex.aloriag4.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/useraccount")
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
    public Optional<UserAccountEntity> getAccountById(@PathVariable Long id) {
        return service.getAccountById(id);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public UserAccountEntity updateAccount(@PathVariable Long id, @RequestBody UserAccountEntity account) {
        return service.updateAccount(id, account);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteAccount(@PathVariable Long id) {
        service.deleteAccount(id);
        return "User account with ID " + id + " has been deleted.";
    }
}
