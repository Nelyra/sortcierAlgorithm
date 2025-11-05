import { Alley } from "./alley";
import { Box } from "./box";

export const TROLLEY_CAPACITY = 6;

export interface Trolley {
    id: number;
    boxes: Box[];
}

export interface TrolleyStat {
    id: number;
    boxCount: number;
    distanceTravelled: number;
    alleyVisited: Alley[]
}