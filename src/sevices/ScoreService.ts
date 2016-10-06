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

let soundTrack = new SoundTrack(0, DurationPack.full * 4);

let part = new Part(0, DurationPack.full*4, soundTrack);
part.init(DurationPack.quarter, 4);

export let score = part;

export class ScoreService{
    editor: vm_Editor;
    linePart: vm_LinePart;
    init(){
        console.log(part.measures.length);

        let vmLinePart = new vm_LinePart(this.editor);
        vmLinePart.height = 150;
        vmLinePart.width = 1000;
        vmLinePart.left = 50;
        vmLinePart.baseline = 500;
        this.linePart = vmLinePart;

        this.update(vmLinePart);

        this.rigisterKeyboardEvents();
    }

    rigisterKeyboardEvents(){

        let $this = this;
        let insertSound = function(step:number){
            return ()=>{
                let selected = SelectService.getSelected();
                if ( selected instanceof vm_Note){
                    let vmNote = <vm_Note>selected;
                    soundTrack.insert(vmNote.notation.startTime, new Sound(step, DurationPack.quarter));
                    part.update();
                    $this.update($this.linePart);
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
    }

    update(vmLinePart: vm_LinePart){
        _.map(vmLinePart.children, (vmMeasure)=>{vmMeasure.remove();});
        vmLinePart.children = [];
        _.times(part.measures.length, ()=>vmLinePart.insertMeasure());

        for (let idx = 0; idx < part.measures.length; idx +=1 ){
            let vmMeasure:vm_Measure = <vm_Measure>vmLinePart.children[idx];
            let measure = part.measures[idx];

            measure.bindVM(vmMeasure);

            _.times(measure.notes.length, ()=>vmMeasure.insertNote());

            for (let jdx = 0; jdx < measure.notes.length; jdx += 1){
                let vmNote:vm_Note = <vm_Note> vmMeasure.children[jdx];
                let note = measure.notes[jdx];

                note.bindVM(vmNote);

                vmNote.content = note.display;
            }
        }
    }
}
