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

  getProductListPaginate(pageNumber: number, pageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}&page=${pageNumber}&size=${pageSize}`

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  searchProductList(keyword: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}`

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/products/${id}`

    return this.httpClient.get<Product>(url);
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
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
  }
}


interface GetResponseCategories {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
