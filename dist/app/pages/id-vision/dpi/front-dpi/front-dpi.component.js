import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
export class FrontDpiComponent {
    constructor(
    // private dpiService: DpiService,
    alertController, loadingController, modalController) {
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.modalController = modalController;
    }
}
FrontDpiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: FrontDpiComponent, deps: [{ token: i1.AlertController }, { token: i1.LoadingController }, { token: i1.ModalController }], target: i0.ɵɵFactoryTarget.Component });
FrontDpiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.12", type: FrontDpiComponent, selector: "app-front-dpi", ngImport: i0, template: "<p>\n  front-dpi works!\n</p>\n", styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: FrontDpiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-front-dpi', template: "<p>\n  front-dpi works!\n</p>\n" }]
        }], ctorParameters: () => [{ type: i1.AlertController }, { type: i1.LoadingController }, { type: i1.ModalController }] });
//# sourceMappingURL=front-dpi.component.js.map