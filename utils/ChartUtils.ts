import { BubbleController, Chart, LinearScale, PointElement } from "chart.js"
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