import { createContext} from 'react';


export const LocationContext = createContext({
    location : [0, 0],
    setLocation(coordinates: any[]) {
        this.location = coordinates;
    }
});