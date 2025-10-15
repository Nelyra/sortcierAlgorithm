



export function readHeader(line: string): string {
    switch (line.trim()) {
        case "//NbLocations":
            return "nblocations";
        case "//NbProducts":
            return "nbproducts";
        // case "//K: NbBoxesTrolley":
        //     return "nbboxestrolley";
        // case "//NbDimensionsCapacity":
        //     return "nbdimensionscapacity";
        // case "//B: CapaBox":
        //     return "capabox";
        case "//Idx Location Dim1 Dim2 ...":
            return "productLocation";
        case "//LocStart LocEnd ShortestPath":
            return "shortestPath";
        case "//NbOrders":
            return "nborders";
        case "//Idx M NbProdInOrder ProdIdx1 Qty1 ProdIdx2 Qty2 ...":
            return "order"
        case "//NbVerticesIntersections":
            return "nbverticesintersections";
        case "//DepartingDepot":
            return "departingdepot";
        case "//ArrivalDepot":
            return "arrivaldepot";
        case "//Start End Distance":
            return "distance";
        case "//Loc x y":
            return "location";
        default:
            return "Unknown header.";
    }
}