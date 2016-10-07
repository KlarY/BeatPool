import * as _ from "lodash";
import {vm_Base} from "./vm_base";
import {vm_LinePart} from "./vm_linepart";
import {vm_Measure} from "./vm_measure";

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
        if (this.children.length > 0 && _.last(this.children).baseline < 200){
            return null;
        }

        let vmLinePart = new vm_LinePart(this);
        vmLinePart.width = 700;
        vmLinePart.height = 150;
        vmLinePart.left = 50;

        if (this.children.length == 1){
            vmLinePart.baseline = 600;
        }else if (this.children[this.children.length-2].baseline > 150){
            vmLinePart.baseline = this.children[this.children.length-2].baseline - 150;
        }
        return vmLinePart;
    }

    takeMeasures(measures:vm_Measure[]):vm_Measure[]{

        let rest = _.clone(measures);

        _.map(this.children, child=>{
           let vm:vm_LinePart = <vm_LinePart>child;
            rest = vm.takeMeasures(rest);
        });

        // debugger;

        while (rest.length > 0){
            let vmLinePart = this.insertLinePart();
            if (vmLinePart == null) break;
            rest = vmLinePart.takeMeasures(rest);
        }

        // debugger;
        return rest;
    }
}
