import {expect} from "chai";

import {Measure} from "../../src/model/Measure";
import {DurationPack} from "../../src/model/Duration";
import {Sound, SoundPack} from "../../src/model/Sound";
let {quarter,half} = DurationPack;
let {C1, D1} = SoundPack;

describe("Logical Measure Tests", ()=>{
    it("should initial Measure, notes length equals sound length", ()=>{
        let measure = new Measure(0, quarter, 4);
        let soundList = [new Sound(C1,quarter),new Sound(D1, quarter),new Sound(C1, half, true)];

        measure.update(soundList);

        expect(measure.notes.length).is.equal(3);
    });
});