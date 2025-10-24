import { TROLLEY_CAPACITY } from "../models/trolley"
import warehouse from "../utils/WarehouseUtils";

export function TrolleyAllocationRaw() {
    let i = 0;
    for (const box of warehouse.optimalBoxes) {
        i++;

        // Create new trolley every TROLLEY_CAPACITY boxes
        if (i % TROLLEY_CAPACITY === 1) {
            const trolley = {
                id: Math.floor(i / TROLLEY_CAPACITY),
                boxes: []
            };
            warehouse.trolleys.push(trolley);
        }

        // Add box to the last trolley
        const currentTrolley = warehouse.trolleys[warehouse.trolleys.length - 1];
        currentTrolley.boxes.push(box);
    }
}