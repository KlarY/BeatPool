import {name} from "./fakedata";
import * as $ from "jquery";
import * as _ from "lodash";
import {vm_Editor} from "./viewmodel/vm_editor";
import {vm_Measure} from "./viewmodel/vm_measure";

var vmEditor = new vm_Editor(null, $('#editor'));

vmEditor.height = 800;
vmEditor.width = 1080;
vmEditor.baseline = 20;
vmEditor.left = 0;

var vmMeasure = new vm_Measure(vmEditor);

vmMeasure.height = 100;
vmMeasure.width = 160;
vmMeasure.baseline = 600;
vmMeasure.left = 50;

_.times(4, ()=>vmMeasure.insertNote());
