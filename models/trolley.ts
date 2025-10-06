import { Box } from "./box";

export const TROLLEY_CAPACITY = 6;

export interface Trolley {
    id: number;
    boxes: Box[];
}