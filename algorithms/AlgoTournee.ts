import { Order, OrderUnitary } from "../models/order";
import { binPackingV4 } from "./BinPackingV4"
import { BoxCapacity } from "../models/box"
import Warehouse from "../utils/WarehouseUtils"
import {  Product } from "../models/product";
import { getUnitaryOrder } from "../utils/ProductsUtils";

// ================== OPTIMISATION ==================
function opti(articles) {
    let resultatTotal = [];
    while (articles.length > 0) {
        const lots = binPackingV4(articles, BoxCapacity.WEIGTH , BoxCapacity.VOLUME);
        if (!lots || lots.length === 0) break;

        const BestLot = lots[0];
        resultatTotal.push(BestLot);

        for (let nomProduit of BestLot.nom) {
            articles = articles.filter(a => a.nom !== nomProduit);
        }
    }
    return resultatTotal;
}

// ================== FILTRAGE PAR RANGÉE ==================

function getProduitsParAllee(cmd, allees) {
    if (!Array.isArray(allees)) allees = [allees];
    const alleesNum = allees.map(a => Number(a));
    return cmd.filter(produit => alleesNum.includes(Number(produit.row)));
}

export function AlgoTournee(order: Order)
{
    let resultatfinal = [];
    const nbAllee = Warehouse.alleys.length;
    const nbColisLocal = order.maxBoxes;
    let solutionTrouvee = false;

    for (let groupSize = 1; groupSize <= nbAllee; groupSize++) {
        resultatfinal = [];

        for (let start = 1; start <= nbAllee; start += groupSize) {
            let alleesBloc = [];
            for (let i = start; i < start + groupSize && i <= nbAllee; i++) {
                alleesBloc.push(i);
            }

            const articles = getProduitsParAllee(order, alleesBloc);
            const articleOpti = opti(articles);

            if (articleOpti.length !== 0) {
                articleOpti.forEach(l => l.allees = alleesBloc.slice());
                resultatfinal.push(...articleOpti);
            }
        }

        if (resultatfinal.length <= nbColisLocal && resultatfinal.length > 0) {
            solutionTrouvee = true;
            return resultatfinal;
        }
    }

    if (!solutionTrouvee) {
    }
    return resultatfinal;
}