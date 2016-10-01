import {Sound,SoundPack} from "./Sound";
import {DurationPack} from "./Duration";

export class Note {
    display: string;
    duration: number;
    step: number;
    type: string;

    constructor(sound:Sound, isHyphen:boolean = false){
        this.display = (Note.convertStepToNumber(sound.step)).toString();
        this.type = (Note.convertDurationToType(sound.duration)).toString();

        this.duration = sound.duration;
        this.step = sound.step;
        if (isHyphen){
            this.display = "-";
        }

        if (this.duration == DurationPack[this.type] * 1.5){
            this.display += ".";
        }
    }
    private static convertStepToNumber(step:number):number {
        switch(step){
            case SoundPack.C1:
                return 1;
            case SoundPack.D1:
                return 2;
            default:
                throw `convertStepToNumber: unknow step ${step}`;
        }
    }
    private static convertDurationToType(duration:number):string{
        let durationList = ["full","half", "quarter", "eighth"];

        for(let durationName of durationList) {
            if (duration >= DurationPack[durationName]) {
                return durationName;
            }
        }

        throw `Note::convertDurationToType : to small durations to cast ${duration}`;
    }
}
