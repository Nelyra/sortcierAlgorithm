import { Box } from "../models/box";
import { Order, OrderUnitary } from "../models/order";

export function getUnitaryOrder(order: Order): OrderUnitary {
    const getUnitaryOrder: OrderUnitary = {
        id: order.id,
        maxBoxes: order.maxBoxes,
        products: []
    }

    for (const [product, quantity] of order.products) {
        for (let i = 0; i < quantity; i++) {
            getUnitaryOrder.products.push(product);
        }
    }

    return getUnitaryOrder;
}

export function getWeightAndVolume(box: Box): { totalWeight: number, totalVolume: number } {
    let totalWeight = 0;
    let totalVolume = 0;
    for (const [product, quantity] of box.products) {
        totalWeight += product.weight * quantity;
        totalVolume += product.volume * quantity;
    }
    return { totalWeight, totalVolume };
}