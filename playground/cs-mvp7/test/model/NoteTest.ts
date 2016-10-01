import {expect} from "chai";

import {Note} from "../../src/model/Note";
import {Sound, SoundPack} from "../../src/model/Sound";
import {DurationPack} from "../../src/model/Duration";
let {C1, D1} = SoundPack;
let {eighth, quarter, half} = DurationPack;

describe("Note Test", ()=>{
    it("should initial Note with sound", ()=>{
        let sound = new Sound(C1, quarter);
        let note = new Note(sound);

        expect(note.display).is.equal("1");

        note = new Note(new Sound(D1, half));
        expect(note.display).is.equal("2");
    });
    it("should have the right note Type", ()=>{
        let note = new Note(new Sound(C1, quarter));
        expect(note.type).is.equal("quarter");

        note = new Note(new Sound(D1, half + quarter));
        expect(note.type).is.equal("half");
    });
    it("should have one dot for one and half duration", ()=>{
        let note = new Note(new Sound(C1, quarter + eighth));
        expect(note.display).is.equal("1.");

        note = new Note(new Sound(D1, eighth * 1.5));
        expect(note.display).is.equal("2.");
    });
});