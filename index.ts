import { readInputFile } from './input_read/InputRead';
import { writeOutputFile } from './output/OutputWriter'
import { PrintWarehouse, PrintFullWarehouse, PrintStats, PrintTest, IsCommandArgument } from './utils/PrintUtils';
import { createAlleyChart } from './utils/ChartUtils';

console.log("Starting the program...");

async function main() {
    await readInputFile('data/instance_0116_131933_Z1.txt').then(
        () => {
            console.log("Input file read successfully.");
            // Further processing can be done here

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

        }
    ).catch(
        err => {
            console.error("Error reading input file:", err);
        }
    );

    await writeOutputFile('output/instance_0116_131933_Z1_sol.txt');
}

main();



