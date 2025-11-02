
import * as fs from "fs";
import warehouse from "../utils/WarehouseUtils";

export async function writeOutputFile(filename: string) {
    if (warehouse.orders.length === 0) {
        console.error("No orders available to write output.");
        return;
    }

    const output = fs.createWriteStream(filename);

    output.write("//NbTournees\n");
    output.write(`${warehouse.trolleys.length}\n`);

    for (const trolley of warehouse.trolleys) {
        output.write("//IdTournes NbColis\n");
        output.write(`${trolley.id} ${trolley.boxes.length}\n`);

        output.write("//IdColis IdCommandeInColis NbProducts IdProd1 QtyProd1 IdProd2 QtyProd2 ...\n")
        for (const box of trolley.boxes) {
            output.write (`${box.id}`)
            output.write (` ${box.orderId}`)
            output.write (` ${box.products.size}`)
            for (const [product, quantity] of box.products.entries()) {
                output.write (` ${product.idx} ${quantity}`)
            }
            output.write (`\n`)
        }
    }
    


    output.end();

    console.log(`Output written to ${filename}`);
}