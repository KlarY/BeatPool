import {KeyboardServices} from "./KeyboardServices";
import {Score} from "./ScoreService";
import {SelectService} from "./selectService";
import {vm_Note} from "../viewmodel/vm_note";

export class SelectMovementService{
    constructor(){
        KeyboardServices.rigister("editor", "right", ()=>{
            if (SelectService.getSelected() instanceof vm_Note){
                SelectService.selectNextNote(Score, (<vm_Note>SelectService.getSelected()).notation.startTime);
            }
        });
        KeyboardServices.rigister("editor", "left", ()=>{
            console.log('left');
            if (SelectService.getSelected() instanceof  vm_Note){
                SelectService.selectPrevNote(Score, (<vm_Note>SelectService.getSelected()).notation.startTime);
            }
        })
    }
}