"use strict";
var chai_1 = require("chai");
var _ = require("lodash");
var SoundTrack_1 = require("../../src/model/SoundTrack");
var Duration_1 = require("../../src/model/Duration");
var Sound_1 = require("../../src/model/Sound");
var Part_1 = require("../../src/model/Part");
var eighth = Duration_1.DurationPack.eighth, quarter = Duration_1.DurationPack.quarter, half = Duration_1.DurationPack.half, full = Duration_1.DurationPack.full;
var STOP = Sound_1.SoundPack.STOP, C1 = Sound_1.SoundPack.C1, D1 = Sound_1.SoundPack.D1, E1 = Sound_1.SoundPack.E1, F1 = Sound_1.SoundPack.F1, G1 = Sound_1.SoundPack.G1;
describe("Part Test", function () {
    it("should create an part and initialed with 2 measures", function () {
        var soundTrack = new SoundTrack_1.SoundTrack(0, full * 2);
        var part = new Part_1.Part(0, full * 2, soundTrack);
        part.init(quarter, 4);
        chai_1.expect(part.measures.length).is.equal(2);
        chai_1.expect(_.flatten(_.map(part.measures, function (measure) { return _.map(measure.notes, 'display'); }))).is
            .eql(["0", "-", "-", "-", "0", "-", "-", "-"]);
    });
    it("should update sounds in measures", function () {
        var soundTrack = new SoundTrack_1.SoundTrack(0, full * 2);
        var part = new Part_1.Part(0, full * 2, soundTrack);
        part.init(quarter, 4);
        var soundList = [
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
        chai_1.expect(_.flatten(_.map(part.measures, function (measure) { return _.map(measure.notes, 'display'); }))).is
            .eql(["0", "1", "2.", "3", "3.", "0", "1", "1", "0"]);
    });
});
