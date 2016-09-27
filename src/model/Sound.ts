export class Sound{
    step: number;
    duration: number;
    next: Sound;
    prev: Sound;

    constructor (step:number, duration:number){
        this.step = step;
        this.duration = duration;

        this.next = null;
        this.prev = null;
    }
    static convertStep(soundName: string) {
        switch(soundName){
            case "00":
                return 0;
            case "A0":
                return 1;
            default:
                throw `unknown sound Name: ${soundName}`;
        }
    }
}