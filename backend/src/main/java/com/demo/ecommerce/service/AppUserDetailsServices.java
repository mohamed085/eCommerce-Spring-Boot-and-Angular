package com.demo.ecommerce.service;

import com.demo.ecommerce.dao.CustomerRepository;
import com.demo.ecommerce.dto.AppUserDetails;
import com.demo.ecommerce.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsServices implements UserDetailsService {

    private final CustomerRepository userRepository;

    public AppUserDetailsServices(CustomerRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        Customer user = userRepository.findByEmail(email);
        System.out.println(user.toString());
        if (user == null) {
            throw new UsernameNotFoundException("Could not find user with email: " + email);
        } else {
            return new AppUserDetails(user);
        }
    }
}
