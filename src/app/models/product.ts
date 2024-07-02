export interface Product {
  id:number,
  tipo_producto:string,
  nombre:string,
  descripcion:string,
  precio:number,
  created_at:string,
  updated_at:string,

}

export interface ApiResponse<T>{
  message?:string;
  data:T;
}
