import { Order, OrderUnitary } from "../models/order";
import { Product } from "../models/product";
import { getUnitaryOrder } from "../utils/ProductsUtils";

export function binPackingV4(order: Order, seuilPoids: number, seuilVolume: number)
{
    //idem que V3 mais avec Poids + Volume
    let unitaryOrder = getUnitaryOrder(order);

    // Réarrangement de la commande du plus lourd au plus léger
    unitaryOrder.products.sort((a, b) => (b.weight / seuilPoids) * (b.volume / seuilVolume) - (a.weight / seuilPoids) * (a.volume / seuilVolume));
    
    let listeColis = [];
    let colis: Product[] = [];
    let i=0;
    listeColis.push(colis);
    while (i <unitaryOrder.products.length){

        for (let j=0; j < listeColis.length; j++)
        {
            //calcul du poidsTotal et du volumeTotal
            let poidsTotal = 0;
            let volumeTotal = 0;
            for (let k = 0; k < listeColis[j].length; k++) {
                poidsTotal += listeColis[j][k].weight;
                volumeTotal += listeColis[j][k].volume;
            }
        
            if (poidsTotal + unitaryOrder.products[i].weight <= seuilPoids && volumeTotal + unitaryOrder.products[i].volume <= seuilVolume) {
                listeColis[j].push(unitaryOrder.products[i]);
            } else {
                let newColis = [];
                newColis.push(unitaryOrder.products[i]);
                listeColis.push(newColis);
            }
            i++;
            if (i == unitaryOrder.products.length) {
                return listeColis;
            }
        }
    }

    return listeColis;
}