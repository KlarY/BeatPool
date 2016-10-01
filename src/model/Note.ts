import {Sound,SoundPack} from "./Sound";

export class Note {
    display: string;
    duration: number;
    step: number;
    constructor(sound:Sound, isHyphen:boolean = false){
        this.display = (Note.convertStepToNumber(sound.step)).toString();
        this.duration = sound.duration;
        this.step = sound.step;
        if (isHyphen){
            this.display = "-";
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
}
