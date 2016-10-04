import {vm_Base} from "./vm_base";
import {vm_LinePart} from "./vm_linepart";

export class vm_Page extends vm_Base{
    name:string = 'page';

    constructor(parent: vm_Base, element: any = null){
        super(parent, element);
        console.log('initial with ', this.name);
        this.elem.addClass(this.name);
        this.option({
            selectable:true,
            moveable: true
        });
    }

    insertLinePart(){
        let vmLinePart = new vm_LinePart(this);
        vmLinePart.width = 450;
        vmLinePart.height = 100;
        vmLinePart.left = 40;

        if (this.children.length == 1){
            vmLinePart.baseline = 460;
        }else if (this.children[this.children.length-2].baseline > 150){
            vmLinePart.baseline = this.children[this.children.length-2].baseline - 150;
        }
    }
}
