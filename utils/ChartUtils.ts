import { BubbleController, Chart, LinearScale, PointElement, TitleOptions } from "chart.js"
import fsp from 'fs/promises';
import { Canvas } from "skia-canvas";
import warehouse from "./WarehouseUtils";
import { get } from "http";

Chart.register([
    BubbleController,
    LinearScale,
    PointElement,
    
])

const COLORS = [
    'red', 'blue', 'green', 'orange', 'purple', 'cyan', 'magenta', 'yellow', 'lime', 'pink'
]
let colorPointer = 0;

export async function createAlleyChart() {
    const canvas = new Canvas(1200, 900);
    const chart = new Chart(
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

    const pngBuffer = await canvas.toBuffer('png', {matte: 'white', quality: 1});
    await fsp.writeFile('output/alley_chart.png', pngBuffer);
    chart.destroy();
}

function getDataset() {
    const datasets = [];

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

    return datasets;
}

function getNextColor() {
    const color = COLORS[colorPointer];
    colorPointer = (colorPointer + 1) % COLORS.length;
    return color;
}