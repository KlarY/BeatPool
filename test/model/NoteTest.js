"use strict";
var chai_1 = require("chai");
var Note_1 = require("../../src/model/Note");
var Sound_1 = require("../../src/model/Sound");
var Duration_1 = require("../../src/model/Duration");
var C1 = Sound_1.SoundPack.C1, D1 = Sound_1.SoundPack.D1;
var eighth = Duration_1.DurationPack.eighth, quarter = Duration_1.DurationPack.quarter, half = Duration_1.DurationPack.half;
describe("Note Test", function () {
    it("should initial Note with sound", function () {
        var sound = new Sound_1.Sound(C1, quarter);
        var note = new Note_1.Note(sound);
        chai_1.expect(note.display).is.equal("1");
        note = new Note_1.Note(new Sound_1.Sound(D1, half));
        chai_1.expect(note.display).is.equal("2");
    });
    it("should have the right note Type", function () {
        var note = new Note_1.Note(new Sound_1.Sound(C1, quarter));
        chai_1.expect(note.type).is.equal("quarter");
        note = new Note_1.Note(new Sound_1.Sound(D1, half + quarter));
        chai_1.expect(note.type).is.equal("half");
    });
    it("should have one dot for one and half duration", function () {
        var note = new Note_1.Note(new Sound_1.Sound(C1, quarter + eighth));
        chai_1.expect(note.display).is.equal("1.");
        note = new Note_1.Note(new Sound_1.Sound(D1, eighth * 1.5));
        chai_1.expect(note.display).is.equal("2.");
    });
});
