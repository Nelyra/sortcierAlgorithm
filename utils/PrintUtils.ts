import warehouse from "./WarehouseUtils";
import * as stats from "../algorithms/StatsAlgo";
import { binPackingV3 } from "../algorithms/BinPackingV3"
import { binPackingV4 } from "../algorithms/BinPackingV4"
import { Box, BoxCapacity } from "../models/box";
import { setupAlleys } from "./AlleyUtils";
import { Trolley } from "../models/trolley";
import { Product } from "../models/product";

export function PrintTest() {
    console.log("Test Print");

    const trolley: Trolley = {
        id: 0,
        boxes: []
    }

    // for (const alley of warehouse.alleys || []) {
    //     console.log(`Alley ${alley.name} (ID: ${alley.id}): Locations: ${alley.locationIds.join(", ")}`);
    // }
    const solution = binPackingV4(warehouse.orders[0], BoxCapacity.WEIGTH, BoxCapacity.VOLUME);
    for (const colis of solution) {
        const box: Box = {
            id: trolley.boxes.length,
            maxVolume: BoxCapacity.VOLUME,
            maxWeight: BoxCapacity.WEIGTH,
            products: new Map<Product, number>()
        }

        for (const product of colis) {
            console.log(`Product ID: ${product.idx}, Weight: ${product.weight}, Volume: ${product.volume}, Alley: ${warehouse.alleys?.find(alley => alley.locationIds.includes(product.location))?.id || "Unknown"}`);
            box.products.set(product, (box.products.get(product) || 0) + 1);
        }

        trolley.boxes.push(box);

        console.log("Total weight:", colis.reduce((sum, product) => sum + product.weight, 0));
        console.log("Total volume:", colis.reduce((sum, product) => sum + product.volume, 0));
        console.log(" ")
    }

    warehouse.trolleys.push(trolley);
    console.log("Trolley:", JSON.stringify(trolley, null, 2));
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

export function IsCommandArgument(arg: string): boolean {
    return process.argv.slice(2).includes(arg);
}