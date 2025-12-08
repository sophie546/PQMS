package clinicaflow.service;

import clinicaflow.dto.request.PatientQueueRequest;
import clinicaflow.entity.PatientEntity;
import clinicaflow.entity.Queue;
import clinicaflow.repository.PatientRepository;
import clinicaflow.repository.QueueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class QueueService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Transactional // Ensures both patient and queue are saved, or neither is
    public Queue joinQueue(PatientQueueRequest request) {
        
        // 1. Create and Save Patient
        PatientEntity patient = new PatientEntity();
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setContactNo(request.getContactNo());
        patient.setAddress(request.getAddress());
        
        // Save patient first
        patient = patientRepository.save(patient);

        // 2. Generate Queue Number
        String nextQueueNumber = generateNextQueueNumber();

        // 3. Create Queue Entry
        Queue queue = new Queue();
        queue.setQueueNumber(nextQueueNumber);
        queue.setStatus("WAITING"); // Default status
        queue.setPatient(patient);  // Link the patient
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a");
        queue.setArrivalTime(LocalTime.now().format(formatter));
        queue.setAssignedDoctor("Unassigned"); 

        // 4. Save and Return
        return queueRepository.save(queue);
    }

    private String generateNextQueueNumber() {
        return queueRepository.findLastQueueEntry()
                .map(lastQueue -> {
                    // Logic: Get last number "Q-005", parse 5, add 1 -> "Q-006"
                    String lastNumStr = lastQueue.getQueueNumber();
                    // Assuming format is always "Q-XXX"
                    int lastNum = Integer.parseInt(lastNumStr.split("-")[1]);
                    return String.format("Q-%03d", lastNum + 1);
                })
                .orElse("Q-001"); // Default if table is empty
    }

    public List<Queue> getAllQueues() {
        return queueRepository.findAll();
    }
}