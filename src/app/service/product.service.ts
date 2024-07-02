import { Injectable } from '@angular/core';
import { ApiResponse, Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private http = inject(HttpClient);
  url='http://127.0.0.1:8000/api/products';
  constructor(private http:HttpClient) { }

  getAll(){
    //return this.http.get<Product[]>(this.url);
    return this.http.get<ApiResponse<Product[]>>(this.url);
  }

  getAllProducts(){
    return this.http.get<ApiResponse<Product[]>>(this.url);
  }

  getProduct(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(this.url+'/'+id);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.url,product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(this.url+'/'+id, product);
  }

  deleteProduct(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.url+'/'+id);
  }


}
