import {vm_Base} from "./vm_base";
import {vm_Note} from "./vm_Note";

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
    insertNote(){
        if (this.children.length > 0 && this.children[this.children.length-1].left + 30 * 2 > this.width){
            return ;
        }

        let vmNote = new vm_Note(this);
        vmNote.width = 30;
        vmNote.height = 20;
        vmNote.baseline = 20;

        if (this.children.length == 1){
            vmNote.left = 10;
        }else if (this.children[this.children.length-2].left + 30 * 2 < this.width){
            vmNote.left = this.children[this.children.length-2].left + 30;
        }
    }
}