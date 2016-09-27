export class Sound{
    step: number;
    duration: number;
    constructor (step:number, duration:number){
        this.step = step;
        this.duration = duration;
    }
    static convertStep(soundName: string) {
        return 0;
    }
}