import { Order, OrderUnitary } from "../models/order";
import { binPackingV4 } from "./BinPackingV4"
import { AlgoTournee } from "./AlgoTournee";
import { BoxCapacity } from "../models/box"
import Warehouse from "../utils/WarehouseUtils"
import {  Product } from "../models/product";
import { getUnitaryOrder } from "../utils/ProductsUtils";
import { Trolley } from "../models/trolley";

export function AlgoTrolley(orders: Order, trolley: Trolley) {
   //On recupere l'ensemble des colis produit par AlgoTournee
   const RepartitionColis = AlgoTournee(orders);
   //Affichage de la repartition de colis
   console.log("Repartition de colis : ", RepartitionColis);
}