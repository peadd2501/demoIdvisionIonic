import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dpi-front',
  standalone: true,
  imports: [IonicModule],
  styleUrls: ['./slide1.component.scss'],
  template: `
    <div class="content">
      <div class="head">
        <h2>Coloca la parte frontal de tu DPI</h2>
        <p class="p-center p-info">Evita sombras, reflejos y coloca tu documento dentro del recuadro.</p>
      </div>
      <div class="dpi-container">
        <video autoplay loop muted playsinline width="1280" height="300">
          <source src="assets/imagesIdvision/Dpi-front.mp4" type="video/mp4">
        </video>
      </div>
      <div class="fixed-footer">
        <ion-button class="custom-button" expand="block" (click)="openCamera()">Tomar una foto</ion-button>
      </div>
    </div>
  `,
})
export class DpiFrontComponent {
  @Input() openCamera!: () => void;
}