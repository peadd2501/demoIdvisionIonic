import { EventEmitter, OnInit } from '@angular/core';
export declare class CustomButtonComponent implements OnInit {
    texto: string;
    disabled: boolean;
    clicked: EventEmitter<void>;
    icon?: string;
    showIcon: boolean;
    constructor();
    ngOnInit(): void;
    onClick(): void;
}
