import { readInputFile } from './input_read/InputRead';
import { writeOutputFile } from './output/OutputWriter'
import { PrintWarehouse, PrintFullWarehouse, PrintStats, PrintTest, IsCommandArgument, GetCommandArgumentValue, PrintTrolley } from './utils/PrintUtils';
import { createAlleyChart } from './utils/ChartUtils';

console.log("Starting the program...");

async function main() {
    let file = 'instance_0116_131933_Z1';

    // Check for --file argument
    if(IsCommandArgument("--file")) {
        file = GetCommandArgumentValue("--file")!;
        console.log("Using input file:", file);
    } else {
        console.log("No input file specified, using default:", file);
    }

    // Reading part
    await readInputFile('data/' + file + '.txt').then(
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
            if(IsCommandArgument("--trolley"))
                PrintTrolley();
        }
    ).catch(
        err => {
            console.error("Error reading input file:", err);
        }
    );

    // Algorithm part
    // if(IsCommandArgument("--algo")) {
    //     const algoName = GetCommandArgumentValue("--algo");
    //     console.log("Using algorithm:", algoName);

    //     switch(algoName) {
    //         case "tournee":
    //             break;
    //         case

    // }

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

main();



