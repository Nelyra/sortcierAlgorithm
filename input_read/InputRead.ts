import * as fs from "fs";
import * as util from "../utils/InputReadUtils"


export let lineCount = 0;
export let lines: string[] = [];

export async function readInputFile(filename: string) {
    const file = fs.readFileSync(filename, "utf-8");
    lines = file.split("\n");

    while (lineCount < lines.length) {
        const line = lines[lineCount].trim();

        switch (util.readHeader(line)) {
            case "nblocations":
                lineCount++;
                const nblocations = parseInt(lines[lineCount].trim());
                console.log("Number of locations:", nblocations);
                break;
            default:
                console.warn("Unknown header:", line);
                break;
        }

        if(lineCount > 5) return; // Temporary stop condition for testing

        lineCount++;
    }
}