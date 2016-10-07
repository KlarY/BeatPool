import {name} from "./fakedata";
import * as $ from "jquery";
import * as _ from "lodash";
import {vm_Editor} from "./viewmodel/vm_editor";
import {vm_Measure} from "./viewmodel/vm_measure";
import {ScoreService, Score} from "./sevices/ScoreService";
import {KeyboardServices} from "./sevices/KeyboardServices";
import {SelectMovementService} from "./sevices/SelectMovementService";
import {MenuService, menuService} from "./sevices/MenuService";
import {SelectService} from "./sevices/selectService";

var vmEditor = new vm_Editor(null, $('#editor'));

vmEditor.height = 1200;
vmEditor.width = 1080;
vmEditor.baseline = 0;
vmEditor.left = 0;

var scoreService = new ScoreService();
scoreService.editor = vmEditor;

scoreService.init();

let keyboardServices = new KeyboardServices();

let selectMovementService = new SelectMovementService();

let menu = menuService;

// for debug



_;
$;
console.log(Score);
SelectService;

// debugger;
/*
 window._ = _;
 window.$ = $;
 window.Score = ScoreService_1.Score;
 window.scoreService = scoreService;
 window.SelectService = selectService_1.SelectService;
 */