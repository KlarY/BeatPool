import * as $ from "jquery";
import {vm_Page} from "./vm_page";
import {vm_Editor} from "./vm_editor";
import {vm_LinePart} from "./vm_linepart";
import {vm_Measure} from "./vm_measure";


let vmEditor:vm_Editor = new vm_Editor(null,$('#editor'));
vmEditor.insertPage();
// let vmPage:vm_Page = new vm_Page(vmEditor, $('#page'));
//
vmEditor.height = window.innerHeight - 20;
vmEditor.width = window.innerWidth - 20;

vmEditor.baseline = 10;
vmEditor.left = 10;

(<vm_Page>vmEditor.children[0]).insertLinePart();
(<vm_Page>vmEditor.children[0]).insertLinePart();
(<vm_Page>vmEditor.children[0]).insertLinePart();

//
//
// let vmLinePart1 = new vm_LinePart(vmPage, $('#linepart1'));
//
// vmLinePart1.width = 350;
// vmLinePart1.height = 100;
// vmLinePart1.baseline = 500;
// vmLinePart1.left = 100;
//
// let vmLinePart2 = new vm_LinePart(vmPage, $('#linepart2'));
//
// vmLinePart2.width = 350;
// vmLinePart2.height = 100;
// vmLinePart2.baseline = 300;
// vmLinePart2.left = 100;
//
// let vmMeasure1 = new vm_Measure(vmLinePart1, $('#measure1'));
// let vmMeasure2 = new vm_Measure(vmLinePart1, $('#measure2'));
// let vmMeasure3 = new vm_Measure(vmLinePart1, $('#measure3'));
//
// vmMeasure1.width = vmMeasure2.width = vmMeasure3.width = 100;
// vmMeasure1.height = vmMeasure2.height = vmMeasure3.height = 50;
// vmMeasure1.baseline = vmMeasure2.baseline = vmMeasure3.baseline = 20;
// vmMeasure1.left = 20;
// vmMeasure2.left = 120;
// vmMeasure3.left = 220;



