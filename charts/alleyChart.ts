import warehouse from "../utils/WarehouseUtils";
import { Chart } from "chart.js"
import { Canvas } from "skia-canvas";
import { writeObjectToFile } from "../utils/ChartUtils";


const COLORS = [
    'red', 'blue', 'green', 'orange', 'purple', 'cyan', 'magenta', 'yellow', 'lime', 'pink'
]
let colorPointer = 0;

export function alleyChart(canvas: Canvas): Chart {
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
    colorPointer = 0;

    for(const alley of warehouse.alleys || []) {
        const data = alley.locationIds.map(locId => {
            const loc = warehouse.locations[locId];
            return { x: loc.x, y: loc.y, r: 5 };
        });

        if(data.length <= 1) continue;

        datasets.push({
            label: alley.name,
            data: data,
            backgroundColor: getNextColor(),
        });
    }

    writeObjectToFile(datasets, 'alley_chart_datasets');

    return datasets;
}

function getNextColor() {
    const color = COLORS[colorPointer];
    colorPointer = (colorPointer + 1) % COLORS.length;
    return color;
}