import {Sound} from "./Sound";
import {Duration} from "./Duration";
export class SoundTrack{
    startTime: number;
    endTime: number;

    constructor(startTime:number, endTime:number){
        this.startTime = startTime;
        this.endTime = endTime;
    }

    sounds() {
        return [new Sound(Sound.convertStep("00"), this.endTime - this.endTime)];
    }
}