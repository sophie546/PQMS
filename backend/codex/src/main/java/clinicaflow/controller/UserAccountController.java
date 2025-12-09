package clinicaflow.controller;

import clinicaflow.entity.UserAccountEntity;
import clinicaflow.entity.MedicalStaffEntity;
import clinicaflow.service.UserAccountService;
import clinicaflow.repository.MedicalStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/useraccount")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserAccountController {

    @Autowired
    private UserAccountService service;
    
    @Autowired
    private MedicalStaffRepository medicalStaffRepository;

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
    
    // NEW: GET CURRENT USER (for logged-in user)
    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUser() {
        try {
            System.out.println("🔍 Getting current user...");
            
            // Get authentication from Spring Security
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            
            if (auth == null || !auth.isAuthenticated() || auth.getName().equals("anonymousUser")) {
                System.out.println("❌ User not authenticated");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
            }
            
            String username = auth.getName();
            System.out.println("✅ Authenticated user: " + username);
            
            // Find user by username (email in your case)
            Optional<UserAccountEntity> userAccountOpt = service.findByUsername(username);
            
            if (userAccountOpt.isEmpty()) {
                System.out.println("❌ User account not found for username: " + username);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User account not found");
            }
            
            UserAccountEntity userAccount = userAccountOpt.get();
            System.out.println("✅ Found user account: ID=" + userAccount.getAccountID() + 
                               ", Username=" + userAccount.getUsername() + 
                               ", Role=" + userAccount.getRole());
            
            // Find linked medical staff
            Optional<MedicalStaffEntity> medicalStaffOpt = medicalStaffRepository
                    .findByUserAccountAccountID(userAccount.getAccountID());
            
            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("accountID", userAccount.getAccountID());
            response.put("username", userAccount.getUsername());
            response.put("role", userAccount.getRole());
            
            if (medicalStaffOpt.isPresent()) {
                MedicalStaffEntity medicalStaff = medicalStaffOpt.get();
                System.out.println("✅ Found linked medical staff: ID=" + medicalStaff.getStaffID() + 
                                   ", Name=" + medicalStaff.getName());
                
                response.put("staffID", medicalStaff.getStaffID());
                response.put("name", medicalStaff.getName());
                response.put("medicalRole", medicalStaff.getRole());
                response.put("specialty", medicalStaff.getSpecialty());
                response.put("contactNo", medicalStaff.getContactNo());
            } else {
                System.out.println("⚠️ No medical staff linked to this account");
                response.put("name", userAccount.getUsername().split("@")[0]); // Use email name as fallback
            }
            
            System.out.println("📤 Sending response: " + response);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error getting current user: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
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