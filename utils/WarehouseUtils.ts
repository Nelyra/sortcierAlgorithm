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
    warehouse.locationAmount = 0;
    warehouse.productAmount = 0;
    warehouse.orders = [];
    warehouse.products = [];
    warehouse.trolleys = [];
    warehouse.shortestPaths = [];
    warehouse.locations = [];
    warehouse.alleys = [];
    warehouse.optimalBoxes = [];
    warehouse.departLocation = undefined;
    warehouse.arrivalLocation = undefined;
    return warehouse;
}