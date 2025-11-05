import { Order } from "../models/order";
import { Warehouse } from "../models/warehouse";

const warehouse: Warehouse = {
    locationAmount: 0,
    productAmount: 0,
    orders: [],
    products: [],
    trolleys: [],
    optimalBoxes: [],
    shortestPaths: [],
    locations: []
};
export default warehouse;

export function resetWarehouse(): Warehouse {
    warehouse.products = [];
    warehouse.trolleys = [];
    warehouse.shortestPaths = [];
    warehouse.locations = [];
    return warehouse;
}