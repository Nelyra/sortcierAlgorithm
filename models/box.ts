import { Product } from "./products";

export interface Box { 
    id: number;
    maxWeight: number;
    maxVolume: number;
    products: Product[];
}