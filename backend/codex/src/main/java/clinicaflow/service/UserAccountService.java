package clinicaflow.service;

import clinicaflow.dto.request.LoginRequest;
import clinicaflow.dto.request.RegisterRequest;
import clinicaflow.dto.response.AuthResponse;
import clinicaflow.entity.UserAccountEntity;
import clinicaflow.entity.MedicalStaffEntity;
import clinicaflow.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ========== AUTHENTICATION METHODS ==========
    
    // Register a new user (for your React frontend)
    public AuthResponse registerUser(RegisterRequest registerRequest) {
        try {
            // Check if username/email already exists
            if (userAccountRepository.findByUsername(registerRequest.getEmail()).isPresent()) {
                return AuthResponse.error("Email already registered");
            }

            // Create new user account
            UserAccountEntity userAccount = new UserAccountEntity();
            userAccount.setUsername(registerRequest.getEmail());
            userAccount.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
            userAccount.setRole(registerRequest.getRole());

            // Save to database
            UserAccountEntity savedUser = userAccountRepository.save(userAccount);

            // Create response data
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", savedUser.getAccountID());
            userData.put("email", savedUser.getUsername());
            userData.put("role", savedUser.getRole());
            userData.put("firstName", registerRequest.getFirstName());
            userData.put("lastName", registerRequest.getLastName());

            return AuthResponse.success("Registration successful", userData);

        } catch (Exception e) {
            e.printStackTrace();
            return AuthResponse.error("Registration failed: " + e.getMessage());
        }
    }

    // Login user
    public AuthResponse loginUser(LoginRequest loginRequest) {
        try {
            Optional<UserAccountEntity> userOptional = userAccountRepository.findByUsername(loginRequest.getEmail());
            
            if (userOptional.isEmpty()) {
                return AuthResponse.error("Invalid email or password");
            }

            UserAccountEntity user = userOptional.get();

            // Check password using PasswordEncoder
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
                return AuthResponse.error("Invalid email or password");
            }

            // Create response data
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getAccountID());
            userData.put("email", user.getUsername());
            userData.put("role", user.getRole());
            
            // Include medical staff info if exists
            if (user.getMedicalStaff() != null) {
                Map<String, Object> staffInfo = new HashMap<>();
                staffInfo.put("name", user.getMedicalStaff().getName());
                staffInfo.put("specialty", user.getMedicalStaff().getSpecialty());
                userData.put("medicalStaff", staffInfo);
            }

            // TODO: Add JWT token generation here if needed
            // userData.put("token", generateToken(user));

            return AuthResponse.success("Login successful", userData);

        } catch (Exception e) {
            e.printStackTrace();
            return AuthResponse.error("Login failed: " + e.getMessage());
        }
    }

    // Check if email exists
    public boolean emailExists(String email) {
        return userAccountRepository.findByUsername(email).isPresent();
    }

    // ========== YOUR EXISTING CRUD METHODS ==========
    
    // CREATE
    public UserAccountEntity addAccount(UserAccountEntity account) {
        // Encrypt password before saving
        if (account.getPasswordHash() != null && !account.getPasswordHash().startsWith("$2a$")) {
            account.setPasswordHash(passwordEncoder.encode(account.getPasswordHash()));
        }
        
        if (account.getMedicalStaff() != null) {
            MedicalStaffEntity medicalStaff = account.getMedicalStaff();
            medicalStaff.setUserAccount(account);
        }
        
        return userAccountRepository.save(account);
    }

    // CREATE with staff details
    public UserAccountEntity createAccountWithStaff(UserAccountEntity account, String staffName, 
                                                   String staffRole, String contactNo, String specialty) {
        // Encrypt password
        if (account.getPasswordHash() != null && !account.getPasswordHash().startsWith("$2a$")) {
            account.setPasswordHash(passwordEncoder.encode(account.getPasswordHash()));
        }
        
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

    // READ by username
    public Optional<UserAccountEntity> getAccountByUsername(String username) {
        return userAccountRepository.findByUsername(username);
    }

    // UPDATE
    public UserAccountEntity updateAccount(Long id, UserAccountEntity updatedAccount) {
        return userAccountRepository.findById(id).map(account -> {
            account.setUsername(updatedAccount.getUsername());
            
            // Only update password if provided and not already encrypted
            if (updatedAccount.getPasswordHash() != null && 
                !updatedAccount.getPasswordHash().startsWith("$2a$")) {
                account.setPasswordHash(passwordEncoder.encode(updatedAccount.getPasswordHash()));
            } else if (updatedAccount.getPasswordHash() != null) {
                account.setPasswordHash(updatedAccount.getPasswordHash());
            }
            
            account.setRole(updatedAccount.getRole());
            
            return userAccountRepository.save(account);
        }).orElse(null);
    }

    // DELETE
    public void deleteAccount(Long id) {
        userAccountRepository.deleteById(id);
    }
}