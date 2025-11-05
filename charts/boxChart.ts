import { Chart } from "chart.js"
import { Canvas } from "skia-canvas";

import warehouse from "../utils/WarehouseUtils";
import { getWeightAndVolume } from "../utils/ProductsUtils";
import { get } from "http";


const COLORS = [
    'red', 'blue', 'green', 'orange', 'purple', 'cyan', 'magenta', 'yellow', 'lime', 'pink'
]
let colorPointer = 0;

export function boxChart(canvas: Canvas): Chart {
    return new Chart(
        canvas as any,
        {
            type: 'bubble',
            options: {
                aspectRatio: 1
            },
            data: {
                datasets: getDataset()
            }
        }
    )
}

function getDataset() {
    const datasets = [];

    for(const box of warehouse.optimalBoxes) {
        const {totalWeight, totalVolume} = getWeightAndVolume(box);
        datasets.push({
            label: `Box ${box.id}`,
            data: [{ x: totalVolume, y: totalWeight, r: 10 }],
            backgroundColor: getNextColor(),
        });
    }
    return datasets;
}

const getNextColor: () => string = () => COLORS[(colorPointer++) % COLORS.length];

