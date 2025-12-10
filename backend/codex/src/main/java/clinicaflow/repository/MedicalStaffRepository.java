package clinicaflow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import clinicaflow.entity.MedicalStaffEntity;

@Repository
public interface MedicalStaffRepository extends JpaRepository<MedicalStaffEntity, Integer> {
    
    // Existing method
    Optional<MedicalStaffEntity> findByUserAccountAccountID(int accountId);
    
    // New methods for age and gender queries
    List<MedicalStaffEntity> findByGenderIgnoreCase(String gender);
    
    List<MedicalStaffEntity> findByRoleIgnoreCase(String role);
    
    List<MedicalStaffEntity> findByAgeBetween(int minAge, int maxAge);
    
    List<MedicalStaffEntity> findByAgeGreaterThanEqual(int age);
    
    List<MedicalStaffEntity> findByAgeLessThanEqual(int age);
    
    // Combined queries
    List<MedicalStaffEntity> findByRoleAndGender(String role, String gender);
    
    List<MedicalStaffEntity> findBySpecialtyIgnoreCase(String specialty);
    
    // NEW: Department queries
    List<MedicalStaffEntity> findByDepartmentIgnoreCase(String department);
    
    List<MedicalStaffEntity> findByDepartmentAndRole(String department, String role);
    
    List<MedicalStaffEntity> findByDepartmentAndGender(String department, String gender);
    
    List<MedicalStaffEntity> findByDepartmentAndSpecialty(String department, String specialty);
}