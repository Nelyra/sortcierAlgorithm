import { readInputFile } from './input_read/InputRead';
import { PrintWarehouse, PrintFullWarehouse, PrintTest } from './utils/PrintUtils';

console.log("Starting the program...");



readInputFile('data/instance_0116_131933_Z1.txt').then(
    () => {
        console.log("Input file read successfully.");
        // Further processing can be done here
        // PrintWarehouse();
        PrintTest();

    }
).catch(
    err => {
        console.error("Error reading input file:", err);
    }
);

