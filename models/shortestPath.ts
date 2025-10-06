import { Location } from "./location";

export interface ShortestPath {
    start: Location;
    end: Location;
    distance: number;
}