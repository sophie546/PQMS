package clinicaflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import clinicaflow.entity.ConsultationEntity;

@Repository
public interface ConsultationRepository extends JpaRepository<ConsultationEntity, Integer> {

}
