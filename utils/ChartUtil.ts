import { Chart } from "chart.js"
import fsp from 'fs/promises';
import { Canvas } from "skia-canvas";


export async function createAlleyChart() {
    const canvas = new Canvas(800, 600);
    const chart = new Chart(
        canvas as any,
        {
            type: "bubble",
            data: {
                labels: ['Red'],
                datasets: [{
                    data: [{ x: 10, y: 20, r: 5 }, { x: 15, y: 10, r: 10 }, { x: 26, y: 12, r: 15 }],
                }]
            }
        }
    )

    const pngBuffer = await canvas.toBuffer('png');
    await fsp.writeFile('chart.png', pngBuffer);
    chart.destroy();
}