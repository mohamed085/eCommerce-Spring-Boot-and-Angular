import { Component, OnInit } from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // @ts-ignore
  product: Product;

  constructor(private productServices: ProductService,
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
        console.log("ss" + data)
        this.product = data
      }
    )

  }
}
