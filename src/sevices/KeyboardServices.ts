import * as keyboardJS from "keyboardjs";
let context: string = 'editor';

export class KeyboardServices{
    constructor(){
        keyboardJS.watch();
    }
    static rigister(_context:string, keys:string, callback:any){
        keyboardJS.setContext(_context);
        keyboardJS.bind(keys, callback);

        keyboardJS.setContext(context);
    }
}
