import { Order } from "../models/order";
import { binPackingV4 } from "./BinPackingV4"
import { Box, BoxCapacity } from "../models/box"
import warehouse from "../utils/WarehouseUtils"
import { Product } from "../models/product";
import { Alley } from "../models/alley";
import { getProductFromAlley } from "../utils/AlleyUtils";

// ================== OPTIMISATION ==================
function findOptimalBox(articles: Product[]): Product[][] {
    let resultatTotal = [];
    while (articles.length > 0) {
        // Find the best possible box arrangements
        const possibleBoxes = binPackingV4(articles, BoxCapacity.WEIGTH , BoxCapacity.VOLUME);

        // If no box can be formed, exit the loop
        if (!possibleBoxes || possibleBoxes.length === 0) return resultatTotal;

        const best = possibleBoxes[0];
        resultatTotal.push(best);

        // Remove the selected products from the articles list
        for (const prod of best) {
            const index = articles.indexOf(prod);
            if (index > -1) {
                articles.splice(index, 1);
            }
        }
    }
    return resultatTotal;
}

// ================== FILTRAGE PAR RANGÉE ==================

export function AlleyBlockAlgorithmV1(order: Order)
{
    let resultatFinal = [];
    const nbAllee = warehouse.alleys?.length;
    const nbColisLocal = order.maxBoxes;
    let solutionTrouvee = false;

    if (!nbAllee || warehouse.alleys?.length === 0) {
        return;
    }

    // We try different group sizes of alleys
    for (let groupSize = 1; groupSize <= nbAllee; groupSize++) {
        resultatFinal = [];

        for (let start = 1; start <= nbAllee; start += groupSize) {
            let alleesBloc: Alley[] = [];
            for (let i = start; i < start + groupSize && i <= nbAllee; i++) {
                alleesBloc.push(warehouse.alleys![i - 1]);
            }

            // Get products in the selected alleys
            const articles = getProductFromAlley(order, alleesBloc);
            const articleOpti: Product[][] = findOptimalBox(articles);

            // Add optimized boxes to the final result
            if (articleOpti.length !== 0) {
                // Add the optimized boxes to the final result
                resultatFinal.push(...articleOpti);
            }
        }

        // Check if the current arrangement meets the box limit
        if (resultatFinal.length <= nbColisLocal && resultatFinal.length > 0) {
            solutionTrouvee = true;

            for (const colis of resultatFinal) {
                const box: Box = {
                    id: warehouse.optimalBoxes.length,
                    maxVolume: BoxCapacity.VOLUME,
                    maxWeight: BoxCapacity.WEIGTH,
                    products: new Map<Product, number>()
                }
                for (const product of colis) {
                    box.products.set(product, (box.products.get(product) || 0) + 1);
                }
                warehouse.optimalBoxes.push(box)
            }

            return resultatFinal;
        }
    }

    if (!solutionTrouvee) {
        console.log(`No solution found within the box limit of ${nbColisLocal}. Using the best found solution with ${resultatFinal.length} boxes.`);
    }
    return resultatFinal;
}