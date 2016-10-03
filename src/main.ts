import * as $ from "jquery";
import {vm_Page} from "./vm_page";
import {vm_Base} from "./vm_base";
import {vm_Editor} from "./vm_editor";


let vmEditor:vm_Editor = new vm_Editor(null,$('#editor'));
let vmPage:vm_Page = new vm_Page(vmEditor.elem, $('#page'));

vmEditor.height = window.innerHeight - 20;
vmEditor.width = window.innerWidth;

vmEditor.baseline = 0;
vmEditor.left = 0;

vmPage.width = 500;
vmPage.height = 700;

vmPage.baseline = 0;
vmPage.left = 20;


