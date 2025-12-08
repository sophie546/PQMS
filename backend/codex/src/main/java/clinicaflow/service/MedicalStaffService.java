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
      
        if (staff.getUserAccount() != null && staff.getUserAccount().getAccountID() > 0) {           
            UserAccountEntity existingAccount = userAccountRepository.findById(staff.getUserAccount().getAccountID())
                .orElseThrow(() -> new RuntimeException("UserAccount not found with ID: " + staff.getUserAccount().getAccountID()));
            
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
        staff.setName(updatedStaff.getName());
        staff.setRole(updatedStaff.getRole()); 
        staff.setContactNo(updatedStaff.getContactNo());
        staff.setSpecialty(updatedStaff.getSpecialty());

      
        if (staff.getUserAccount() != null) {
            UserAccountEntity userAccount = staff.getUserAccount();
            userAccount.setRole(updatedStaff.getRole()); 
            userAccountRepository.save(userAccount);
        }

       
        if (updatedStaff.getUserAccount() != null && updatedStaff.getUserAccount().getAccountID() > 0) {            
            UserAccountEntity account = userAccountRepository.findById(updatedStaff.getUserAccount().getAccountID())
                .orElseThrow(() -> new RuntimeException("UserAccount not found"));
            staff.setUserAccount(account);
        }

        return repository.save(staff);
    }).orElse(null);
    }
    // DELETE
   @Transactional
    public void deleteStaff(int id) {
        try {
            MedicalStaffEntity staff = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical staff not found"));
                
          
            if (staff.getUserAccount() != null) {
              
                staff.getUserAccount().setMedicalStaff(null);
                staff.setUserAccount(null);
            }
            
            repository.delete(staff);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete medical staff: " + e.getMessage());
        }
    }
}