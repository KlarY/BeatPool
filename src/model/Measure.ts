import * as _ from "lodash";

import {Sound} from "./Sound";
import {Note} from "./Note";
import {SoundTrack} from "./SoundTrack";
import {DurationPack} from "./Duration";
import {BaseNotation} from "./BaseNotation";
let {quarter, half} = DurationPack;

export class Measure extends BaseNotation{
    endTime:number;
    beatDuration: number;
    beatTimes: number;
    notes: Note[] = [];
    soundTrack: SoundTrack;

    constructor(startTime:number, beatDuration:number, beatTimes:number, soundTrack:SoundTrack = null ){
        super(beatDuration * beatTimes, startTime);
        this.endTime = startTime + beatDuration * beatTimes;
        this.beatDuration = beatDuration;
        this.beatTimes = beatTimes;
        this.soundTrack = soundTrack;
    }

    private getBeatsBeTogether():boolean[]{
        let measureSounds:Sound[] = this.soundTrack.period(this.startTime, this.endTime);
        let beatBeginTimes:[number,number][] = [[0, _.first(measureSounds).duration]];
        for(let idx=1; idx < measureSounds.length; idx +=1 ){
            beatBeginTimes.push([beatBeginTimes[idx-1][0] + beatBeginTimes[idx-1][1], measureSounds[idx].duration]);
        }

        let togetherBuffer:boolean[] = Array(this.beatTimes);
        for (let idx of _.range(this.beatTimes)){
            togetherBuffer[idx] = false;
        }

        _.map(beatBeginTimes, ([_start, _dur])=>{
            if (_dur > quarter && _dur < half){
                let leftBeat = ~~(_start/this.beatDuration);
                let rightBeat = ~~((_start+_dur)/this.beatDuration);
                for(let i =leftBeat; i<=rightBeat; i+=1){
                    togetherBuffer[i] = true;
                }
            }
        });
        return togetherBuffer;
    }

    update() {
        let togetherBuffer = this.getBeatsBeTogether();
        this.notes = [];

        for (let beats = 0; beats < this.beatTimes; beats += 1){
            let beatStart = this.startTime + beats*this.beatDuration;

            if(togetherBuffer[beats]){
                while(togetherBuffer[beats]){
                    beats += 1;
                }
                beats -= 1;
            }

            let beatEnd = this.startTime + (beats+1)*this.beatDuration;

            let sounds = this.soundTrack.period(beatStart, beatEnd);

            let isHyphen:boolean = false;
            if ( beats != 0 && sounds.length == 1
                && _.last(this.notes).step == _.first(sounds).step
                && _.last(this.notes).duration == this.beatDuration
                && sounds[0].follow == true
            ){
                isHyphen = true;
            }

            _.reduce(sounds, (timeOffset, sound)=>{
                this.notes.push(new Note(sound, timeOffset + beatStart, isHyphen));
                return timeOffset + sound.duration;
            }, 0);
        }
    }
}