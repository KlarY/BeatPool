import * as _ from "lodash";

import {vm_Base} from "./vm_base";
import {vm_Measure} from "./vm_measure";
import {Measure} from "../model/Measure";

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

    insertMeasure(modelMeasure: Measure = null){

        let vmMeasure = new vm_Measure(this);

        if (modelMeasure != null){
            vmMeasure.bindNotation(modelMeasure);
        }else {
            vmMeasure.width = 140;
        }

        vmMeasure.height = 60;
        vmMeasure.baseline = 20;

        if (this.children.length == 1){
            vmMeasure.left = 10;
        }else if (this.children[this.children.length-2].left + 140 * 2 < this.width){
            vmMeasure.left = this.children[this.children.length-2].left + 140;
        }
        return vmMeasure;
    }

    takeMeasures(vmMeasures: vm_Measure[]):vm_Measure[]{
        this.removeChildren();

        let takes:number = 0;

        while (takes <= vmMeasures.length && _.sum(_.map(_.take(vmMeasures, takes), 'width')) <= this.width - 20){
            takes += 1;
        }
        takes -= 1;

        let rest = _.takeRight(vmMeasures, vmMeasures.length - takes);

        let taked = _.take(vmMeasures, takes);
        _.map(taked, vm=>vm.attach(this));
        this.refresh();

        console.log(`totol width while take ${_.sum(_.map(taked, 'width'))}`);

        return rest;
    }

    refresh(){
        _.map(this.children, (vm)=>{
            let vmMeasure = <vm_Measure> vm;
            vmMeasure.refresh();
        });

        // this.width = _.sum(_.map(this.children, 'width')) + 20;
        _.reduce(this.children, (offset, vm)=>{
            vm.left = offset;
            return vm.width + offset;
        }, 10);

        console.log(`totol width after refresh ${_.sum(_.map(this.children, 'width'))}`);
    }
}
