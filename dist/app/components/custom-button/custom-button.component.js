import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let CustomButtonComponent = class CustomButtonComponent {
    constructor() {
        this.texto = 'Button'; // Texto del botón
        this.disabled = false; // Para desactivar el botón
        this.clicked = new EventEmitter(); // Evento de clic
        this.showIcon = false;
    }
    ngOnInit() { }
    onClick() {
        this.clicked.emit(); // Emite el evento al hacer clic
    }
};
__decorate([
    Input()
], CustomButtonComponent.prototype, "texto", void 0);
__decorate([
    Input()
], CustomButtonComponent.prototype, "disabled", void 0);
__decorate([
    Output()
], CustomButtonComponent.prototype, "clicked", void 0);
__decorate([
    Input()
], CustomButtonComponent.prototype, "icon", void 0);
__decorate([
    Input()
], CustomButtonComponent.prototype, "showIcon", void 0);
CustomButtonComponent = __decorate([
    Component({
        selector: 'app-custom-button',
        templateUrl: './custom-button.component.html',
        styleUrls: ['./custom-button.component.scss'],
    })
], CustomButtonComponent);
export { CustomButtonComponent };
//# sourceMappingURL=custom-button.component.js.map