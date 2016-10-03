import {vm_Base} from "./vm_base";

export class vm_LinePart extends vm_Base{
    name:string = 'linepart';

    constructor(parent:vm_Base, elem:any = null){
        super(parent, elem);
        this.elem.addClass(this.name);
        this.option({
            selectable: true,
            moveable: true,
            resizeable: true
        })
    }
}
