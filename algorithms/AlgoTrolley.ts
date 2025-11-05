import { Order } from "../models/order";
import { AlleyBlockAlgorithmV1 } from "./AlleyBlocksV1";
import { Box } from "../models/box";
import { TROLLEY_CAPACITY } from "../models/trolley";
import warehouse from "../utils/WarehouseUtils";


export function countCommonItems(arr1 : number[], arr2 : number[]) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  let count = 0;
  for (const value of set1) {
    if (set2.has(value)) count++;
  }
  return count;
}

export function AlgoTrolley(orders: Order[]) {
    
    for (const order of orders) {
        AlleyBlockAlgorithmV1(order);
    }

    const optimalBoxes = warehouse.optimalBoxes.slice(0);
    const RepartitionColisJSON: { box: Box, idAlleys: number[] }[] = [];
    
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
        let ColisSimilaires = []; // Liste des colis avec le nb d'alleys identiques au premier colis
            
        for(let i = 1; i < RepartitionColisJSON.length; i++) {
            const Colis1 = RepartitionColisJSON[0];
            const Colis2 = RepartitionColisJSON[i];
            const AlleysSimilaires = countCommonItems(Colis1.idAlleys, Colis2.idAlleys);
            ColisSimilaires.push({box: Colis2.box, nbAlleys: AlleysSimilaires});
        }

        ColisSimilaires.sort((a, b) => b.nbAlleys - a.nbAlleys);

        trolley.boxes.push(RepartitionColisJSON[0].box);
        let nbColisAjoutes;
        if (ColisSimilaires.length < TROLLEY_CAPACITY-1) {
            nbColisAjoutes = ColisSimilaires.length;
        }
        else {
            nbColisAjoutes = TROLLEY_CAPACITY-1;
        }
        for(let i = 0; i < nbColisAjoutes; i++) {
            trolley.boxes.push(ColisSimilaires[i].box);
        }

        //Suppression des colis ajoutes au trolley dans les variables RepartitionColisJSON et optimalBoxes
        for(let i = 0; i < 6; i++) {
            const index = RepartitionColisJSON.findIndex(Colis => Colis.box.id === trolley.boxes[i].id);
            if (index !== -1) {
                RepartitionColisJSON.splice(index, 1);
            }
        }
        for(let i = 0; i < 6; i++) {
            const index = optimalBoxes.findIndex(box => box.id === trolley.boxes[i].id);
            if (index !== -1) {
                optimalBoxes.splice(index, 1);
            }
        }
        warehouse.trolleys.push(trolley); 
        idTrolley++;
    }

    return;
}