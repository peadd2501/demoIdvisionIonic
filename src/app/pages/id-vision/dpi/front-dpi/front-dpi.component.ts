import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CameraWithOverlayComponent } from '../../components/camera-with-overlay/camera-with-overlay.component';

@Component({
  selector: 'app-front-dpi',
  templateUrl: './front-dpi.component.html',
  styleUrls: ['./front-dpi.component.scss'],
})
export class FrontDpiComponent  implements OnInit {

  constructor(
    // private dpiService: DpiService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async validateDPI(filePath: string): Promise<boolean> {
    const loading = await this.loadingController.create({
      message: 'Validando DPI...',
      backdropDismiss: false,
    });
    await loading.present();

    try {
      const { value: code } = await Storage.get({ key: 'process' });
      const response = await this.dpiService.uploadFrontDPI(filePath, code || '');

      await loading.dismiss();

      if (response.error) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al momento de validar el DPI.',
          buttons: ['Continuar'],
          subHeader: response.details.join('<br>'),
        });
        await alert.present();
        return false;
      } else {
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'Foto DPI frontal correcta.',
          buttons: ['Continuar'],
        });
        await successAlert.present();
        return true;
      }
    } catch (error) {
      console.error('Error al validar DPI:', error);
      await loading.dismiss();
      return false;
    }
  }

  async openCameraOverlay() {
    const modal = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Parte frontal: Identificación Nacional',
        text2: 'Guatemala',
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.imagePath) {
      await this.validateDPI(data.imagePath);
    }
  }
  messenger: any;

  prefs: any;


}
