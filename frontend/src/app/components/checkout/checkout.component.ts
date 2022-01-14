import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Country } from "../../common/country";
import { State } from "../../common/state";
import { Luv2ShopFormService } from "../../services/luv2-shop-form.service";
import { CartService } from "../../services/cart.service";
import { Purchase } from "../../common/purchase";
import { Router } from "@angular/router";
import { Order } from "../../common/order";
import { OrderItem } from "../../common/order-item";
import { CheckoutService } from "../../services/checkout.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // @ts-ignore
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private luv2ShopFormService: Luv2ShopFormService,
              private formBuilder: FormBuilder,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.getCartDetails();

    const startMonth: number = new Date().getMonth() + 1;

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(data => this.creditCardMonths = data);

    this.luv2ShopFormService.getCreditCardYears().subscribe(data => this.creditCardYears = data);

    this.luv2ShopFormService.getCountries().subscribe(data => this.countries = data);

  }

  onSubmit() {
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    let cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(value => new OrderItem(value));

    let purchase = new Purchase();

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;


    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log(purchase)

    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        console.log(response)
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        this.resetCart();
      },
      error: err => {
        console.log(err)
        alert(`There was an error: ${err.message}`);
      }
    })

  }

  getCartDetails() {

    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);

    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

  }

  // @ts-ignore
  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      // @ts-ignore
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      // @ts-ignore
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number = 1;

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    )

  }

  getStates(forGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(forGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    this.luv2ShopFormService.getStatesByCountryCode(countryCode).subscribe(
      data => {
        if (forGroupName === 'billingAddress') this.billingAddressStates = data
        else if (forGroupName === 'shippingAddress') this.shippingAddressStates = data

        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products");
  }


}
