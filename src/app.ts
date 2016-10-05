import {name} from "./fakedata";
import * as $ from "jquery";

let info = `this is ${name} app.ts`;

let element = $('<div></div>').text(info);

$("body").append(element);
