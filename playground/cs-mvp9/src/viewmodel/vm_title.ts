import {vm_Base} from "./vm_base";

export class vm_Title extends vm_Base{
    name:string = 'title';

    constructor(parent:vm_Base = null, elem:any = null){
        super(parent, elem);
        console.log("initial title");
        this.elem.addClass(this.name);
        this.option({
            selectable: true
        })
    }
}