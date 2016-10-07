import * as _ from "lodash";
import {SoundTrack} from "../model/SoundTrack";
import {DurationPack} from "../model/Duration";
import {Part} from "../model/Part";
import {vm_Editor} from "../viewmodel/vm_editor";
import {vm_Measure} from "../viewmodel/vm_measure";
import {vm_LinePart} from "../viewmodel/vm_linepart";
import {Measure} from "../model/Measure";
import {vm_Base} from "../viewmodel/vm_base";
import {vm_Note} from "../viewmodel/vm_note";
import {KeyboardServices} from "./KeyboardServices";
import {SelectService} from "./selectService";
import {Sound, SoundPack} from "../model/Sound";
import {menuService} from "./MenuService";
import {vm_Page} from "../viewmodel/vm_page";

let soundTrack = new SoundTrack(0, DurationPack.full * 40);

soundTrack.batchInsert([
    [0, new Sound(SoundPack.C1, DurationPack.eighth)],
    [DurationPack.eighth, new Sound(SoundPack.D1, DurationPack.x32nd)],
    [DurationPack.full*4, new Sound(SoundPack.A4, DurationPack.quarter)]
]);

let part = new Part(0, DurationPack.full*40, soundTrack);
part.init(DurationPack.quarter, 4);

export let Score = part;

export class ScoreService{
    editor: vm_Editor;
    page: vm_Page;

    init(){
        console.log(part.measures.length);

        this.update();

        this.rigisterKeyboardEvents();
    }

    rigisterKeyboardEvents(){

        let $this = this;
        let insertSound = function(step:number){
            return ()=>{
                let selected = SelectService.getSelected();
                if ( selected instanceof vm_Note || selected instanceof vm_Measure){
                    let vm = <vm_Base>selected;
                    soundTrack.insert(vm.notation.startTime, new Sound(step, menuService.duration));
                    part.update();

                    // console.log(_.map(part.measures, measure=>_.map(measure.notes, 'type')));

                    $this.update();
                    SelectService.selectNextNote(part, vm.notation.startTime);
                }
            }
        };

        KeyboardServices.rigister('editor', 'c', insertSound(SoundPack.C4));
        KeyboardServices.rigister('editor', 'd', insertSound(SoundPack.D4));
        KeyboardServices.rigister('editor', 'e', insertSound(SoundPack.E4));
        KeyboardServices.rigister('editor', 'f', insertSound(SoundPack.F4));
        KeyboardServices.rigister('editor', 'g', insertSound(SoundPack.G4));
        KeyboardServices.rigister('editor', 'a', insertSound(SoundPack.A4));
        KeyboardServices.rigister('editor', 'b', insertSound(SoundPack.B4));
        KeyboardServices.rigister('editor', 's', insertSound(SoundPack.STOP));
    }

    update(){
        let vmMeasures = _.map(part.measures, measure=>{
            let vmMeasure = new vm_Measure();
            vmMeasure.bindNotation(measure);
            vmMeasure.baseline = 20;
            _.map(measure.notes, note=>{
                vmMeasure.insertNote(note);
            });
            return vmMeasure;
        });

        console.log(vmMeasures);

        this.editor.takeMeasures(vmMeasures);
    }
}
