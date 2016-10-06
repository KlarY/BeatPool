import * as _ from "lodash";

import {vm_Base} from "../viewmodel/vm_base";
import {Part} from "../model/Part";
import {Note} from "../model/Note";
let selected:any = null;

export class SelectService{
    static select(vm:vm_Base){
        if (vm == selected){
            return;
        }else if (vm == null){
            selected.select = false;
        }else if (selected == null){
            vm.select = true;
        }else {
            selected.select = false;
            vm.select = true;
        }
        selected = vm;
    }
    static getSelected(){
        return selected;
    }

    static selectNextNote(part: Part, startTime: number) {
        let notes = _.flatten( _.map(part.measures, measure=>_.map(measure.notes)));
        for ( let idx=notes.length-1; idx>0; idx-= 1){
            let prenote = <Note> notes[idx-1];
            let note = <Note> notes[idx];
            if( prenote.startTime <= startTime ){
                SelectService.select(note.vm);
                break;
            }
        }
    }
}
