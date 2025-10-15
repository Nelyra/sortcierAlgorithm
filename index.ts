import { readInputFile } from './input_read/InputRead';
import { PrintWarehouse, PrintFullWarehouse, PrintStats, IsCommandArgument } from './utils/PrintUtils';

console.log("Starting the program...");



readInputFile('data/instance_0116_131933_Z1.txt').then(
    () => {
        console.log("Input file read successfully.");
        // Further processing can be done here

        if(IsCommandArgument("--full-debug"))
            PrintFullWarehouse();
        
        if(IsCommandArgument("--debug"))
            PrintWarehouse();

        if(IsCommandArgument("--stat"))
            PrintStats();

    }
).catch(
    err => {
        console.error("Error reading input file:", err);
    }
);

