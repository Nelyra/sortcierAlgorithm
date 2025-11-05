import { Trolley, TrolleyStat } from "../models/trolley";

export function getTrolleyStat(trolley: Trolley): TrolleyStat {
    
    
    const stat: TrolleyStat = {
        id: trolley.id,
        boxCount: trolley.boxes.length,
        distanceTravelled: 0,
        alleyVisited: []
    }

    return stat;
}