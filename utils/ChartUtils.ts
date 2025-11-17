import { BubbleController, Chart, LinearScale, PointElement, TitleOptions } from "chart.js"
import { getTrolleyDistanceDataset } from "./TrolleyUtils";
import fsp from 'fs/promises';
import { Canvas } from "skia-canvas";

import { alleyChart } from "../charts/alleyChart";
import { boxChart } from "../charts/boxChart";

Chart.register([
    BubbleController,
    LinearScale,
    PointElement,    
])

export async function createAllCharts() {
    await createChart(alleyChart, 'alley_chart');
    await createChart(boxChart, 'box_chart');

    console.log("All charts created successfully.");
}

async function createChart(chartFunction: (canvas: Canvas) => Chart = alleyChart, outputFile: string) {
    const canvas = new Canvas(1200, 900);
    const chart: Chart = chartFunction(canvas);

    const pngBuffer = await canvas.toBuffer('png', {matte: 'white', quality: 1});
    await fsp.writeFile(`output/${outputFile}.png`, pngBuffer);
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

export async function createTrolleyStepCountChart() {
    const canvas = new Canvas(1200, 900);
    const chart = new Chart(
        canvas as any,
        {
            type: 'bar',
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Nombre de pas par chariot',
                    }
                }
            },
            data: {
                datasets: getTrolleyDistanceDataset()
            }
        }
    )
    const pngBuffer = await canvas.toBuffer('png', {matte: 'white', quality: 1});
    await fsp.writeFile('output/trolley_path_chart.png', pngBuffer);
    chart.destroy();
}