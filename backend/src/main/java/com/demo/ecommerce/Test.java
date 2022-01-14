//package com.demo.ecommerce;
//
//import com.demo.ecommerce.dao.CustomerRepository;
//import com.demo.ecommerce.dao.RolesRepository;
//import com.demo.ecommerce.entity.Customer;
//import com.demo.ecommerce.entity.UserRole;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//@Service
//public class Test implements CommandLineRunner {
//
//    private CustomerRepository customerRepository;
//    private RolesRepository rolesRepository;
//    private PasswordEncoder passwordEncoder;
//
//    public Test(CustomerRepository customerRepository, RolesRepository rolesRepository, PasswordEncoder passwordEncoder) {
//        this.customerRepository = customerRepository;
//        this.rolesRepository = rolesRepository;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        Customer customer = new Customer();
//        customer = customerRepository.findByEmail("mohamed05555@gmail.com");
//        System.out.println(customer.toString());
//    }
//}
