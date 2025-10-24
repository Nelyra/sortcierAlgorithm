import { Alley } from "./alley";
import { Box } from "./box";
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
    optimalBoxes: Box[];
    alleys?: Alley[];
    departLocation?: number;
    arrivalLocation?: number;
}

