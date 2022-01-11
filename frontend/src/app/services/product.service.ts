import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Product } from "../common/product";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api"

  constructor(private httpClient: HttpClient) {
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductCategories(): Observable<ProductCategory[]> {

    const searchUrl = `${this.baseUrl}/product-category`

    return this.httpClient.get<GetResponseCategories>(searchUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }
}


interface GetResponseProducts {
  _embedded: {
    products: Product[]
  }
}


interface GetResponseCategories {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
