import { __decorate } from "tslib";
import { Component } from '@angular/core';
let Slide1Component = class Slide1Component {
    constructor() { }
    ngOnInit() {
        this.temp = "";
    }
    goToNext() {
        console.log("test");
    }
};
Slide1Component = __decorate([
    Component({
        selector: 'app-slide1',
        templateUrl: './slide1.component.html',
        styleUrls: ['./slide1.component.scss'],
    })
], Slide1Component);
export { Slide1Component };
//# sourceMappingURL=slide1.component.js.map