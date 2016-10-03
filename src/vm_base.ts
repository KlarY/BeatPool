import * as $ from "jquery";
import {ResizeDelegate} from "./resizeDelegate";

let vm_counter = 0;

export class vm_Base{
    id: string;
    elem: any = null;
    parent: any = null;
    name:string = "";

    private _width: number = 0;
    private _height: number = 0;
    private _bottom: number = 0;
    private _left: number = 0;

    private _select: boolean = false;

    // movement
    private _onhold: boolean = false;
    private startPos: [number, number] = [0,0]; // left, bottom
    private startMousePos: [number, number] = [0,0]; // pageX, pageY

    constructor(parent:vm_Base, element: any = null){
        this.parent = parent;

        if ( element != null ){
            this.bind(element);
        }else {
        }
    }

    bind(element:any){
        this.elem = element;

        vm_counter +=1;
        this.id = vm_counter.toString();
        element.attr("id", this.id);
        this.elem = $('#' + this.id);

        element.on('click', this.onClick(this));
    }


    // view Functions

    enableDrag(){
        this.elem.on('mousedown', this.onMouseDown(this));
    }

    disableDrag(){
        this.elem.unbind('mousedown');
    }

    enableResize(){
        console.log('enable resize');
        ResizeDelegate.appendResizeGadgets(this);
    }

    // event Handler

    onClick($this: vm_Base){
        return (evt:any)=>{
            $this.select = true;
            console.log(`vm ${this.id}: onClick ${this.select}`);
            evt.stopPropagation();
        }
    }

    onMouseDown($this: vm_Base){
        return (evt:any)=>{
            $this.startMousePos = [evt.pageX, evt.pageY];
            $this.startPos = [$this._left, $this._bottom];
            $(document).on('mousemove', this.onMouseMove(this));
            $(document).on('mouseup', this.onMouseUp(this));


            console.log('parent:',$this.parent.width, $this.parent.height,',width:', $this.parent.height, $this.height);
            evt.stopPropagation();
        }
    }

    onMouseUp($this: vm_Base){
        return (evt:any)=>{
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            evt.stopPropagation();
        }
    }

    static inrange(val: number, left: number, right: number){
        if (val < left){
            return left;
        }else if (val > right){
            return right;
        }else {
            return val;
        }
    }

    onMouseMove($this: vm_Base){
        return (evt:any)=>{

            let nLeft = evt.pageX -($this.startMousePos[0] - $this.startPos[0]);
            let nBottom = $this.startMousePos[1] + $this.startPos[1] - evt.pageY;

            $this.left = vm_Base.inrange(nLeft, 0, $this.parent.width - $this.width);
            $this.baseline = vm_Base.inrange(nBottom, 0, $this.parent.height - $this.height);

            evt.stopPropagation();
        }
    }

    // properties

    set select(_select:boolean){
        if ( this._select == _select ) return;
        this._select = _select;

        if (_select == false){
            // this.elem.removeClass('selected');
        }else {
            this.elem.addClass('selected');
            this.enableDrag();
            this.enableResize();
        }
    }

    set height(_height:number){
        this._height = _height;
        this.elem.height(this._height);
    }

    set width(_width:number){
        this._width = _width;
        this.elem.width(this._width);
    }

    set baseline(_baseline:number){
        this._bottom = _baseline;
        this.elem.css('bottom', this._bottom);
    }

    set left(left:number){
        this._left = left;
        this.elem.css('left', this._left);
    }

    get baseline(){return this._bottom}
    get left(){return this._left;}
    get height(){return this._height;}
    get width(){return this._width;}
    get select(){return this._select}
}

