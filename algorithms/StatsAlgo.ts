import warehouse from "../utils/WarehouseUtils";
import { Order } from "../models/order";
import { BoxCapacity } from "../models/box";

export function getTotalWeight(): number {
    let totalWeight = 0;
    for (const order of warehouse.orders as Order[]) {
        totalWeight += Array.from(order.products.entries()).reduce((sum, [product, quantity]) => sum + product.weight * quantity, 0);
    }
    return totalWeight;
}

export function getTotalVolume(): number {
    let totalVolume = 0;
    for (const order of warehouse.orders as Order[]) {
        totalVolume += Array.from(order.products.entries()).reduce((sum, [product, quantity]) => sum + product.volume * quantity, 0);
    }
    return totalVolume;
}

export function getNumberOfBoxes(): number {
    let boxCount = 0;
    for (const order of warehouse.orders as Order[]) {
        boxCount += order.maxBoxes;
    }
    return boxCount;
}

export function minimalNumberOfBoxes(): number {
    let minimalBoxForWeight = Math.ceil(getTotalWeight() / BoxCapacity.WEIGTH);
    let minimalBoxForVolume = Math.ceil(getTotalVolume() / BoxCapacity.VOLUME);
    return Math.max(minimalBoxForWeight, minimalBoxForVolume);
}
