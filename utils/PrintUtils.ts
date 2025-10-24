import warehouse from "./WarehouseUtils";
import * as stats from "../algorithms/StatsAlgo";
import { AlleyBlockAlgorithmV1 } from "../algorithms/AlleyBlocksV1"
import { TrolleyAllocationRaw } from "../algorithms/TrolleyAllocationRaw";
import { BoxCapacity } from "../models/box";
import { Alley } from "../models/alley";

export function PrintTest() {
    console.log("Test Print");

    for(const order of warehouse.orders) {
        // console.log(`Processing Order ID: ${order.id} with max boxes: ${order.maxBoxes}`);
        AlleyBlockAlgorithmV1(order);
    }
    
    PrintOptimalBoxes();

    TrolleyAllocationRaw();
}

export function PrintWarehouse() {
    console.log("Warehouse State:");
    console.log({
        productAmount: warehouse.productAmount,
        numberOfProducts: warehouse.products.length,
        numberOfOrders: warehouse.orders.length,
        numberOfTrolleys: warehouse.trolleys.length,
        numberOfShortestPaths: warehouse.shortestPaths.length,
        numberOfAlleys: warehouse.alleys?.length,
        locationAmount: warehouse.locationAmount,
        numberOfLocations: warehouse.locations.length,
        departLocation: warehouse.departLocation,
        arrivalLocation: warehouse.arrivalLocation
    });
        
}

export function PrintFullWarehouse() {
    console.log("Warehouse State:");
    console.log(JSON.stringify(warehouse, null, 2));
}

export function PrintStats() {
    console.log();
    console.log("Warehouse Statistics:");
    console.log("Average weight by box:", stats.getTotalWeight() / stats.getNumberOfBoxes(), "max:", BoxCapacity.WEIGTH);
    console.log("Average volume per order:", stats.getTotalVolume() / stats.getNumberOfBoxes(), "max:", BoxCapacity.VOLUME);
    console.log("Minimal number of boxes needed:", stats.minimalNumberOfBoxes(), "vs max number of boxes:", stats.getNumberOfBoxes());
    console.log("Minimal number of boxes by orders:");
    const minimalBoxesByOrders = stats.minimalNumberOfBoxesByOrders();
    const uniqueProductsByOrder = stats.getUniqueProductsByOrder();
    for (const [order, boxCount] of minimalBoxesByOrders) {
        const uniqueCount = uniqueProductsByOrder.get(order);
        console.log(
            `Order ID: ${order.id} needs at least ${boxCount} boxes and has ${uniqueCount?.size ?? 0} unique products`
        );
    }
}

export function PrintOptimalBoxes() {
    for (const box of warehouse.optimalBoxes) {
        const alleysInBox: Alley[] = [];

        // Push alleys corresponding to products in the box
        for (const product of box.products.keys()) {
            const alley = warehouse.alleys?.find(a => a.locationIds.includes(product.location));
            if (alley && !alleysInBox.includes(alley)) {
                alleysInBox.push(alley);
            }
        }

        console.log({
            box_id: box.id,
            products: Array.from(box.products.entries()).map(([product, quantity]) => ({
                productId: product.idx,
                quantity: quantity,
            })),
            alleys: alleysInBox,
            totalWeight: Array.from(box.products.entries()).reduce((sum, [product, quantity]) => sum + product.weight * quantity, 0),
            totalVolume: Array.from(box.products.entries()).reduce((sum, [product, quantity]) => sum + product.volume * quantity, 0),
        })
    }
}

export function IsCommandArgument(arg: string): boolean {
    // Check if the arg starts with the argument
    return process.argv.slice(2).some(a => a.startsWith(arg));
}

export function GetCommandArgumentValue(arg: string): string | null {
    // Find the argument that starts with the specified arg
    const argument = process.argv.slice(2).find(a => a.startsWith(arg));
    if (argument) {
        const parts = argument.split("=");
        if (parts.length === 2) {
            return parts[1];
        }
    }
    return null;
}