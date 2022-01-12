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

  products: Product[] = [];
  previousCategoryId: number = 1;
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;
  totalPages: number = 1;

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

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1
    }

    this.previousCategoryId = this.currentCategoryId

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize,
      this.currentCategoryId).subscribe(this.processResult())
  }

  processResult() {
    // @ts-ignore
    return data => {
      this.products = data._embedded.products;
      this.pageSize = data.page.size;
      this.pageNumber = data.page.number + 1;
      this.totalElements = data.page.totalElements;
      this.totalPages = data.page.totalPages
    }

  }

  // @ts-ignore
  updatePageSize($event) {
    let pageSize: number = $event.target.value
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();

  }

}
