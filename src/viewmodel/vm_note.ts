import {vm_Base} from "./vm_base";
import {Note} from "../model/Note";
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

    bindNotation(note:Note){
        super.bindNotation(note);
        this.content = note.display;
        switch (note.type){
            case 'quarter':
                this.width = 30;
                break;
            case 'eighth':
                this.elem.addClass('bearer');
                this.width = 15;
                break;
            default:
                throw `vm_Note::bindNotation : unhandled type ${note.type}`;
        }
    }
}
