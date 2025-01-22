export interface CartState {
  products: Product[];
  total: number;
}

export interface Product {
  dishId: string;
  quantity: number;
  price: number;
  name: string;
}
