package com.example.movies.security;

import static org.springframework.security.config.Customizer.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.movies.payload.request.RequestLoggingFilter;
import com.example.movies.security.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class WebSecurityConfig {

        private final AuthenticationProvider authenticationProvider;
        private final JwtFilter jwtAuthFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http,
                        RequestLoggingFilter loggingFilter) throws Exception {
                http
                                .addFilterBefore(loggingFilter,
                                                UsernamePasswordAuthenticationFilter.class)
                                .cors(withDefaults()).csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(req -> req
                                                .requestMatchers("/auth/**", "/v2/api-docs",
                                                                "/v3/api-docs", "/v3/api-docs/**",
                                                                "/swagger-resources",
                                                                "/swagger-resources/**",
                                                                "/configuration/ui",
                                                                "/configuration/security",
                                                                "/swagger-ui/**", "/webjars/**",
                                                                "/swagger-ui.html")
                                                .permitAll()
                                                .requestMatchers("/movies/**").authenticated()
                                                .anyRequest().authenticated())
                                .addFilterBefore(jwtAuthFilter,
                                                UsernamePasswordAuthenticationFilter.class)
                                .authenticationProvider(authenticationProvider);

                return http.build();
        }
}
