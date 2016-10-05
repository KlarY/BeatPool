import {vm_Base} from "./vm_base";
export class vm_Note extends vm_Base{
    name:string = 'note';
    content:string = '0';

    constructor(parent:vm_Base, elem:any = null){
        super(parent, elem);
        this.elem.addClass(this.name);
        this.elem.text(this.content);
        this.option({
            selectable: true,
            moveable: false,
            resizeable: false
        })
    }
}
