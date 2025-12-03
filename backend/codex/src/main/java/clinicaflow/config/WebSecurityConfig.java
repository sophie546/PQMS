// File: backend/codex/src/main/java/clinicaflow/config/WebSecurityConfig.java
package clinicaflow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for APIs
            .authorizeHttpRequests(auth -> auth
                // Allow all auth endpoints without authentication
                .requestMatchers("/api/auth/**").permitAll()
                // Allow all other API endpoints
                .requestMatchers("/api/**").permitAll()
                // Allow any other request
                .anyRequest().permitAll()
            );
        
        return http.build();
    }
}