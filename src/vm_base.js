"use strict";
var $ = require("jquery");
var vm_counter = 0;
var vm_Base = (function () {
    function vm_Base(parent, element) {
        if (element === void 0) { element = null; }
        this.elem = null;
        this.parent = null;
        this.name = "";
        this._width = 0;
        this._height = 0;
        this._bottom = 0;
        this._left = 0;
        this._select = false;
        // movement
        this._onhold = false;
        this.startPos = [0, 0]; // left, bottom
        this.startMousePos = [0, 0]; // pageX, pageY
        this.parent = parent;
        if (element != null) {
            this.bind(element);
        }
        else {
        }
    }
    vm_Base.prototype.bind = function (element) {
        this.elem = element;
        vm_counter += 1;
        this.id = vm_counter.toString();
        element.attr("id", this.id);
        this.elem = $('#' + this.id);
        element.on('click', this.onClick(this));
    };
    // view Functions
    vm_Base.prototype.enableDrag = function () {
        this.elem.on('mousedown', this.onMouseDown(this));
    };
    vm_Base.prototype.disableDrag = function () {
    };
    // event Handler
    vm_Base.prototype.onClick = function ($this) {
        var _this = this;
        return function (evt) {
            $this.select = true;
            console.log("vm " + _this.id + ": onClick " + _this.select);
            evt.stopPropagation();
        };
    };
    vm_Base.prototype.onMouseDown = function ($this) {
        var _this = this;
        return function (evt) {
            $this.startMousePos = [evt.pageX, evt.pageY];
            $this.startPos = [$this._left, $this._bottom];
            $(document).on('mousemove', _this.onMouseMove(_this));
            $(document).on('mouseup', _this.onMouseUp(_this));
            evt.stopPropagation();
        };
    };
    vm_Base.prototype.onMouseUp = function ($this) {
        return function (evt) {
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            evt.stopPropagation();
        };
    };
    vm_Base.prototype.onMouseMove = function ($this) {
        return function (evt) {
            console.log('move:', evt.pageX, evt.pageY);
            $this.left = evt.pageX - ($this.startMousePos[0] - $this.startPos[0]);
            $this.baseline = $this.startMousePos[1] + $this.startPos[1] - evt.pageY;
            evt.stopPropagation();
        };
    };
    Object.defineProperty(vm_Base.prototype, "select", {
        get: function () { return this._select; },
        // properties
        set: function (_select) {
            this._select = _select;
            if (_select == false) {
            }
            else {
                this.elem.addClass('selected');
                this.enableDrag();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vm_Base.prototype, "height", {
        get: function () { return this._height; },
        set: function (_height) {
            this._height = _height;
            this.elem.height(this._height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vm_Base.prototype, "width", {
        get: function () { return this._width; },
        set: function (_width) {
            this._width = _width;
            this.elem.width(this._width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vm_Base.prototype, "baseline", {
        get: function () { return this._bottom; },
        set: function (_baseline) {
            this._bottom = _baseline;
            console.log(this.name, 'bottom: ', this._bottom, 'height: ', this.height);
            this.elem.css('bottom', this._bottom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vm_Base.prototype, "left", {
        get: function () { return this._left; },
        set: function (left) {
            this._left = left;
            this.elem.css('left', this._left);
        },
        enumerable: true,
        configurable: true
    });
    return vm_Base;
}());
exports.vm_Base = vm_Base;
