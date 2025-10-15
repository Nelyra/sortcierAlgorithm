import warehouse from "./WarehouseUtils";

export function PrintTest() {
    // console.log("Test Print Function");
    // for(const order of warehouse.orders) {
    //     console.log(`Order ID: ${order.id}`);
    // }
    console.log("Locations:");
    console.log(warehouse.locations);
}

export function PrintWarehouse() {
    console.log("Warehouse State:");
    console.log({
        productAmount: warehouse.productAmount,
        numberOfProducts: warehouse.products.length,
        numberOfOrders: warehouse.orders.length,
        numberOfTrolleys: warehouse.trolleys.length,
        numberOfShortestPaths: warehouse.shortestPaths.length,
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