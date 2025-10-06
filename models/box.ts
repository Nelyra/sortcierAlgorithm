import { Product } from "./product";

export const enum BoxCapacity {
    WEIGTH = 12000,
    VOLUME = 92160
}

export interface Box { 
    id: number;
    maxWeight: number;
    maxVolume: number;
    products: Map<Product, number>;
}