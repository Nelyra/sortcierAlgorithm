import { Alley } from "../models/alley";
import { Order, OrderUnitary } from "../models/order";
import { Product } from "../models/product";
import warehouse from "./WarehouseUtils";
import { getUnitaryOrder } from "./ProductsUtils"

export function setupAlleys() {
    if(warehouse.alleys === undefined) {
            warehouse.alleys = [];
    }
    
    for(const location of warehouse.locations) {
        const alleyName = getAlleyFromLocation(location.id);   

        if(alleyName == "depotStart" || alleyName == "depotEnd") continue;

        let alley = warehouse.alleys.find(a => a.name === alleyName);
        if(!alley) {
            alley = {
                id: warehouse.alleys.length,
                name: alleyName,
                locationIds: []
            };
            warehouse.alleys.push(alley);
        }

        alley.locationIds.push(location.id);
    }
}

export function getProductFromAlley(order: Order, alley: Alley[]): Product[] {

    const unitaryOrder: OrderUnitary = getUnitaryOrder(order);

    let productsInAlley: Product[] = [];
    for (const product of unitaryOrder.products) {
        const productAlleyName = getAlleyFromLocation(product.location);
        if (alley.some(a => a.name === productAlleyName)) {
            productsInAlley.push(product);
        }
    }

    return productsInAlley;
}

function getAlleyFromLocation(locationId: number) {
    const locationName = warehouse.locations[locationId].name;
    // Assuming name is aC_aC_name and aC_aC is the alley name
    return locationName.split('_').slice(0, 2).join('_');
}