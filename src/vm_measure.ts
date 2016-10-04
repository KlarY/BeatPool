import {vm_Base} from "./vm_base";

export class vm_Measure extends vm_Base{
    name:string = "measure";
    constructor(parent:vm_Base, element:any = null){
        super(parent, element);
        element.addClass(this.name);
        this.option({
            selectable: true,
            moveable: false,
            resizeable: false
        })
    }
}