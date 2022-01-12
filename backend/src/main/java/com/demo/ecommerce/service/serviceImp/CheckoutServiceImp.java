package com.demo.ecommerce.service.serviceImp;

import com.demo.ecommerce.dao.CustomerRepository;
import com.demo.ecommerce.dto.Purchase;
import com.demo.ecommerce.dto.PurchaseResponse;
import com.demo.ecommerce.entity.Customer;
import com.demo.ecommerce.entity.Order;
import com.demo.ecommerce.entity.OrderItem;
import com.demo.ecommerce.service.CheckoutService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImp implements CheckoutService {

    private final CustomerRepository customerRepository;

    public CheckoutServiceImp(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(orderItem -> order.add(orderItem));

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);

    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
