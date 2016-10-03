"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vm_base_1 = require("./vm_base");
var vm_Editor = (function (_super) {
    __extends(vm_Editor, _super);
    function vm_Editor(parent, element) {
        if (element === void 0) { element = null; }
        _super.call(this, parent, element);
        this.name = 'editor';
        console.log('initial with ', this.name);
        this.elem.addClass(this.name);
    }
    return vm_Editor;
}(vm_base_1.vm_Base));
exports.vm_Editor = vm_Editor;
