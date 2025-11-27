package com.example.codex.aloriag4.repository;

import com.example.codex.aloriag4.entity.MedicalStaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MedicalStaffRepository extends JpaRepository<MedicalStaffEntity, Long> {
    Optional<MedicalStaffEntity> findByUserAccountAccountID(Long accountId);
}