"use strict";
var chai_1 = require("chai");
var _ = require("lodash");
var Measure_1 = require("../../src/model/Measure");
var Duration_1 = require("../../src/model/Duration");
var Sound_1 = require("../../src/model/Sound");
var SoundTrack_1 = require("../../src/model/SoundTrack");
var x32nd = Duration_1.DurationPack.x32nd, eighth = Duration_1.DurationPack.eighth, quarter = Duration_1.DurationPack.quarter, half = Duration_1.DurationPack.half, full = Duration_1.DurationPack.full;
var C1 = Sound_1.SoundPack.C1, D1 = Sound_1.SoundPack.D1;
describe("Logical Measure Tests", function () {
    it("should initial Measure, notes length equals sound length", function () {
        var soundList = [
            [0, new Sound_1.Sound(C1, quarter)],
            [quarter, new Sound_1.Sound(D1, quarter)],
            [half, new Sound_1.Sound(C1, quarter)],
            [half + quarter, new Sound_1.Sound(D1, quarter)]];
        var soundTrack = new SoundTrack_1.SoundTrack(0, full);
        soundTrack.batchInsert(soundList);
        var measure = new Measure_1.Measure(0, quarter, 4, soundTrack);
        measure.update();
        chai_1.expect(measure.notes.length).is.equal(4);
    });
    describe("test hyphen for duration larger than quarter", function () {
        var soundList;
        var soundTrack;
        beforeEach("init SoundTrack", function () {
            soundList = [
                [0, new Sound_1.Sound(C1, half)],
                [half, new Sound_1.Sound(D1, full)],
                [half + full, new Sound_1.Sound(C1, half)]
            ];
            soundTrack = new SoundTrack_1.SoundTrack(0, 2 * full);
            soundTrack.batchInsert(soundList);
        });
        it("should generate Note \"-\" for half duration", function () {
            var measure = new Measure_1.Measure(0, quarter, 2, soundTrack);
            measure.update();
            chai_1.expect(measure.notes.length).is.equal(2);
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['1', '-']);
        });
        it("should generate three \"-\" for full duration", function () {
            var measure = new Measure_1.Measure(half, quarter, 4, soundTrack);
            measure.update();
            chai_1.expect(measure.notes.length).is.equal(4);
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['2', '-', '-', '-']);
        });
        it("should not have hyphen on the beginning of measure", function () {
            var measure = new Measure_1.Measure(full, quarter, 4, soundTrack);
            measure.update();
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['2', '-', '1', '-']);
        });
    });
    describe("test dot inside measure", function () {
        it("should have a dot on quarter", function () {
            var SoundList = [
                [0, new Sound_1.Sound(C1, quarter * 1.5)],
                [quarter * 1.5, new Sound_1.Sound(D1, eighth)]
            ];
            var soundTrack = new SoundTrack_1.SoundTrack(0, half);
            soundTrack.batchInsert(SoundList);
            var measure = new Measure_1.Measure(0, quarter, 2, soundTrack);
            measure.update();
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['1.', '2']);
        });
        it("should have a dot on eighth", function () {
            var SoundList = [
                [0, new Sound_1.Sound(C1, eighth + x32nd)],
                [eighth + x32nd, new Sound_1.Sound(D1, x32nd)],
                [quarter, new Sound_1.Sound(C1, x32nd)],
                [quarter + x32nd, new Sound_1.Sound(D1, eighth + x32nd)]
            ];
            var soundTrack = new SoundTrack_1.SoundTrack(0, half);
            soundTrack.batchInsert(SoundList);
            var measure = new Measure_1.Measure(0, quarter, 2, soundTrack);
            measure.update();
            chai_1.expect(_.map(measure.notes, 'display')).is.eql(['1.', '2', '1', '2.']);
        });
    });
});
