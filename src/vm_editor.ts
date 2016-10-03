import {vm_Base} from "./vm_base";

export class vm_Editor extends vm_Base{
    name:string = 'editor';

    constructor(parent:vm_Base, element:any = null){
        super(parent, element);

        console.log('initial with ', this.name);
        this.elem.addClass(this.name);
    }
}
