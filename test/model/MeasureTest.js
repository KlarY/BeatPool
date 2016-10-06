"use strict";
const chai_1 = require("chai");
const _ = require("lodash");
const Measure_1 = require("../../src/model/Measure");
const Duration_1 = require("../../src/model/Duration");
const Sound_1 = require("../../src/model/Sound");
const SoundTrack_1 = require("../../src/model/SoundTrack");
let { x32nd, eighth, quarter, half, full } = Duration_1.DurationPack;
let { C1, D1 } = Sound_1.SoundPack;
describe("Logical Measure Tests", () => {
    it("should initial Measure, notes length equals sound length", () => {
        let soundList = [
            [0, new Sound_1.Sound(C1, quarter)],
            [quarter, new Sound_1.Sound(D1, quarter)],
            [half, new Sound_1.Sound(C1, quarter)],
            [half + quarter, new Sound_1.Sound(D1, quarter)]];
        let soundTrack = new SoundTrack_1.SoundTrack(0, full);
        soundTrack.batchInsert(soundList);
        let measure = new Measure_1.Measure(0, quarter, 4, soundTrack);
        measure.update();
        chai_1.expect(measure.notes.length).is.equal(4);
    });
    describe("test hyphen for duration larger than quarter", () => {
        let soundList;
        let soundTrack;
        beforeEach("init SoundTrack", () => {
            soundList = [
                [0, new Sound_1.Sound(C1, half)],
                [half, new Sound_1.Sound(D1, full)],
                [half + full, new Sound_1.Sound(C1, half)],
                [full * 2, new Sound_1.Sound(C1, quarter)],
                [full * 2 + quarter, new Sound_1.Sound(C1, quarter)]
            ];
            soundTrack = new SoundTrack_1.SoundTrack(0, 3 * full);
            soundTrack.batchInsert(soundList);
        });
        it("should generate Note \"-\" for half duration", () => {
            let measure = new Measure_1.Measure(0, quarter, 2, soundTrack);
            measure.update();
            chai_1.expect(measure.notes.length).is.equal(2);
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['1', '-']);
        });
        it("should generate three \"-\" for full duration", () => {
            let measure = new Measure_1.Measure(half, quarter, 4, soundTrack);
            measure.update();
            chai_1.expect(measure.notes.length).is.equal(4);
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['2', '-', '-', '-']);
        });
        it("should not have hyphen on the beginning of measure", () => {
            let measure = new Measure_1.Measure(full, quarter, 4, soundTrack);
            measure.update();
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['2', '-', '1', '-']);
        });
        it("should not merge to one note", () => {
            let measure = new Measure_1.Measure(full + half, quarter, 4, soundTrack);
            measure.update();
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['1', '-', '1', '1']);
        });
    });
    describe("test dot inside measure", () => {
        it("should have a dot on quarter", () => {
            let SoundList = [
                [0, new Sound_1.Sound(C1, quarter * 1.5)],
                [quarter * 1.5, new Sound_1.Sound(D1, eighth)]
            ];
            let soundTrack = new SoundTrack_1.SoundTrack(0, half);
            soundTrack.batchInsert(SoundList);
            let measure = new Measure_1.Measure(0, quarter, 2, soundTrack);
            measure.update();
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['1.', '2']);
        });
        it("should have a dot on eighth", () => {
            let SoundList = [
                [0, new Sound_1.Sound(C1, eighth + x32nd)],
                [eighth + x32nd, new Sound_1.Sound(D1, x32nd)],
                [quarter, new Sound_1.Sound(C1, x32nd)],
                [quarter + x32nd, new Sound_1.Sound(D1, eighth + x32nd)]
            ];
            let soundTrack = new SoundTrack_1.SoundTrack(0, half);
            soundTrack.batchInsert(SoundList);
            let measure = new Measure_1.Measure(0, quarter, 2, soundTrack);
            measure.update();
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['1.', '2', '1', '2.']);
        });
    });
});
