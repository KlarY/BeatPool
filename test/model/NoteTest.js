"use strict";
const chai_1 = require("chai");
const Note_1 = require("../../src/model/Note");
const Sound_1 = require("../../src/model/Sound");
const Duration_1 = require("../../src/model/Duration");
let { C1, D1 } = Sound_1.SoundPack;
let { eighth, quarter, half } = Duration_1.DurationPack;
describe("Note Test", () => {
    it("should initial Note with sound", () => {
        let sound = new Sound_1.Sound(C1, quarter);
        let note = new Note_1.Note(sound);
        chai_1.expect(note.display).is.equal("1");
        note = new Note_1.Note(new Sound_1.Sound(D1, half));
        chai_1.expect(note.display).is.equal("2");
    });
    it("should have the right note Type", () => {
        let note = new Note_1.Note(new Sound_1.Sound(C1, quarter));
        chai_1.expect(note.type).is.equal("quarter");
        note = new Note_1.Note(new Sound_1.Sound(D1, half + quarter));
        chai_1.expect(note.type).is.equal("half");
    });
    it("should have one dot for one and half duration", () => {
        let note = new Note_1.Note(new Sound_1.Sound(C1, quarter + eighth));
        chai_1.expect(note.display).is.equal("1.");
        note = new Note_1.Note(new Sound_1.Sound(D1, eighth * 1.5));
        chai_1.expect(note.display).is.equal("2.");
    });
});
