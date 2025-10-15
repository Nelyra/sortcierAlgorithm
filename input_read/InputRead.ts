import * as fs from "fs";
import * as util from "../utils/InputReadUtils"
import warehouse from "../utils/WarehouseUtils";
import { Product } from "../models/product.ts";


export let lineCount = 0;
export let lines: string[] = [];

export async function readInputFile(filename: string) {
    const file = fs.readFileSync(filename, "utf-8");
    lines = file.split("\n");

    while (lineCount < lines.length) {
        const line = lines[lineCount].trim();

        switch (util.readHeader(line)) {
            case "nblocations":
                lineCount++;
                const nblocations = parseInt(lines[lineCount].trim());
                warehouse.locationAmount = nblocations;
                break;
            case "nbproducts":
                lineCount++;
                const nbproducts = parseInt(lines[lineCount].trim());
                warehouse.productAmount = nbproducts;
                break;
            case "productLocation":
                lineCount++;
                while (lineCount < lines.length && lines[lineCount].trim() !== "") {
                    warehouse.products.push({
                        
                        idx: lines[lineCount].trim().split(" ").map(value => parseInt(value))[0],
                       location: lines[lineCount].trim().split(" ").map(value => parseInt(value))[1],
                        weight: lines[lineCount].trim().split(" ").map(value => parseInt(value))[2],
                        volume: lines[lineCount].trim().split(" ").map(value => parseInt(value))[3],
                    });
                    lineCount++;
                }
                break;
            case "order":
                lineCount++;
                while (lineCount < lines.length && lines[lineCount].trim() !== "") {
                    readOrder(lines[lineCount].trim());
                    lineCount++;
                }
                break;
            case "departingdepot":
                lineCount++;
                const departLocationId = parseInt(lines[lineCount].trim());
                warehouse.departLocation = departLocationId
                break;
            case "arrivaldepot":
                lineCount++;
                const arrivalLocationId = parseInt(lines[lineCount].trim());
                warehouse.arrivalLocation = arrivalLocationId
                break;
            case "shortestPath":
                lineCount++;
                while (lineCount < lines.length && lines[lineCount].trim() !== "") {
                    const pathData = lines[lineCount].trim().split(" ").map(value => parseInt(value));
                    warehouse.shortestPaths.push({
                        start: pathData[0],
                        end: pathData[1],
                        distance: pathData[2]
                    });
                    lineCount++;
                }
            case "location":
                lineCount++;
                while (lineCount < lines.length && lines[lineCount].trim() !== "") {
                    const locData = lines[lineCount].trim().split(" ");
                    
                    // Prevent useless lines
                    if(Number.isNaN(parseInt(locData[0])) || locData[3] == undefined) {
                        lineCount++;
                        continue;
                    }

                    warehouse.locations.push({
                        id: parseInt(locData[0]),
                        x: parseInt(locData[1]),
                        y: parseInt(locData[2]),
                        name: locData[3]
                    });

                    lineCount++;
                }
            default:
                // console.warn("Unknown header:", line);
                break;
        }

        // if(lineCount > 50) return; // Temporary stop condition for testing

        lineCount++;
    }
}

function readOrder(line: string) {
    const orderData = line.split(" ").map(value => parseInt(value));

    const orderMap = new Map<Product, number>();
    for (let i = 3; i < orderData.length; i += 2) {
        const productId = orderData[i];
        const quantity = orderData[i + 1];
        const product = warehouse.products.find(p => p.idx === productId);

        if (product) {
            orderMap.set(product, quantity);
        } else {
            console.warn(`Product with ID ${productId} not found in warehouse products.`);
        }
    }

    warehouse.orders.push({
        id: orderData[0],
        maxBoxes: orderData[1],
        products: orderMap
    });

}