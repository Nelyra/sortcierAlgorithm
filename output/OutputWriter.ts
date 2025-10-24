
import * as fs from "fs";
import warehouse from "../utils/WarehouseUtils";

export async function writeOutputFile(filename: string) {
    if (warehouse.orders.length === 0) {
        console.error("No orders available to write output.");
        return;
    }

    const output = fs.createWriteStream(filename);

    output.write("test");
    output.write("test2");

    output.end();

    console.log(`Output written to ${filename}`);
}