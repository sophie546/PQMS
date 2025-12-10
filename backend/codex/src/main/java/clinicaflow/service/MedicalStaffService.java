package clinicaflow.service;

import clinicaflow.entity.MedicalStaffEntity;
import clinicaflow.entity.UserAccountEntity;
import clinicaflow.repository.MedicalStaffRepository;
import clinicaflow.repository.UserAccountRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalStaffService {

    @Autowired
    private MedicalStaffRepository repository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    // CREATE 
    public MedicalStaffEntity addStaff(MedicalStaffEntity staff) {
        // Validate required fields
        if (staff.getName() == null || staff.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }
        
        if (staff.getRole() == null || staff.getRole().trim().isEmpty()) {
            throw new RuntimeException("Role is required");
        }
        
        // Validate age if provided
        if (staff.getAge() != null && (staff.getAge() < 18 || staff.getAge() > 120)) {
            throw new RuntimeException("Age must be between 18 and 120");
        }
        
        // Validate gender if provided
        if (staff.getGender() != null && !staff.getGender().trim().isEmpty()) {
            String gender = staff.getGender().trim();
            if (!gender.equalsIgnoreCase("Male") && 
                !gender.equalsIgnoreCase("Female") && 
                !gender.equalsIgnoreCase("Other") &&
                !gender.equalsIgnoreCase("Prefer not to say")) {
                throw new RuntimeException("Gender must be Male, Female, Other, or Prefer not to say");
            }
        }
        
        // Set user account if provided
        if (staff.getUserAccount() != null && staff.getUserAccount().getAccountID() > 0) {           
            UserAccountEntity existingAccount = userAccountRepository.findById(staff.getUserAccount().getAccountID())
                .orElseThrow(() -> new RuntimeException("UserAccount not found with ID: " + staff.getUserAccount().getAccountID()));
            
            // Check if this account already has a medical staff record
            Optional<MedicalStaffEntity> existingStaff = repository.findByUserAccountAccountID(staff.getUserAccount().getAccountID());
            if (existingStaff.isPresent()) {
                throw new RuntimeException("User account already has a medical staff record");
            }
            
            staff.setUserAccount(existingAccount);
        }  
        
        return repository.save(staff);
    }

    // READ ALL
    public List<MedicalStaffEntity> getAllStaff() {
        return repository.findAll();
    }

    // READ ONE
    public Optional<MedicalStaffEntity> getStaffById(int id) {
        return repository.findById(id);
    }

    // READ by Account ID
    public Optional<MedicalStaffEntity> getStaffByAccountId(int accountId) {
        return repository.findByUserAccountAccountID(accountId);
    }

    // UPDATE
    public MedicalStaffEntity updateStaff(int id, MedicalStaffEntity updatedStaff) {
        return repository.findById(id).map(staff -> {
            // Update basic fields
            if (updatedStaff.getName() != null && !updatedStaff.getName().trim().isEmpty()) {
                staff.setName(updatedStaff.getName().trim());
            }
            
            if (updatedStaff.getRole() != null && !updatedStaff.getRole().trim().isEmpty()) {
                staff.setRole(updatedStaff.getRole().trim());
            }
            
            if (updatedStaff.getContactNo() != null) {
                staff.setContactNo(updatedStaff.getContactNo());
            }
            
            if (updatedStaff.getSpecialty() != null) {
                staff.setSpecialty(updatedStaff.getSpecialty());
            }
            
            // Update new fields: age and gender
            if (updatedStaff.getAge() != null) {
                // Validate age
                if (updatedStaff.getAge() < 18 || updatedStaff.getAge() > 120) {
                    throw new RuntimeException("Age must be between 18 and 120");
                }
                staff.setAge(updatedStaff.getAge());
            }
            
            if (updatedStaff.getGender() != null) {
                String gender = updatedStaff.getGender().trim();
                if (!gender.isEmpty()) {
                    if (!gender.equalsIgnoreCase("Male") && 
                        !gender.equalsIgnoreCase("Female") && 
                        !gender.equalsIgnoreCase("Other") &&
                        !gender.equalsIgnoreCase("Prefer not to say")) {
                        throw new RuntimeException("Gender must be Male, Female, Other, or Prefer not to say");
                    }
                    staff.setGender(gender);
                }
            }
            
            // Update user account role if needed
            if (staff.getUserAccount() != null) {
                UserAccountEntity userAccount = staff.getUserAccount();
                if (updatedStaff.getRole() != null && !updatedStaff.getRole().trim().isEmpty()) {
                    userAccount.setRole(updatedStaff.getRole().trim());
                    userAccountRepository.save(userAccount);
                }
            }
            
            // Update user account reference if provided
            if (updatedStaff.getUserAccount() != null && updatedStaff.getUserAccount().getAccountID() > 0) {            
                UserAccountEntity account = userAccountRepository.findById(updatedStaff.getUserAccount().getAccountID())
                    .orElseThrow(() -> new RuntimeException("UserAccount not found"));
                
                // Check if the new account already has a medical staff record (excluding current)
                Optional<MedicalStaffEntity> existingStaff = repository.findByUserAccountAccountID(account.getAccountID());
                if (existingStaff.isPresent() && existingStaff.get().getStaffID() != id) {
                    throw new RuntimeException("The selected user account already has a medical staff record");
                }
                
                staff.setUserAccount(account);
            }

            return repository.save(staff);
        }).orElseThrow(() -> new RuntimeException("Medical staff not found with ID: " + id));
    }
    
    // DELETE
    @Transactional
    public void deleteStaff(int id) {
        try {
            MedicalStaffEntity staff = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical staff not found"));
                
            // Remove bidirectional relationship
            if (staff.getUserAccount() != null) {
                staff.getUserAccount().setMedicalStaff(null);
                staff.setUserAccount(null);
            }
            
            repository.delete(staff);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete medical staff: " + e.getMessage());
        }
    }
    
    // Additional helper methods
    public List<MedicalStaffEntity> getStaffByRole(String role) {
        return repository.findByRoleIgnoreCase(role);
    }
    
    public List<MedicalStaffEntity> getStaffByGender(String gender) {
        return repository.findByGenderIgnoreCase(gender);
    }
    
    public List<MedicalStaffEntity> getStaffByAgeRange(int minAge, int maxAge) {
        return repository.findByAgeBetween(minAge, maxAge);
    }
}