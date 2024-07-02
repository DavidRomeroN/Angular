import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../models/table';
import { ApiResponse } from '../models/table';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  //private http = inject(HttpClient);
  url='http://127.0.0.1:8000/api/tables';
  constructor(private http:HttpClient) { }

  getAll(){
    //return this.http.get<Table[]>(this.url);
    return this.http.get<ApiResponse<Table[]>>(this.url);
  }

  getAllTables(){
    return this.http.get<ApiResponse<Table[]>>(this.url);
  }

  getTable(id: number): Observable<ApiResponse<Table>> {
    return this.http.get<ApiResponse<Table>>(this.url+'/'+id);
  }

  createTable(table: Table): Observable<any> {
    return this.http.post(this.url,table);
  }

  updateTable(id: number, table: Table): Observable<any> {
    return this.http.put(this.url+'/'+id, table);
  }

  deleteTable(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.url+'/'+id);
  }
}
