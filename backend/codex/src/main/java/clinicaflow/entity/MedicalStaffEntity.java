package clinicaflow.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medical_staff")
public class MedicalStaffEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int staffID;

    private String name;
    private String role;
    private String contactNo;
    private String specialty;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "accountID", unique = true)
    private UserAccountEntity userAccount;

    public int getStaffID() {
        return staffID;
    }

    public void setStaffID(int staffID) {
        this.staffID = staffID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public UserAccountEntity getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(UserAccountEntity userAccount) {
        this.userAccount = userAccount;
    }
}