import {Sound} from "./Sound";
import {Duration} from "./Duration";
import * as _ from "lodash";
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
        let endTime = startTime + sound.duration;
        let startBlock = this.head.next;
        let endBlock:Sound;
        let offsetTime: number = 0;
        let duringTime: number;

        while (startBlock.duration + offsetTime <= startTime){
            offsetTime += startBlock.duration;
            startBlock = startBlock.next;
        }

        endBlock = startBlock;
        duringTime = offsetTime;


        while(endBlock.duration + duringTime < endTime){
            duringTime += endBlock.duration;
            endBlock = endBlock.next;
        }

        let prev = startBlock.prev;

        if ( offsetTime == startTime ){
            Sound.link(prev,sound);
        }else {
            let mid = new Sound(startBlock.step, startTime - offsetTime);

            Sound.link(prev, mid);
            Sound.link(mid, sound);
        }

        let next = endBlock.next;

        if ( endBlock.duration + duringTime == endTime ){
            Sound.link(sound, next);
        }else {
            let mid = new Sound(endBlock.step,  endBlock.duration + duringTime - endTime);

            Sound.link(sound, mid);
            Sound.link(mid, next);
        }
    }
}