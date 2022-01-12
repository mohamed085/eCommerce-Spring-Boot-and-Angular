import { Component, OnInit } from '@angular/core';
import { Product } from "../../common/product";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { CartItem } from "../../common/cart-item";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // @ts-ignore
  product: Product;

  constructor(private productServices: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductDetails();
    })
  }

  private getProductDetails() {
    // @ts-ignore
    const productId: number = +this.route.snapshot.paramMap.get("id");

    this.productServices.getProductById(productId).subscribe(
      data => {
        this.product = data
      }
    )
  }

  addToCart() {
    const cartItem: CartItem = new CartItem(this.product);

    this.cartService.addToCart(cartItem);
  }

}
