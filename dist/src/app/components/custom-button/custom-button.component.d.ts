import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomButtonComponent implements OnInit {
    texto: string;
    disabled: boolean;
    clicked: EventEmitter<void>;
    icon?: string;
    showIcon: boolean;
    constructor();
    ngOnInit(): void;
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomButtonComponent, "app-custom-button", never, { "texto": { "alias": "texto"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "showIcon": { "alias": "showIcon"; "required": false; }; }, { "clicked": "clicked"; }, never, never, false, never>;
}
