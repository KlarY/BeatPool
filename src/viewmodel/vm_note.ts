import {vm_Base} from "./vm_base";
export class vm_Note extends vm_Base{
    name:string = 'note';
    _content:string = '0';

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
    set content(text:string){
        this._content = text;
        this.elem.text(text);
    }
    get content(){
        return this._content;
    }
}
