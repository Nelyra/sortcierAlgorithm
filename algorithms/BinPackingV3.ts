import { Order, OrderUnitary } from "../models/order";
import { Product } from "../models/product";
import { getUnitaryOrder } from "../utils/ProductsUtils";

//3eme version on revient avec uniquement le seuilPoids, l'idée est de trier les objets de la commande par ordre décroissant (poids du plus grand au plus petit), ensuite construire les différents colis en fonction de la capacité du colis.
export function binPackingV3(order: Order, seuilPoids: number)
{
    const unitaryOrder: OrderUnitary = getUnitaryOrder(order);

    unitaryOrder.products.sort((a, b) => b.weight - a.weight);

    //parcourir la commande_decroissante et construire les colis dans la structure suivante : [[produit1,produit2,produit3],[produit4,produit5],...]
    let listeColis = [];
    let colis: Product[] = [];
    let i=0;
    listeColis.push(colis);
    //for (let i = 0; i < commande_decroissante.length; i++) {
    while(i <unitaryOrder.products.length){
        //Objectif : on regarde pour chaque colis dans la listecolis (1 colis = litecolis[i]) si on peut ajouter le produit commande_decroissante[i] dans le colis si ce n'est pas possible, on créer le colis dans la listeColis et on insere le produit commande_decroissante[i]

        //Parcours de chaque colis de la listecolis
        for(let j=0; j < listeColis.length; j++)
        {
            //On calcul le poidsTotal de chaque Colis : 
            let poidsTotal = 0;
            for (let k = 0; k < listeColis[j].length; k++) {
                poidsTotal += listeColis[j][k].weight;
            }
            //console.log("poidsTotal colis "+j+" : "+poidsTotal);
            // si le poidsTotal + le poids de commande_decroissante[i] >= SeuilPoids alors on créer un nouveau colis
            //console.log("i : "+i);
            if (poidsTotal + unitaryOrder.products[i].weight >= seuilPoids) {
                let newColis = [];
                newColis.push(unitaryOrder.products[i]);
                listeColis.push(newColis);
            }
            //sinon on ajoute le commande_decroissante[i] dans le colis
            else{
                listeColis[j].push(unitaryOrder.products[i]);
            }
            i++;
            if (i == unitaryOrder.products.length) {
                return listeColis;
            }
        }
    }
    return listeColis;
}