import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-video-selfie',
  standalone: true,
  imports: [IonicModule],
  styleUrls: ['./slide3.component.scss'],
  template: `
    <div class="content">
      <div class="head">
        <h2>Video Selfie</h2>
        <p class="p-justify">Graba un breve video para completar tu proceso de identificación.</p>
      </div>
      <ion-grid class="verify-container">
        <ion-row>
          <ion-row>
            <div class="image-container">
              <img src="assets/imagesIdvision/Foco.png" alt="" />
            </div>
            <div class="container-text">
              <p>Si estás en interiores, asegúrate de que la luz esté frente a ti, no detrás.</p>
            </div>
          </ion-row>
        </ion-row>
        <ion-row>
          <ion-row>
            <div class="image-container">
              <img src="assets/imagesIdvision/rostroImage.png" alt="" />
            </div>
            <div class="container-text">
              <p>Asegúrate de que tu rostro sea visible y de no usar anteojos ni sombreros.</p>
            </div>
          </ion-row>
        </ion-row>
      </ion-grid>
      <div class="fixed-footer">
        <ion-button class="custom-button" expand="block" (click)="openCamera()">Abrir la cámara</ion-button>
      </div>
    </div>
  `,
})
export class VideoSelfieComponent {
  @Input() openCamera!: () => void;
}
