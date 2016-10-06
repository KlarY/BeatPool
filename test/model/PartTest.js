"use strict";
const chai_1 = require("chai");
const _ = require("lodash");
const SoundTrack_1 = require("../../src/model/SoundTrack");
const Duration_1 = require("../../src/model/Duration");
const Sound_1 = require("../../src/model/Sound");
const Part_1 = require("../../src/model/Part");
let { eighth, quarter, half, full } = Duration_1.DurationPack;
let { STOP, C1, D1, E1, F1, G1 } = Sound_1.SoundPack;
describe("Part Test", () => {
    it("should create an part and initialed with 2 measures", () => {
        let soundTrack = new SoundTrack_1.SoundTrack(0, full * 2);
        let part = new Part_1.Part(0, full * 2, soundTrack);
        part.init(quarter, 4);
        chai_1.expect(part.measures.length).is.equal(2);
        chai_1.expect(_.flatten(_.map(part.measures, measure => _.map(measure.notes, 'display')))).is
            .eql(["0", "-", "-", "-", "0", "-", "-", "-"]);
    });
    it("should update sounds in measures", () => {
        let soundTrack = new SoundTrack_1.SoundTrack(0, full * 2);
        let part = new Part_1.Part(0, full * 2, soundTrack);
        part.init(quarter, 4);
        let soundList = [
            new Sound_1.Sound(STOP, quarter),
            new Sound_1.Sound(C1, quarter),
            new Sound_1.Sound(D1, quarter + eighth),
            new Sound_1.Sound(E1, half),
            new Sound_1.Sound(STOP, eighth),
            new Sound_1.Sound(C1, eighth),
            new Sound_1.Sound(C1, eighth)
        ];
        soundTrack.insertSounds(soundList);
        part.update();
        chai_1.expect(_.flatten(_.map(part.measures, measure => _.map(measure.notes, 'display')))).is
            .eql(["0", "1", "2.", "3", "3.", "0", "1", "1", "0"]);
    });
});
