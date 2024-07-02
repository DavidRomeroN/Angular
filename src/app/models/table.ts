export interface Table {
  id:number,
  numero:number,
  aforo:number,
  created_at:string,
  updated_at:string,
}

export interface ApiResponse<T>{
  message?:string;
  data:T;
}
