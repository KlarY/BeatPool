import {name} from "./fakedata";
import * as $ from "jquery";
import {vm_Editor} from "./viewmodel/vm_editor";

let info = `this is ${name} app.ts`;

let element = $('<div></div>').text(info);

$("body").append(element);

var vmEditor = new vm_Editor(null, $('#editor'));

vmEditor.height = 800;
vmEditor.width = 1080;
vmEditor.baseline = 20;
vmEditor.left = 0;

