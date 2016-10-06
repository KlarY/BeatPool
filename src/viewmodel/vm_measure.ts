import * as _ from "lodash";

import {vm_Base} from "./vm_base";
import {vm_Note} from "./vm_note";
import {Note} from "../model/Note";

export class vm_Measure extends vm_Base{
    name:string = "measure";
    constructor(parent:vm_Base, element:any = null){
        super(parent, element);
        this.elem.addClass(this.name);
        this.option({
            selectable: true,
            moveable: false,
            resizeable: false
        })
    }
    insertNote(modelNote: Note=null){
        let vmNote = new vm_Note(this);

        if (modelNote != null){
            vmNote.bindNotation(modelNote);
        }else {
            vmNote.width = 30;
        }

        vmNote.height = 20;
        vmNote.baseline = 20;

        this.width = _.sum(_.map(this.children, 'width')) + 20;
        vmNote.left = this.width - 10 - vmNote.width;
    }
}