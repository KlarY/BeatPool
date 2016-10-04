import * as $ from "jquery";
import {map} from "lodash";
import {vm_Base} from "./vm_base";

export class ResizeDelegate{
    static removeResizeGadgets(vm:vm_Base){
        let gadgets = vm.elem.find('.ne-resize');
        map(gadgets, (gadget:any)=>gadget.remove());
    }

    static appendResizeGadgets(vm:vm_Base){
        console.log('append gadgets');
        ResizeDelegate.appendResizeGadgetsOnDirection(vm,'bottom');
        ResizeDelegate.appendResizeGadgetsOnDirection(vm,'right');
        ResizeDelegate.appendResizeGadgetsOnDirection(vm,'right-bottom');
    }

    static appendResizeGadgetsOnDirection(vm:vm_Base, direction:string){
        let gadget = $('<span></span>');
        gadget.addClass('ne-resize');
        gadget.addClass(direction + '-resize-handle');
        vm.elem.append(gadget);

        gadget.on('mousedown', ResizeDelegate.onMouseDown(vm, gadget, direction));
    }

    static onMouseDown(vm:vm_Base, handle:any, direction:string){
        return (evt:any)=>{
            $(document).on('mousemove', ResizeDelegate.onMouseMove(vm, handle, direction));
            $(document).on('mouseup', ResizeDelegate.onMouseUp(vm, handle, direction));

            $.data(handle, 'ne-height', vm.height);
            $.data(handle, 'ne-width', vm.width);
            $.data(handle, 'ne-baseline', vm.baseline);
            $.data(handle, 'ne-left', vm.left);
            $.data(handle, 'ne-pageX', evt.pageX);
            $.data(handle, 'ne-pageY', evt.pageY);

            handle.addClass('active');

            evt.stopPropagation();
        }
    }

    static onMouseMove(vm:vm_Base, handle:any, direction:string){
        return (evt:any)=>{
            let initHeight = <number>$.data(handle, 'ne-height');
            let initWidth = <number>$.data(handle, 'ne-width');
            let initBaseline = <number>$.data(handle, 'ne-baseline');
            let initLeft = <number>$.data(handle, 'ne-left');
            let initPageX = <number>$.data(handle, 'ne-pageX');
            let initPageY = <number>$.data(handle, 'ne-pageY');

            console.log('init:', initHeight, initBaseline, initPageY, evt.pageX);

            switch(direction){
                case 'bottom':
                    vm.height = initHeight + (evt.pageY - initPageY);
                    vm.baseline = initBaseline - (evt.pageY - initPageY);
                    break;
                case 'right':
                    vm.width = initWidth + (evt.pageX - initPageX);
                    break;
                case 'right-bottom':
                    vm.height = initHeight + (evt.pageY - initPageY);
                    vm.baseline = initBaseline - (evt.pageY - initPageY);
                    vm.width = initWidth + (evt.pageX - initPageX);
                    break;
                default:
                    throw `unkown direction ${direction}`;
            }

            evt.stopPropagation();
        }
    }

    static onMouseUp(vm:vm_Base, handle:any, direction:string){
        return (evt:any)=>{
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            handle.removeClass('active');
            evt.stopPropagation();
        }
    }
}
