import { Product } from "./product";

export interface Order {
    id: number;
    maxBoxes: number;
    products: Map<Product, number>;
}

export interface OrderUnitary {
    id: number;
    maxBoxes: number;
    products: Product[];
}