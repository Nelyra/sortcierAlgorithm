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