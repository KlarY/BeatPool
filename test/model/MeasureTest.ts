import {expect} from "chai";
import * as _ from "lodash";

import {Measure} from "../../src/model/Measure";
import {DurationPack} from "../../src/model/Duration";
import {Sound, SoundPack} from "../../src/model/Sound";
import {SoundTrack} from "../../src/model/SoundTrack";
let {x32nd, eighth, quarter,half, full} = DurationPack;
let {C1, D1} = SoundPack;

describe("Logical Measure Tests", ()=>{
    it("should initial Measure, notes length equals sound length", ()=>{
        let soundList:[number, Sound][] = [
            [0, new Sound(C1,quarter)],
            [quarter, new Sound(D1, quarter)],
            [half, new Sound(C1, quarter)],
            [half+quarter, new Sound(D1,quarter)]];

        let soundTrack = new SoundTrack(0, full);
        soundTrack.batchInsert(soundList);
        let measure = new Measure(0, quarter, 4, soundTrack);

        measure.update();

        expect(measure.notes.length).is.equal(4);
    });

    describe("test hyphen for duration larger than quarter", ()=>{
        let soundList:[number, Sound][];
        let soundTrack: SoundTrack;
        beforeEach("init SoundTrack", ()=>{
            soundList= [
                [0, new Sound(C1, half)],
                [half, new Sound(D1, full)],
                [half+full, new Sound(C1, half)]
            ];
            soundTrack = new SoundTrack(0, 2*full);
            soundTrack.batchInsert(soundList);
        });

        it("should generate Note \"-\" for half duration", ()=>{
            let measure = new Measure(0, quarter, 2, soundTrack);
            measure.update();

            expect(measure.notes.length).is.equal(2);
            expect(_.map(measure.notes, 'display')).is.eql(['1', '-']);
        });

        it("should generate three \"-\" for full duration", ()=>{
            let measure = new Measure(half, quarter, 4, soundTrack);
            measure.update();

            expect(measure.notes.length).is.equal(4);
            expect(_.map(measure.notes, 'display')).is.eql(['2', '-', '-', '-']);
        });

        it("should not have hyphen on the beginning of measure", ()=>{
            let measure = new Measure(full, quarter, 4, soundTrack);
            measure.update();

            expect(_.map(measure.notes, 'display')).is.eql(['2', '-', '1', '-']);
        })
    });

    describe("test dot inside measure", ()=>{
        it("should have a dot on quarter", ()=>{
            let SoundList:[number, Sound][] = [
                [0, new Sound(C1, quarter * 1.5)],
                [quarter*1.5, new Sound(D1, eighth)]
            ];
            let soundTrack = new SoundTrack(0, half);
            soundTrack.batchInsert(SoundList);

            let measure = new Measure(0, quarter, 2, soundTrack);
            measure.update();

            expect(_.map(measure.notes, 'display')).is.eql(['1.', '2']);
        });

        it("should have a dot on eighth", ()=>{
            let SoundList:[number, Sound][] = [
                [0, new Sound(C1, eighth + x32nd)],
                [eighth+x32nd, new Sound(D1, x32nd)],
                [quarter, new Sound(C1, x32nd)],
                [quarter+x32nd, new Sound(D1, eighth + x32nd)]
            ];
            let soundTrack = new SoundTrack(0, half);
            soundTrack.batchInsert(SoundList);

            let measure = new Measure(0, quarter, 2, soundTrack);
            measure.update();

            expect(_.map(measure.notes, 'display')).is.eql(['1.', '2', '1', '2.']);
        })
    });
});
