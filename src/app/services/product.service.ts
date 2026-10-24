import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = 'https://localhost:44355/api/';
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + 'products/getall';
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductsByCategoryId(
    categoryId: number,
  ): Observable<ListResponseModel<Product>> {
    let newPath =
      this.apiUrl + 'products/getallbycategoryid?categoryId=' + categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
}
