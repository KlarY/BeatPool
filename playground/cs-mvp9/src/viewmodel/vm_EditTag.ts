import * as $ from "jquery";
import {vm_Base} from "./vm_base";

export class vm_EditTag extends vm_Base{
    name: string = "edit_tag";
    inputElem:any = null;

    string_when_empty:string = "";
    _content : string;
    _fontSize: number;

    constructor(parent:vm_Base=null,elem:any = null){
        super(parent, elem);
        this.elem.addClass(this.name);
        this.option({
            selectable: true,
            moveable:true
        });
        this.readyForEdit(this);
    }

    readyForEdit(vm:vm_Base){
        this.inputElem = $(`<input />`);
        this.inputElem.val(this._content);
        this.elem.append(this.inputElem);

        this.inputElem.keyup(()=>{
            this.content = this.inputElem.val();
        }).change(()=>{
            this.inputElem.blur();
        })
    }

    set content(content:string){
        this._content = content;
        this.inputElem.val(content);

        let center = this.left + this.width / 2;
        let newWidth = (this.inputElem.val().length + 1) * this._fontSize;

        this.elem.width(newWidth + 20);
        this.elem.css('left', center - newWidth /2 - 10);

        this.inputElem.width(newWidth);
        this.inputElem.attr('size', this.inputElem.val().length + 1);

        this.inputElem.css('left', 10);
    }
    set fontSize(size:number){
        this._fontSize = size;
        this.inputElem.css('font-size', size);
    }
    get content(){return this._content;}
    get fontSize(){return this._fontSize;}
}
