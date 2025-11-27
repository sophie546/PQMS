package clinicaflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import clinicaflow.entity.PatientEntity;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Integer> {

}
