import * as $ from "jquery";
import {vm_Page} from "./vm_page";
import {vm_Base} from "./vm_base";
import {vm_Editor} from "./vm_editor";


let vmEditor:vm_Editor = new vm_Editor(null,$('#editor'));
let vmPage:vm_Page = new vm_Page(vmEditor, $('#page'));

vmEditor.height = window.innerHeight - 20;
vmEditor.width = window.innerWidth - 20;

vmEditor.baseline = 10;
vmEditor.left = 10;

vmPage.width = 500;
vmPage.height = 700;

vmPage.baseline = 0;
vmPage.left = 20;


