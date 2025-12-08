package clinicaflow.controller;

import clinicaflow.dto.request.PatientQueueRequest;
import clinicaflow.entity.Queue;
import clinicaflow.service.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin(origins = "http://localhost:3000") 
public class QueueController {

    @Autowired
    private QueueService queueService;

    @PostMapping("/join")
    public ResponseEntity<?> joinQueue(@RequestBody PatientQueueRequest request) {
        try {
            Queue newQueue = queueService.joinQueue(request);

            //custom response for the frontend
            Map<String, Object> response = new HashMap<>();
            response.put("queueNumber", newQueue.getQueueNumber());
            response.put("patientName", newQueue.getPatient().getFullName());
            response.put("status", newQueue.getStatus());
            response.put("estimatedTime", "15 mins"); // Placeholder logic

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error joining queue: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Queue>> getAllQueues() {
        return ResponseEntity.ok(queueService.getAllQueues());
    }
}