import {vm_Base} from "./vm_base";
// import {vm_Page} from "./vm_page";

export class vm_Editor extends vm_Base{
    name:string = 'editor';

    constructor(parent:vm_Base, element:any = null){
        super(parent, element);

        console.log('initial with ', this.name);
        this.elem.addClass(this.name);
        this.option({selectable:false});
    }

    // insertPage(){
    //     let vmPage = new vm_Page(this);
    //     vmPage.width = 500;
    //     vmPage.height = 700;
    //
    //     vmPage.baseline = 0;
    //     vmPage.left = 20;
    // }
}
