import { ModalController } from '@ionic/angular';
import * as i0 from "@angular/core";
export declare class MessageModalComponent {
    private modalCtrl;
    title: string;
    variant: 'dpi' | 'video';
    message: string;
    errorMessages: string[];
    set errors(value: string | string[]);
    constructor(modalCtrl: ModalController);
    closeModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageModalComponent, "app-modal-error", never, { "title": { "alias": "title"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "message": { "alias": "message"; "required": false; }; "errors": { "alias": "errors"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=message-modal.component.d.ts.map