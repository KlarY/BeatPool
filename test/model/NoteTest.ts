import {expect} from "chai";

import {Note} from "../../src/model/Note";
import {Sound, SoundPack} from "../../src/model/Sound";
import {DurationPack} from "../../src/model/Duration";
let {C1, D1} = SoundPack;
let {quarter, half} = DurationPack;

describe("Note Test", ()=>{
    it("should initial Note with sound", ()=>{
        let sound = new Sound(C1, quarter);
        let note = new Note(sound);

        expect(note.num).is.equal("1");

        note = new Note(new Sound(D1, half));
        expect(note.num).is.equal("2");
    })
});