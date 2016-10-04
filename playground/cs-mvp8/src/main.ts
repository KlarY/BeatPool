import * as $ from "jquery";
import * as _ from 'lodash';
import {vm_Page} from "./vm_page";
import {vm_Editor} from "./vm_editor";
import {vm_LinePart} from "./vm_linepart";
import {vm_Measure} from "./vm_measure";


let vmEditor:vm_Editor = new vm_Editor(null,$('#editor'));
vmEditor.insertPage();

vmEditor.height = window.innerHeight - 20;
vmEditor.width = window.innerWidth - 20;

vmEditor.baseline = 10;
vmEditor.left = 10;

let vmPage = <vm_Page>vmEditor.children[0];
vmPage.insertLinePart();
vmPage.insertLinePart();
vmPage.insertLinePart();

_.each(vmPage.children, (child)=>{
    let vmLinePart = <vm_LinePart>child;
    _.times(3, ()=>vmLinePart.insertMeasure());

    _.each(vmLinePart.children, (child)=>{
        let vmMeasure = <vm_Measure>child;
        _.times(4, ()=>vmMeasure.insertNote());
    })
});
