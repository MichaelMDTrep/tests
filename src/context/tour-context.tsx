import { createContext} from 'react';


export const TourContext = createContext({
    tourMode: false,
    slideNum: 0,
    setTourMode(mode: boolean) {
        this.tourMode = mode;
    },
    setSlideNum(num: number) {
        this.slideNum = num;
    }
});