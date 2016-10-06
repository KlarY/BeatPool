"use strict";
const chai_1 = require("chai");
const _ = require("lodash");
const Duration_1 = require("../../src/model/Duration");
const { full, half, eighth, quarter } = Duration_1.DurationPack;
const SoundTrack_1 = require("../../src/model/SoundTrack");
const Sound_1 = require("../../src/model/Sound");
const { STOP, A0, Bb0, B0, C1, D1, E1 } = Sound_1.SoundPack;
describe("Sound Track Tests", () => {
    it("should have and empty Sound Track", () => {
        let soundTrack = new SoundTrack_1.SoundTrack(0, Duration_1.Duration.quarter * 8);
        chai_1.expect(soundTrack.endTime).is.equal(Duration_1.Duration.quarter * 8);
        chai_1.expect(soundTrack.sounds().length).is.equal(1);
        chai_1.expect(soundTrack.sounds()[0].step).is.equal(STOP);
    });
    describe("the two way link sequense of sound inside sound track", () => {
        let soundTrack;
        beforeEach("init", () => {
            soundTrack = new SoundTrack_1.SoundTrack(0, Duration_1.Duration.quarter * 4);
        });
        it("should split to two parts after insert on note in front", () => {
            soundTrack.insert(0, new Sound_1.Sound(A0, Duration_1.Duration.quarter));
            chai_1.expect(soundTrack.sounds().length).is.equal(2);
            let [sound1, sound2] = soundTrack.sounds();
            chai_1.expect(sound1.step).is.eql(A0);
            chai_1.expect(sound2.step).is.eql(STOP);
            chai_1.expect(sound1.duration).is.equal(Duration_1.Duration.quarter);
            chai_1.expect(sound2.duration).is.equal(Duration_1.Duration.quarter * 3);
            chai_1.expect(sound1.next).is.equal(sound2);
            chai_1.expect(sound2.prev).is.equal(sound1);
        });
        it("should split to three parts after insert in the middle", () => {
            soundTrack.insert(Duration_1.Duration.quarter, new Sound_1.Sound(A0, Duration_1.Duration.quarter));
            chai_1.expect(soundTrack.sounds().length).is.equal(3);
            let [sound1, sound2, sound3] = soundTrack.sounds();
            chai_1.expect(sound1.step).is.eql(STOP);
            chai_1.expect(sound2.step).is.eql(A0);
            chai_1.expect(sound3.step).is.eql(STOP);
            chai_1.expect(sound1.duration).is.equal(Duration_1.Duration.quarter);
            chai_1.expect(sound2.duration).is.equal(Duration_1.Duration.quarter);
            chai_1.expect(sound3.duration).is.equal(Duration_1.Duration.quarter * 2);
        });
        it("should insert two sounds separate track", () => {
            soundTrack.insert(Duration_1.Duration.quarter, new Sound_1.Sound(A0, Duration_1.Duration.quarter));
            soundTrack.insert(Duration_1.Duration.quarter * 3, new Sound_1.Sound(A0, Duration_1.Duration.quarter));
            chai_1.expect(soundTrack.sounds().length).is.equal(4);
            let sounds = soundTrack.sounds();
            chai_1.expect(_.map(sounds, sound => sound.duration)).is.eql([Duration_1.Duration.quarter, Duration_1.Duration.quarter, Duration_1.Duration.quarter, Duration_1.Duration.quarter]);
            chai_1.expect(_.map(sounds, sound => sound.step)).is.eql([STOP, A0, STOP, A0]);
        });
        it("should overwrite privious Notes", () => {
            soundTrack.insert(Duration_1.Duration.eighth, new Sound_1.Sound(A0, Duration_1.Duration.quarter));
            soundTrack.insert(Duration_1.Duration.eighth + Duration_1.Duration.quarter, new Sound_1.Sound(Bb0, Duration_1.Duration.quarter));
            soundTrack.insert(Duration_1.Duration.eighth + Duration_1.Duration.quarter * 2, new Sound_1.Sound(B0, Duration_1.Duration.quarter));
            soundTrack.insert(Duration_1.Duration.quarter, new Sound_1.Sound(C1, Duration_1.Duration.quarter * 2));
            let sounds = soundTrack.sounds();
            chai_1.expect(_.map(sounds, sound => sound.step)).is.eql([STOP, A0, C1, B0, STOP]);
        });
        it("should not merge to one Note", () => {
            soundTrack.insert(0, new Sound_1.Sound(C1, quarter));
            soundTrack.insert(half, new Sound_1.Sound(C1, quarter));
            soundTrack.insert(quarter, new Sound_1.Sound(C1, quarter));
            let sounds = soundTrack.sounds();
            chai_1.expect(_.map(sounds, sound => sound.step)).is.eql([C1, C1, C1, STOP]);
        });
        it("should insert Notes in batch", () => {
            soundTrack.batchInsert([[0, new Sound_1.Sound(A0, quarter)],
                [quarter, new Sound_1.Sound(Bb0, quarter)],
                [quarter * 2, new Sound_1.Sound(B0, quarter)],
                [quarter * 3, new Sound_1.Sound(C1, quarter)]]);
            let sounds = soundTrack.sounds();
            chai_1.expect(_.map(sounds, sound => sound.step)).is.eql([A0, Bb0, B0, C1]);
        });
    });
    describe("should get range of sound", () => {
        let soundTrack = new SoundTrack_1.SoundTrack(0, full * 2);
        beforeEach("init", () => {
            soundTrack.clear();
            soundTrack.batchInsert([
                [0, new Sound_1.Sound(A0, half)],
                [half, new Sound_1.Sound(B0, quarter)],
                [half + quarter, new Sound_1.Sound(C1, quarter)],
                [full, new Sound_1.Sound(D1, quarter)],
                [full + quarter, new Sound_1.Sound(E1, quarter)],
                [full + half, new Sound_1.Sound(STOP, half)]
            ]);
        });
        it("should get first 1 beat in middle of sound", () => {
            let sounds = soundTrack.period(eighth, quarter);
            chai_1.expect(_.map(sounds, sound => sound.duration)).is.eql([eighth]);
            chai_1.expect(_.map(sounds, sound => sound.step)).is.eql([A0]);
        });
        it("should get three beats at beginning", () => {
            let sounds = soundTrack.period(0, full);
            chai_1.expect(_.map(sounds, sound => sound.duration)).is.eql([half, quarter, quarter]);
            chai_1.expect(_.map(sounds, sound => sound.step)).is.eql([A0, B0, C1]);
        });
        it("should get cutted begin and nend ranged sounds", () => {
            let sounds = soundTrack.period(quarter + eighth, full + quarter + eighth);
            chai_1.expect(_.map(sounds, sound => sound.duration)).is.eql([eighth, quarter, quarter, quarter, eighth]);
            chai_1.expect(_.map(sounds, sound => sound.step)).is.eql([A0, B0, C1, D1, E1]);
        });
        it("cut sound at end should have an continue sign", () => {
            let sounds = soundTrack.period(quarter + eighth, half + eighth);
            chai_1.expect(sounds[1].continue).is.equal(true);
            sounds = soundTrack.period(0, half);
            chai_1.expect(sounds[0].continue).is.equal(false);
        });
        it("cut sound at begin should have an follow", () => {
            let sounds = soundTrack.period(quarter, full);
            chai_1.expect(_.map(sounds, "duration")).is.eql([quarter, quarter, quarter]);
            chai_1.expect(_.map(sounds, "follow")).is.eql([true, false, false]);
            chai_1.expect(_.map(sounds, "continue")).is.eql([false, false, false]);
        });
    });
});
