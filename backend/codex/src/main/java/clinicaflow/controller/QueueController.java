package clinicaflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import clinicaflow.entity.Queue;
import clinicaflow.repository.QueueRepository;
import java.util.List;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    @Autowired
    private QueueRepository queueRepository;

    // CREATE
    @PostMapping("/add")
    public Queue addQueue(@RequestBody Queue queue) {
        return queueRepository.save(queue);
    }

    // READ
    @GetMapping("/all")
    public List<Queue> getAllQueues() {
        return queueRepository.findAll();
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public Queue updateQueue(@PathVariable Long id, @RequestBody Queue newQueue) {
        return queueRepository.findById(id).map(queue -> {
            queue.setQueueNumber(newQueue.getQueueNumber());
            queue.setStatus(newQueue.getStatus());
            return queueRepository.save(queue);
        }).orElse(null);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteQueue(@PathVariable Long id) {
        queueRepository.deleteById(id);
        return "Queue with ID " + id + " has been deleted!";
    }
}
