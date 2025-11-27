package com.example.codex.aloriag4.service;
import com.example.codex.aloriag4.entity.UserAccountEntity;
import com.example.codex.aloriag4.entity.MedicalStaffEntity;
import com.example.codex.aloriag4.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    // CREATE
    public UserAccountEntity addAccount(UserAccountEntity account) {
      
        if (account.getMedicalStaff() != null) {
            MedicalStaffEntity medicalStaff = account.getMedicalStaff();
            medicalStaff.setUserAccount(account);
        }
        
        return userAccountRepository.save(account);
    }

    // CREATE 
    public UserAccountEntity createAccountWithStaff(UserAccountEntity account, String staffName, String staffRole, String contactNo, String specialty) {
      
        MedicalStaffEntity medicalStaff = new MedicalStaffEntity();
        medicalStaff.setName(staffName);
        medicalStaff.setRole(staffRole);
        medicalStaff.setContactNo(contactNo);
        medicalStaff.setSpecialty(specialty);    
        medicalStaff.setUserAccount(account);
        account.setMedicalStaff(medicalStaff);
        
        return userAccountRepository.save(account);
    }

    // READ ALL
    public List<UserAccountEntity> getAllAccounts() {
        return userAccountRepository.findAll();
    }

    // READ ONE
    public Optional<UserAccountEntity> getAccountById(Long id) {
        return userAccountRepository.findById(id);
    }

    // READ
    public Optional<UserAccountEntity> getAccountByUsername(String username) {
        return userAccountRepository.findByUsername(username);
    }

    // UPDATE
    public UserAccountEntity updateAccount(Long id, UserAccountEntity updatedAccount) {
        return userAccountRepository.findById(id).map(account -> {
            account.setUsername(updatedAccount.getUsername());
            account.setPasswordHash(updatedAccount.getPasswordHash());
            account.setRole(updatedAccount.getRole());
            
            return userAccountRepository.save(account);
        }).orElse(null);
    }

    // DELETE
    public void deleteAccount(Long id) {
        userAccountRepository.deleteById(id);
    }
}