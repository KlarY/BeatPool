import {Sound} from "./Sound";
import {Duration} from "./Duration";
export class SoundTrack{
    startTime: number;
    endTime: number;

    private head: Sound;
    private tail: Sound;
    constructor(startTime:number, endTime:number){
        this.startTime = startTime;
        this.endTime = endTime;

        this.head = new Sound(Sound.convertStep("00"), Duration.quarter);
        this.tail = new Sound(Sound.convertStep("00"), Duration.quarter);

        let empty = new Sound(Sound.convertStep("00"), endTime - startTime);

        this.head.next = empty;
        empty.next = this.tail;
        empty.prev = this.head;
        this.tail.prev = empty;
    }

    sounds():Sound[]{
        let sounds = [];
        let iter = this.head.next;
        while (iter != this.tail){
            sounds.push(iter);
            iter = iter.next;
        }
        return sounds;
    }

    insert(startTime: number, sound: Sound):void{

        if (startTime == 0){
            this.head.next.duration -= sound.duration;

            sound.next = this.head.next;
            this.head.next.prev = sound;
            this.head.next = sound;
        }
    }
}