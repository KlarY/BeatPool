import * as _ from "lodash";

import {Sound} from "./Sound";
import {Note} from "./Note";

export class Measure{
    startTime:number;
    beatDuration: number;
    beatTimes: number;
    notes: Note[] = [];

    constructor(startTime:number, beatDuration:number, beatTimes:number ){
        this.startTime = startTime;
        this.beatDuration = beatDuration;
        this.beatTimes = beatTimes;
    }

    update(soundList: Sound[]) {
        _.map(soundList, sound=>{
            this.notes.push(new Note(sound));
        })
    }
}