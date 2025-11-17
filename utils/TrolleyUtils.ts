import warehouse from "./WarehouseUtils";
import { Trolley } from "../models/TrolleyModel";
import { Box } from "../models/box";
import { Product } from "../models/product";
import { Location } from "../models/location";
import { ShortestPath } from "../models/shortestPath";

export function getTrolleyDistanceDataset() {
    // addition of the shortest path distance for each item in the trolley
    const datasets = [];
    for (const trolley of warehouse.trolleys as Trolley[]) {
        let totalDistance = 0;
        for (const box of trolley.boxes as Box[]) {
            const allProductsLocations: Location[] = [];
            //get the product in the map product id
            for (const product of box.products.keys()) {
                allProductsLocations.push(product.location);
            }
            allProductsLocations.sort((a, b) => a.id - b.id);
            for (let i = 0; i < allProductsLocations.length - 1; i++) {
                const path: ShortestPath = warehouse.shortestPaths.find(sp => sp.start === allProductsLocations[i].id && sp.end === allProductsLocations[i + 1].id);
                if (path) {
                    totalDistance += path.distance;
                }
            }
        }
        datasets.push({
            label: `Trolley ${trolley.id} Distance`,
            data: [{ x: trolley.id, y: totalDistance, r: 10 }],
            backgroundColor: 'blue',
        });
    }
    return datasets;
}


