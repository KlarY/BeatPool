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
});
