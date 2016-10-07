import * as $ from "jquery";
import {vm_Base} from "../vm_base";

export class MoveDelegate{
    static onMouseDown($this: vm_Base){
        return (evt:any)=>{
            $this._startMousePos = [evt.pageX, evt.pageY];
            $this._startPos = [$this._left, $this._bottom];
            $(document).on('mousemove', MoveDelegate.onMouseMove($this));
            $(document).on('mouseup', MoveDelegate.onMouseUp($this));

            console.log('parent:',$this.parent.width, $this.parent.height,',width:', $this.parent.height, $this.height);
            evt.stopPropagation();
        }
    }
    static onMouseUp($this: vm_Base){
        return (evt:any)=>{
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            evt.stopPropagation();
        }
    }

    static onMouseMove($this: vm_Base){
        return (evt:any)=>{

            let nLeft = evt.pageX -($this._startMousePos[0] - $this._startPos[0]);
            let nBottom = $this._startMousePos[1] + $this._startPos[1] - evt.pageY;

            $this.left = vm_Base.inrange(nLeft, 0, $this.parent.width - $this.width);
            $this.baseline = vm_Base.inrange(nBottom, 0, $this.parent.height - $this.height);

            evt.stopPropagation();
        }
    }
}