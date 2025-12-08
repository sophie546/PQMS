package clinicaflow.repository;
import clinicaflow.entity.Queue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;


public interface QueueRepository extends JpaRepository<Queue, Long> {
    // Custom query to get the very last queue entry ordered by ID descending
    @Query(value = "SELECT * FROM queue ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<Queue> findLastQueueEntry();
}
