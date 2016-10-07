import * as _ from "lodash";
import {vm_Base} from "./vm_base";
import {vm_Measure} from "./vm_measure";
import {vm_Page} from "./vm_page";

export class vm_Editor extends vm_Base{
    name:string = 'editor';

    constructor(parent:vm_Base, element:any = null){
        super(parent, element);

        console.log('initial with ', this.name);
        this.elem.addClass(this.name);
        this.option({selectable:false});
    }

    insertPage():vm_Page{

        let vmPage = new vm_Page(this);
        vmPage.height = 1123;
        vmPage.width = 794;
        vmPage.baseline = 20;

        if (this.children.length == 1){
            vmPage.left = 20;
        }else {
            vmPage.left = this.children[this.children.length-2].left + 794 + 40;
        }

        this.width = vmPage.left + 794 + 20;

        return vmPage;
    }

    takeMeasures(vmMeasures: vm_Measure[]){
        let rest = _.clone(vmMeasures);

        _.map(this.children, child=>{
            let vm:vm_Page = <vm_Page>child;
            rest = vm.takeMeasures(rest);
        });

        while (rest.length > 0){
            let page = this.insertPage();
            if (page == null) break;
            rest = page.takeMeasures(rest);
        }

        return rest;
    }
}
