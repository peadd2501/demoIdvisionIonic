import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent  implements OnInit {

  @Input() texto: string = 'Button'; // Texto del botón
  @Input() disabled: boolean = false; // Para desactivar el botón
  @Output() clicked = new EventEmitter<void>(); // Evento de clic
  @Input() icon?: string; // Nombre del ícono opcional
  @Input() showIcon: boolean = false;
  
  constructor() { }

  ngOnInit() {}

  onClick() {
    this.clicked.emit(); // Emite el evento al hacer clic
  }
}
