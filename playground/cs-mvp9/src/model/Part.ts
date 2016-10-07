import * as _ from "lodash";

import {SoundTrack} from "./SoundTrack";
import {Measure} from "./Measure";
export class Part{
    startTime: number;
    endTime: number;
    soundTrack: SoundTrack;
    measures: Measure[];

    constructor(startTime: number, endTime: number, soundTrack: SoundTrack){
        this.startTime = startTime;
        this.endTime = endTime;
        this.soundTrack = soundTrack;
        this.measures = [];
    }

    update() {
        _.map(this.measures, measure=>measure.update());
    }

    init(beatDuration: number, beatTimes: number) {
        let measureDuration = beatDuration * beatTimes;
        let measuresLength = ~~((this.endTime - this.startTime) / measureDuration);

        this.measures = _.times(measuresLength, (idx)=>
            new Measure(this.startTime + idx*measureDuration, beatDuration,beatTimes, this.soundTrack));
        this.update();
    }
}