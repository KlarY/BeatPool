import * as _ from "lodash";
import * as $ from "jquery";
import {DurationPack} from "../model/Duration";
import {keyboardService, KeyboardServices} from "./KeyboardServices";
export class MenuService{

    menuElem:any;
    durationElem: any;

    constructor(){
        console.log("init Menu");

        this.menuElem = $('#menu');

        this.resizeDisplayArea();
        this.initDuration();
    }
    private resizeDisplayArea(){
        $('#editor-zone').height(window.innerHeight - 100);
        $('#editor-zone').width(window.innerWidth);
        $(window).resize(()=>{
            $('#editor-zone').height(window.innerHeight - 100);
            $('#editor-zone').width(window.innerWidth);
        });
    }

    private initDuration(){
        this.durationElem = $('<select></select>');

        let options= [
            ["x32nd", DurationPack.x32nd],
            ["eighth", DurationPack.eighth],
            ["quarter", DurationPack.quarter],
            ["half", DurationPack.half],
            ["full", DurationPack.full]
        ];

        _.map(options, ([key, value])=>{
            this.durationElem.append($(`<option value="${value}">${key}</option>`));
        });

        this.durationElem.val(options[0][1]);

        this.menuElem.append(this.durationElem);

        KeyboardServices.rigister('editor', 'alt + 1', ()=>this.duration = DurationPack.x32nd);
        KeyboardServices.rigister('editor', 'alt + 2', ()=>this.duration = DurationPack.eighth);
        KeyboardServices.rigister('editor', 'alt + 3', ()=>this.duration = DurationPack.quarter);
        KeyboardServices.rigister('editor', 'alt + 4', ()=>this.duration = DurationPack.half);
        KeyboardServices.rigister('editor', 'alt + 5', ()=>this.duration = DurationPack.full);
    }

    get duration():number{
        return parseInt(this.durationElem.val());
    }

    set duration(duration:number){
        this.durationElem.val(duration.toString());
    }
}

export let menuService = new MenuService();
