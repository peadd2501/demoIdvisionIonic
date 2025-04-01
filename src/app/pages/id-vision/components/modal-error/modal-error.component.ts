import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent {
  @Input() title: string = '';
  @Input() variant: 'dpi' | 'video' = 'dpi';

    @Input() message: string = '';

    public errorMessages: string[] = [];
  
    @Input()
    set errors(value: string | string[]) {
      if (Array.isArray(value)) {
        this.errorMessages = value;
      } else if (value && typeof value === 'string') {
        this.errorMessages = [value];
      } else {
        this.errorMessages = [];
      }
    }
  
    constructor(private modalCtrl: ModalController) {}
  
    closeModal() {
      this.modalCtrl.dismiss();
    }
}
