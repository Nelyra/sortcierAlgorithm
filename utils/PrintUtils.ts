import warehouse from "./WarehouseUtils";
import * as stats from "../algorithms/StatsAlgo";
import { BoxCapacity } from "../models/box";
import { setupAlleys } from "./AlleyUtils";

export function PrintTest() {
    console.log("Test Print");
    for (const alley of warehouse.alleys || []) {
        console.log(`Alley ${alley.name} (ID: ${alley.id}): Locations: ${alley.locationIds.join(", ")}`);
    }
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
    console.log()
}

export function IsCommandArgument(arg: string): boolean {
    return process.argv.slice(2).includes(arg);
}