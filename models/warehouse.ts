import { Location } from "./location";
import { Order } from "./order";
import { Product } from "./product";
import { ShortestPath } from "./shortestPath";
import { Trolley } from "./trolley";

export interface Warehouse {
    locationAmount: number;
    productAmount: number;
    orders: Order[];
    products: Product[];
    trolleys: Trolley[];
    shortestPaths: ShortestPath[];
    locations: Location[];
    departLocation?: number;
    arrivalLocation?: number;
}