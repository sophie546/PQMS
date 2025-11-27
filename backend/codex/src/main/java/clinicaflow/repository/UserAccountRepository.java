package com.example.codex.aloriag4.repository;

import com.example.codex.aloriag4.entity.UserAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccountEntity, Long> {
    Optional<UserAccountEntity> findByUsername(String username);
}