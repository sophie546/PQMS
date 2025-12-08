package clinicaflow.repository;

import clinicaflow.entity.MedicalStaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MedicalStaffRepository extends JpaRepository<MedicalStaffEntity, Integer> {
    Optional<MedicalStaffEntity> findByUserAccountAccountID(int accountId);
}