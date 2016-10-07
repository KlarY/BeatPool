export class Sound{
    step: number;
    duration: number;
    next: Sound;
    prev: Sound;
    continue: boolean;
    follow: boolean;

    constructor (step:number, duration:number, follow: boolean = false, _continue: boolean = false,){
        this.step = step;
        this.duration = duration;

        this.next = null;
        this.prev = null;
        this.follow = follow;
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
    STOP:   0,
    A0:     1,
    Bb0:    2,
    B0:     3,
    C1:     4,
    Db1:    5,
    D1:     6,
    Eb1:    7,
    E1:     8,
    F1:     9,
    Gb1:    10,
    G1:     11,
    Ab1:    12,
    A1:     13,
    Bb1:    14,
    B1:     15,

    C4:     101,
    D4:     103,
    E4:     105,
    F4:     106,
    G4:     108,
    A4:     110,
    B4:     112
};
