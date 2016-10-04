import {vm_Base} from "../vm_base";
let selected:any = null;

export class SelectService{
    static select(vm:vm_Base){
        if (vm == selected){
            return;
        }else if (vm == null){
            selected.select = false;
        }else if (selected == null){
            vm.select = true;
        }else {
            selected.select = false;
            vm.select = true;
        }
        selected = vm;
    }
}
