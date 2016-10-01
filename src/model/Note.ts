import {Sound,SoundPack} from "./Sound";

export class Note {
    num: string;
    constructor(sound:Sound){
        this.num = (Note.convertStepToNumber(sound.step)).toString();
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
