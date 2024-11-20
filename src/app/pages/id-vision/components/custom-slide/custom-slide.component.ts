import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { IonCol, IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'app-custom-slide',
  // standalone: true,
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './custom-slide.component.html',
  styleUrls: ['./custom-slide.component.scss'],
})
export class CustomSlideComponent {
  @Input() image1!: string; // Recibirá la ruta de la primera imagen
  @Input() image2!: string; // Recibirá la ruta de la segunda imagen

  
}
