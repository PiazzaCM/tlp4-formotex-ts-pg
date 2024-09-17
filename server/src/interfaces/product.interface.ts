export interface Product{
   id_producto?: number;
   name: string;
   status: string;
   stock: number;
   availableStock: number; 
   adquisitionDay: Date,
   id_organizacion?: number;
}