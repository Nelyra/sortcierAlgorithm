import { Box } from "./box";

export interface Trolley {
    id: number;
    maxNumberOfBoxes: number;
    boxes: Box[];
}