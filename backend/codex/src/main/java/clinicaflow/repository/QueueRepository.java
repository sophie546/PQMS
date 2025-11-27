package clinicaflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import clinicaflow.entity.Queue;

public interface QueueRepository extends JpaRepository<Queue, Long> {
}
