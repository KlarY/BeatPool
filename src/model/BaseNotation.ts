import {vm_Base} from "../viewmodel/vm_base";
export class BaseNotation{
    duration: number;
    startTime: number;

    vm: vm_Base;

    constructor(duration:number, startTime:number = 0){
        this.duration = duration;
        this.startTime = startTime;
    }

    bindVM(vm:vm_Base){
        if ( this.vm !== vm ){
            this.vm = vm;
            vm.bindNotation(this);
        }
    }

    remove(){
        this.vm.remove();
    }
}