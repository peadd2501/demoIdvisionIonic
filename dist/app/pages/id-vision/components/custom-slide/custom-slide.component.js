import { __decorate } from "tslib";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
let CustomSlideComponent = class CustomSlideComponent {
};
__decorate([
    Input()
], CustomSlideComponent.prototype, "image1", void 0);
__decorate([
    Input()
], CustomSlideComponent.prototype, "image2", void 0);
CustomSlideComponent = __decorate([
    Component({
        selector: 'app-custom-slide',
        standalone: true,
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        templateUrl: './custom-slide.component.html',
        styleUrls: ['./custom-slide.component.scss'],
    })
], CustomSlideComponent);
export { CustomSlideComponent };
//# sourceMappingURL=custom-slide.component.js.map