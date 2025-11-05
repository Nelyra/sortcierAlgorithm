import fs from 'fs';
import path from 'path';

import { readInputFile } from './input_read/InputRead';
import { writeOutputFile } from './output/OutputWriter'
import { PrintWarehouse, PrintFullWarehouse, PrintStats, PrintTest, IsCommandArgument, GetCommandArgumentValue } from './utils/PrintUtils';
import { createAlleyChart } from './utils/ChartUtils';
import { AlgoTrolley } from './algorithms/AlgoTrolley';
import warehouse from './utils/WarehouseUtils';

console.log("Starting the program...");

async function main(file: string = 'instance_0116_131933_Z1') {
    // Check for --file argument
    if(IsCommandArgument("--file") && !IsCommandArgument("--all-files")) {
        file = GetCommandArgumentValue("--file")!;
        console.log("Using input file:", file);
    } else {
        console.log("No input file specified, using default:", file);
    }

    
    // Reading part
    await readInputFile('data/' + file + '.txt').then(
        () => {
            console.log("Input file read successfully.");
        }
    ).catch(
        err => {
            console.error("Error reading input file:", err);
        }
    );

    try {
        AlgoTrolley(warehouse.orders);
    } catch (err) {
        console.error("Error during AlgoTrolley execution:", err);
        return;
    }

    // Check for print arguments
    if(IsCommandArgument("--full-debug"))
        PrintFullWarehouse();
    
    if(IsCommandArgument("--debug"))
        PrintWarehouse();

    if(IsCommandArgument("--test"))
        PrintTest();

    if(IsCommandArgument("--stat"))
        PrintStats();

    if(IsCommandArgument("--chart"))
        createAlleyChart().then(() => {
            console.log("Chart created successfully.");
        } ).catch(err => {
            console.error("Error creating chart:", err);
        });

    await writeOutputFile('data/' + file + '_sol.txt');
}

if(IsCommandArgument("--all-files")) {
    // Get list of all files in data/ directory
    const dataDir = path.join(__dirname, 'data');
    fs.readdir(dataDir, async (err, files) => {
        if (err) {
            console.error("Error reading data directory:", err);
            return;
        }
        // Filter for .txt files only
        const inputFiles = files.filter(file => file.endsWith('.txt') && !file.endsWith('_sol.txt'));
        for (const file of inputFiles) {
            const filePath = path.join('data', file);
            console.log(`\nProcessing file: ${filePath}`);
            await main(file.replace('.txt', ''));
        }
    });
} else {
    main(IsCommandArgument("--file") ? GetCommandArgumentValue("--file")! : undefined);
}



