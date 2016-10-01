import * as _ from "lodash";

import {Sound} from "./Sound";
import {Note} from "./Note";
import {SoundTrack} from "./SoundTrack";

export class Measure{
    startTime:number;
    beatDuration: number;
    beatTimes: number;
    notes: Note[] = [];
    soundTrack: SoundTrack;

    constructor(startTime:number, beatDuration:number, beatTimes:number, soundTrack:SoundTrack = null ){
        this.startTime = startTime;
        this.beatDuration = beatDuration;
        this.beatTimes = beatTimes;
        this.soundTrack = soundTrack;
    }

    update() {
        for (let beats = 0; beats < this.beatTimes; beats += 1){
            let beatStart = this.startTime + beats*this.beatDuration;
            let beatEnd = beatStart + this.beatDuration;

            let sounds = this.soundTrack.period(beatStart, beatEnd);

            let isHyphen:boolean = false;
            if ( beats != 0 && sounds.length == 1
                && _.last(this.notes).step == _.first(sounds).step
                && _.last(this.notes).duration == this.beatDuration){

                isHyphen = true;
            }

            _.map(sounds, sound=>{
                this.notes.push(new Note(sound, isHyphen));
            });
        }
    }
}