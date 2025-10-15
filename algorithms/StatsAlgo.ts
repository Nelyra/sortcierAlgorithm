import { Warehouse } from "../models/warehouse";
import { Order } from "../models/order";
import { BoxCapacity } from "../models/box";

export function getTotalWeight(warehouse: Warehouse): number {
    let totalWeight = 0;
    for (const order of warehouse.orders as Order[]) {
        totalWeight += Array.from(order.products.entries()).reduce((sum, [product, quantity]) => sum + product.weight * quantity, 0);
    }
    return totalWeight;
}

export function getTotalVolume(warehouse: Warehouse): number {
    let totalVolume = 0;
    for (const order of warehouse.orders as Order[]) {
        totalVolume += Array.from(order.products.entries()).reduce((sum, [product, quantity]) => sum + product.volume * quantity, 0);
    }
    return totalVolume;
}  

export function minimalNumberOfBoxes(warehouse: Warehouse): number {
    let minimalBoxForWeight = Math.ceil(getTotalWeight(warehouse) / BoxCapacity.WEIGTH);
    let minimalBoxForVolume = Math.ceil(getTotalVolume(warehouse) / BoxCapacity.VOLUME);
    return Math.max(minimalBoxForWeight, minimalBoxForVolume);
}
