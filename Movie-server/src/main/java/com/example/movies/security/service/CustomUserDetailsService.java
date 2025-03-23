// package com.example.movies.security.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.example.movies.repository.UserRepo;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {
// @Autowired
// private UserRepo userRepository;

// @Override
// public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
// return userRepository.findByEmail(email)
// .orElseThrow(
// () -> new UsernameNotFoundException("User not found with email: " + email));
// }
// }
