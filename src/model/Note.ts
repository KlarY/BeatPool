import {Sound,SoundPack} from "./Sound";
import {DurationPack} from "./Duration";
import {BaseNotation} from "./BaseNotation";

export class Note extends BaseNotation{
    display: string;
    step: number;
    type: string;

    constructor(sound:Sound, startTime:number = 0, isHyphen:boolean = false){
        super(sound.duration, startTime);
        this.display = (Note.convertStepToNumber(sound.step)).toString();
        this.type = (Note.convertDurationToType(sound.duration)).toString();

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
            case SoundPack.STOP:
                return 0;
            case SoundPack.C1:
                return 1;
            case SoundPack.D1:
                return 2;
            case SoundPack.E1:
                return 3;
            case SoundPack.F1:
                return 4;
            case SoundPack.C4:
                return 1;
            case SoundPack.D4:
                return 2;
            case SoundPack.E4:
                return 3;
            case SoundPack.F4:
                return 4;
            case SoundPack.G4:
                return 5;
            case SoundPack.A4:
                return 6;
            case SoundPack.B4:
                return 7;
            default:
                throw `Note::convertStepToNumber: unknow step ${step}`;
        }
    }
    private static convertDurationToType(duration:number):string{
        let durationList = ["full","half", "quarter", "eighth", "x32nd"];

        for(let durationName of durationList) {
            if (duration >= DurationPack[durationName]) {
                return durationName;
            }
        }

        throw `Note::convertDurationToType : to small durations to cast ${duration}`;
    }
}
