import {expect} from "chai";

import {Duration} from "../src/model/Duration";
import {SoundTrack} from "../src/model/SoundTrack";
import {Sound} from "../src/model/Sound";
describe("Sound Track Tests", ()=>{
    it("should have and empty Sound Track", ()=>{
        let soundTrack = new SoundTrack(0,Duration.quarter * 8);
        expect(soundTrack.endTime).is.equal(Duration.quarter * 8);
        expect(soundTrack.sounds().length).is.equal(1);
        expect(soundTrack.sounds()[0].step).is.equal(Sound.convertStep("00"));
    });

    describe("the two way link sequense of sound inside sound track", ()=>{
        it("should split to two parts after insert on note in front", ()=>{
            let soundTrack = new SoundTrack(0, Duration.quarter * 4);
            soundTrack.insert(0, new Sound(Sound.convertStep("A0"), Duration.quarter));

            expect(soundTrack.sounds().length).is.equal(2);

            let [sound1,sound2] = soundTrack.sounds();

            expect(sound1.step).is.eql(Sound.convertStep("A0"));
            expect(sound2.step).is.eql(Sound.convertStep("00"));

            expect(sound1.duration).is.equal(Duration.quarter);
            expect(sound2.duration).is.equal(Duration.quarter * 3);

            expect(sound1.next).is.equal(sound2);
            expect(sound2.prev).is.equal(sound1);
        })
    })
});
