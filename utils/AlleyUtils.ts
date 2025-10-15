import warehouse from "./WarehouseUtils";

export function setupAlleys() {
    if(warehouse.alleys === undefined) {
            warehouse.alleys = [];
    }
    
    for(const location of warehouse.locations) {
        const alleyName = getAlleyFromLocation(location.id);   

        if(alleyName == "depotStart" || alleyName == "depotEnd") continue;

        let alley = warehouse.alleys.find(a => a.name === alleyName);
        if(!alley) {
            alley = {
                id: warehouse.alleys.length,
                name: alleyName,
                locationIds: []
            };
            warehouse.alleys.push(alley);
        }

        alley.locationIds.push(location.id);
    }
}

function getAlleyFromLocation(locationId: number) {
    const locationName = warehouse.locations[locationId].name;
    // Assuming name is aC_aC_name and aC_aC is the alley name
    return locationName.split('_').slice(0, 2).join('_');
}