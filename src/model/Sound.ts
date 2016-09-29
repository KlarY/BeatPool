export class Sound{
    step: number;
    duration: number;
    next: Sound;
    prev: Sound;
    continue: boolean;

    constructor (step:number, duration:number, _continue: boolean = false){
        this.step = step;
        this.duration = duration;

        this.next = null;
        this.prev = null;
        this.continue = _continue;
    }
    static link(sound1: Sound, sound2: Sound){
        if(sound1 === sound2){
            throw "could not link as self loop!";
        }
        sound1.next = sound2;
        sound2.prev = sound1;
    }
}

export let SoundPack = {
    STOP: 0,
    A0: 1,
    Bb0: 2,
    B0: 3,
    C1: 4,
    D1: 5,
    E1: 6
};