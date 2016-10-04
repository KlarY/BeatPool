import {vm_Base} from "./vm_base";
import {vm_Measure} from "./vm_measure";

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

    insertMeasure(){
        if (this.children.length > 0 && this.children[this.children.length-1].left + 140 * 2 > this.width){
            return ;
        }

        let vmMeasure = new vm_Measure(this);
        vmMeasure.width = 140;
        vmMeasure.height = 60;
        vmMeasure.baseline = 20;

        if (this.children.length == 1){
            vmMeasure.left = 10;
        }else if (this.children[this.children.length-2].left + 140 * 2 < this.width){
            vmMeasure.left = this.children[this.children.length-2].left + 140;
        }
    }
}
