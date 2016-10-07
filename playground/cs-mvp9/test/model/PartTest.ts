import {expect} from "chai";
import * as _ from "lodash";

import {SoundTrack} from "../../src/model/SoundTrack";
import {DurationPack} from "../../src/model/Duration";
import {Sound, SoundPack} from "../../src/model/Sound";
import {Part} from "../../src/model/Part";

let {eighth, quarter, half, full} = DurationPack;
let {STOP,C1, D1, E1, F1, G1} = SoundPack;

describe("Part Test", ()=>{
    it("should create an part and initialed with 2 measures", ()=>{
        let soundTrack = new SoundTrack(0, full * 2);

        let part = new Part(0, full * 2, soundTrack);

        part.init(quarter, 4);

        expect(part.measures.length).is.equal(2);
        expect(_.flatten(_.map(part.measures, measure=>_.map(measure.notes, 'display')))).is
            .eql(["0","-","-", "-", "0", "-", "-", "-"]);
    });

    it("should update sounds in measures", ()=>{
        let soundTrack = new SoundTrack(0, full * 2);

        let part = new Part(0, full * 2, soundTrack);

        part.init(quarter, 4);

        let soundList:Sound[] = [
            new Sound(STOP, quarter),
            new Sound(C1, quarter),
            new Sound(D1, quarter + eighth),
            new Sound(E1, half),
            new Sound(STOP, eighth),
            new Sound(C1, eighth),
            new Sound(C1, eighth)
        ];

        soundTrack.insertSounds(soundList);

        part.update();

        expect(_.flatten(_.map(part.measures, measure=>_.map(measure.notes, 'display')))).is
            .eql(["0", "1", "2.", "3", "3.", "0", "1", "1", "0"]);
    })
});