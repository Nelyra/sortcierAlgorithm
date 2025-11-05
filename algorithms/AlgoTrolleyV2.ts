import { Order, OrderUnitary } from "../models/order";
import { binPackingV4 } from "./BinPackingV4"
import { AlleyBlockAlgorithmV1, AlleyBlockAlgorithmV2 } from "./AlleyBlocksV1";
import { BoxCapacity } from "../models/box"
import { Box } from "../models/box";
import Warehouse from "../utils/WarehouseUtils"
import {  Product } from "../models/product";
import { getUnitaryOrder } from "../utils/ProductsUtils";
import { Trolley, TROLLEY_CAPACITY } from "../models/trolley";
import {getProductFromAlley} from "../utils/AlleyUtils"
import { Alley } from "../models/alley";
import warehouse from "../utils/WarehouseUtils";
import { count } from "console";


export function countCommonItems(arr1 : number[], arr2 : number[]) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  let count = 0;
  for (const value of set1) {
    if (set2.has(value)) count++;
  }
  return count;
}

//fonction qui return le fichier RepartitionColisJSON avec un décallage de 1 par rapport à l'original
function decallageRepartitionColisJSON(RepartitionColisJSON:{ box: Box, idAlleys: number[] }[]) {
    const RepartitionColisJSONDecallage = [];
    for(let i = 1; i < RepartitionColisJSON.length; i++) {
        RepartitionColisJSONDecallage.push(RepartitionColisJSON[i]);
    }
    RepartitionColisJSONDecallage.push(RepartitionColisJSON[0]);
    return RepartitionColisJSONDecallage;
}

//fonction qui calcule les Similarité des Alleys entre les colis d'une solution 
function calculSimilarite(RepartitionColisJSON:{ box: Box, idAlleys: number[] }[]): {box: Box, nbAlleys: number}[]  {
    let ColisSimilaires: { box: Box, nbAlleys: number }[] = [];
    for(let i = 1; i < RepartitionColisJSON.length; i++) {
        const Colis1 = RepartitionColisJSON[0];
        const Colis2 = RepartitionColisJSON[i];
        const AlleysSimilaires = countCommonItems(Colis1.idAlleys, Colis2.idAlleys);
        ColisSimilaires.push({box: Colis2.box, nbAlleys: AlleysSimilaires});
    }
    ColisSimilaires.sort((a, b) => b.nbAlleys - a.nbAlleys);
    return ColisSimilaires;
}

export function AlgoTrolleyV2(orders: Order[]) {
    
    for (const order of orders) {
        const RepartitionColis = AlleyBlockAlgorithmV1(order);
    }

    const optimalBoxes = warehouse.optimalBoxes.slice(0);
    let RepartitionColisJSON: { box: Box, idAlleys: number[] }[] = [];
    
    for (const box of optimalBoxes) {
        const idColis = box.id;
        const idAlleys: number[] = [];
        for (const product of box.products.keys()) {
            const alley = warehouse.alleys?.find(a => a.locationIds.includes(product.location));
            if (alley) {
                //si l'alley n'est pas deja dans la liste des alleys, on l'ajoute
                if (!idAlleys.includes(alley.id)) {
                    idAlleys.push(alley.id);
                }
            }
        }
        RepartitionColisJSON.push({ box, idAlleys });
    }

    let idTrolley = 0;
     
    while (optimalBoxes.length > 0) {
        const trolley = {
            id: idTrolley,
            boxes: [] as Box[]
        };
        let ColisSimilaires: {box: Box, nbAlleys: number}[] = []; // Liste des colis avec le nb d'alleys identiques au premier colis
        
        //IDEE : modifier cette partie de l'algorithme afin de tester l'algo pour chaque position possible du premier colis
        //Le plus simple serait de faire un tableau de solutions où chaque Colis sont au moins une fois premier de la liste RepartitionColisJSON
        let tableauDeRepartitionColisJSON = []; // Tableau de solutions [RepartitionColisJSON, RepartitionColisJSON, ...]
        tableauDeRepartitionColisJSON.push(RepartitionColisJSON);
        
        for(let i=0 ; i < RepartitionColisJSON.length-1; i++) {
            tableauDeRepartitionColisJSON.push(decallageRepartitionColisJSON(tableauDeRepartitionColisJSON[i]));
        }
                
        const TableauDeColisSimilaires = []; // Tableau de solutions [ColisSimilaires, ColisSimilaires, ...]
        for(let i = 0; i < tableauDeRepartitionColisJSON.length; i++) {
            TableauDeColisSimilaires.push(calculSimilarite(tableauDeRepartitionColisJSON[i]));
        }

        //creation DU JSON {TableauDeColisSimilaires[i], score}
        let TableauDeColisSimilairesJSON = [];
        for(let i = 0; i < TableauDeColisSimilaires.length; i++) {
            let score = 0;
            for(let j = 0; j < TableauDeColisSimilaires[i].length; j++) {
                score += TableauDeColisSimilaires[i][j].nbAlleys;
                //si j > 5 on arrete la boucle
                if (j >= 5) {
                    break;
                }
            }
            TableauDeColisSimilairesJSON.push({TableauDeColisSimilaires: TableauDeColisSimilaires[i], score: score});
            score = 0;
        }
        
        //On recupere la solution qui a le plus haut score
        let MeilleureSolution = TableauDeColisSimilairesJSON[0];
        let indexMeilleureSolution = 0;
        for (let i = 0; i < TableauDeColisSimilairesJSON.length; i++) {
            if (TableauDeColisSimilairesJSON[i].score > MeilleureSolution.score) {
                MeilleureSolution = TableauDeColisSimilairesJSON[i];
                indexMeilleureSolution = i;
            }
        }
        //affichage du meilleur score

        //On recupere la solution qui a le plus haut score
        RepartitionColisJSON = tableauDeRepartitionColisJSON[indexMeilleureSolution];
        ColisSimilaires = MeilleureSolution.TableauDeColisSimilaires;
        
        trolley.boxes.push(RepartitionColisJSON[0].box);
        let nbColisAjoutes;
        if (ColisSimilaires.length < TROLLEY_CAPACITY-1) {
            nbColisAjoutes = ColisSimilaires.length;
        }
        else {
            nbColisAjoutes = TROLLEY_CAPACITY-1;
        }
        for(let i = 0; i < nbColisAjoutes; i++){
                trolley.boxes.push(ColisSimilaires[i].box);
        }
        
        //Suppression des colis ajoutes au trolley dans les variables RepartitionColisJSON et optimalBoxes
        for (const box of trolley.boxes) {
        const index1 = RepartitionColisJSON.findIndex(Colis => Colis.box.id === box.id);
        if (index1 !== -1) RepartitionColisJSON.splice(index1, 1);

        const index2 = optimalBoxes.findIndex(b => b.id === box.id);
        if (index2 !== -1) optimalBoxes.splice(index2, 1);
        }

        warehouse.trolleys.push(trolley); 
        idTrolley++;
    }
    return;
}