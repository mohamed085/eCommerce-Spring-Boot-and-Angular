package com.demo.ecommerce.service;

import com.demo.ecommerce.dao.CustomerRepository;
import com.demo.ecommerce.dto.AppUserDetails;
import com.demo.ecommerce.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public class AppUserDetailsServices implements UserDetailsService {

    @Autowired
    private CustomerRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Customer user = userRepository.findByEmail(email);

        return new AppUserDetails(user);
    }
}
