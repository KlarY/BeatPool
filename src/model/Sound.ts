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
            case "Bb0":
                return 2;
            case "B0":
                return 3;
            case "C1":
                return 4;
            case "Db1":
                return 5;
            case "D1":
                return 6;
            case "Eb1":
                return 7;
            case "E1":
                return 8;
            default:
                throw `unknown sound Name: ${soundName}`;
        }
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
    STOP: Sound.convertStep("00"),
    A0: Sound.convertStep("A0"),
    Bb0: Sound.convertStep("Bb0"),
    B0: Sound.convertStep("B0"),
    C1: Sound.convertStep("C1"),
    D1: Sound.convertStep("D1"),
    E1: Sound.convertStep("E1")
};