"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vm_base_1 = require("./vm_base");
var vm_Page = (function (_super) {
    __extends(vm_Page, _super);
    function vm_Page(parent, element) {
        if (element === void 0) { element = null; }
        _super.call(this, parent, element);
        this.name = 'page';
        console.log('initial with ', this.name);
        this.elem.addClass(this.name);
    }
    return vm_Page;
}(vm_base_1.vm_Base));
exports.vm_Page = vm_Page;
