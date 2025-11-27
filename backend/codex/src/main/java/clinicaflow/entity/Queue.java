package clinicaflow.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "queue")
public class Queue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "queue_number")
    private String queueNumber;

    @Column(name = "status")
    private String status;

    // Constructors
    public Queue() {}

    public Queue(String queueNumber, String status) {
        this.queueNumber = queueNumber;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQueueNumber() {
        return queueNumber;
    }

    public void setQueueNumber(String queueNumber) {
        this.queueNumber = queueNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

