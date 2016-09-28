import {expect} from "chai";
import * as _ from "lodash";

import {Duration, DurationPack} from "../src/model/Duration";
const {eighth, quarter} = DurationPack;
import {SoundTrack} from "../src/model/SoundTrack";
import {Sound, SoundPack} from "../src/model/Sound";
const {STOP, A0, Bb0, B0, C1} = SoundPack;

describe("Sound Track Tests", ()=>{
    it("should have and empty Sound Track", ()=>{
        let soundTrack = new SoundTrack(0,Duration.quarter * 8);
        expect(soundTrack.endTime).is.equal(Duration.quarter * 8);
        expect(soundTrack.sounds().length).is.equal(1);
        expect(soundTrack.sounds()[0].step).is.equal(Sound.convertStep("00"));
    });

    describe("the two way link sequense of sound inside sound track", ()=>{
        let soundTrack:SoundTrack;

        beforeEach("init", ()=>{
            soundTrack = new SoundTrack(0, Duration.quarter * 4);
        });
        it("should split to two parts after insert on note in front", ()=>{
            soundTrack.insert(0, new Sound(A0, Duration.quarter));

            expect(soundTrack.sounds().length).is.equal(2);

            let [sound1,sound2] = soundTrack.sounds();

            expect(sound1.step).is.eql(A0);
            expect(sound2.step).is.eql(STOP);

            expect(sound1.duration).is.equal(Duration.quarter);
            expect(sound2.duration).is.equal(Duration.quarter * 3);

            expect(sound1.next).is.equal(sound2);
            expect(sound2.prev).is.equal(sound1);
        });

        it("should split to three parts after insert in the middle", ()=>{
            soundTrack.insert(Duration.quarter, new Sound(A0, Duration.quarter));

            expect(soundTrack.sounds().length).is.equal(3);

            let [sound1, sound2, sound3] = soundTrack.sounds();

            expect(sound1.step).is.eql(STOP);
            expect(sound2.step).is.eql(A0);
            expect(sound3.step).is.eql(STOP);

            expect(sound1.duration).is.equal(Duration.quarter);
            expect(sound2.duration).is.equal(Duration.quarter);
            expect(sound3.duration).is.equal(Duration.quarter * 2);
        });

        it("should insert two sounds separate track", ()=>{

            soundTrack.insert(Duration.quarter, new Sound(A0, Duration.quarter));
            soundTrack.insert(Duration.quarter*3, new Sound(A0, Duration.quarter));

            expect(soundTrack.sounds().length).is.equal(4);

            let sounds = soundTrack.sounds();

            expect(_.map(sounds, sound=>sound.duration)).is.eql([Duration.quarter,Duration.quarter,Duration.quarter,Duration.quarter]);
            expect(_.map(sounds, sound=>sound.step)).is.eql([STOP, A0, STOP, A0]);
        });

        it("should overwrite privious Notes", ()=>{
            soundTrack.insert(Duration.eighth, new Sound(A0, Duration.quarter));
            soundTrack.insert(Duration.eighth + Duration.quarter, new Sound(Bb0, Duration.quarter));
            soundTrack.insert(Duration.eighth + Duration.quarter * 2, new Sound(B0, Duration.quarter));
            soundTrack.insert(Duration.quarter, new Sound(C1, Duration.quarter*2));

            let sounds = soundTrack.sounds();

            expect(_.map(sounds, sound=>sound.step)).is.eql([STOP, A0, C1, B0, STOP]);
        });

        it("should insert Notes in batch", ()=>{
            soundTrack.batchInsert([[0, new Sound(A0, quarter)],
                                [quarter, new Sound(Bb0, quarter)],
                                [quarter*2, new Sound(B0, quarter)],
                                [quarter*3, new Sound(C1, quarter)]]);

            let sounds = soundTrack.sounds();
            expect(_.map(sounds, sound=>sound.step)).is.eql([A0, Bb0, B0, C1]);
        });

    });
});
