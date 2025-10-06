import { readInputFile } from './input_read/InputRead';

console.log("Starting the program...");

readInputFile('data/instance_0116_131933_Z1.txt').catch(err => {
    console.error("Error reading input file:", err);
});

