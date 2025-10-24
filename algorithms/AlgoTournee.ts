import { Order, OrderUnitary } from "../models/order";
import { Product } from "../models/product";
import { getUnitaryOrder } from "../utils/ProductsUtils";

export function AlgoTournee(order: Order, seuilPoids: number, seuilVolume: number)
{
    let resultatfinal = [];
    const nbAllee = NbAlleeMax;
    const nbColisLocal = NbColis;
    let solutionTrouvee = false;

    for (let groupSize = 1; groupSize <= nbAllee; groupSize++) {
        resultatfinal = [];

        for (let start = 1; start <= nbAllee; start += groupSize) {
            let alleesBloc = [];
            for (let i = start; i < start + groupSize && i <= nbAllee; i++) {
                alleesBloc.push(i);
            }

            const articles = getProduitsParAllee(commande, alleesBloc);
            const articleOpti = opti(articles);

            if (articleOpti.length !== 0) {
                articleOpti.forEach(l => l.allees = alleesBloc.slice());
                resultatfinal.push(...articleOpti);
            }
        }

        if (resultatfinal.length <= nbColisLocal && resultatfinal.length > 0) {
            afficherResultats(resultatfinal, groupSize);
            solutionTrouvee = true;
            return resultatfinal;
        }
    }

    if (!solutionTrouvee) {
        afficherResultats([], 0);
    }
    return resultatfinal;
}