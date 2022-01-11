import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // @ts-ignore
  products: Product[];
  // @ts-ignore
  currentCategoryId: number;
  // @ts-ignore
  searchMode: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) this.handleSearchListProducts();
    else this.handleListProducts();
  }

  handleSearchListProducts() {
    // @ts-ignore
    const keyword: string = this.route.snapshot.paramMap.get("keyword");

    this.productService.searchProductList(keyword).subscribe(
      data => {
        this.products = data
      }
    )  }

  handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data
      }
    )

  }

}
