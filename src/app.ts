import {name} from "./fakedata";
import * as $ from "jquery";
import * as _ from "lodash";
import {vm_Editor} from "./viewmodel/vm_editor";
import {vm_Measure} from "./viewmodel/vm_measure";
import {ScoreService} from "./sevices/ScoreService";
import {KeyboardServices} from "./sevices/KeyboardServices";
import {SelectMovementService} from "./sevices/SelectMovementService";

var vmEditor = new vm_Editor(null, $('#editor'));

vmEditor.height = 800;
vmEditor.width = 1080;
vmEditor.baseline = 0;
vmEditor.left = 0;


$('#editor-zone').height(window.innerHeight - 200);
$('#editor-zone').width(window.innerWidth);
$(window).resize(()=>{
    $('#editor-zone').height(window.innerHeight - 200);
    $('#editor-zone').width(window.innerWidth);
});


var scoreService = new ScoreService();
scoreService.editor = vmEditor;

scoreService.init();

let keyboardServices = new KeyboardServices();

let selectMovementService = new SelectMovementService();