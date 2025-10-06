



export function readHeader(line: string): string {
    switch (line.trim()) {
        case "//NbLocations":
            return "nblocations";
        default:
            return "Unknown header.";
    }
}