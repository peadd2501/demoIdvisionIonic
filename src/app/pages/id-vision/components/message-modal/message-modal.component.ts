import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-error',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent {
  @Input() title: string = '';
  @Input() variant: 'dpi' | 'video' = 'dpi';

    @Input() message: string = '';

    public errorMessages: string[] = [];
  
    @Input()
    @Input()
    set errors(value: string | string[]) {
      if (Array.isArray(value)) {
        this.errorMessages = value;
      } else if (value && typeof value === 'string') {
        this.errorMessages = value.includes(',')
          ? value.split(',').map(msg => msg.trim())
          : [value];
      } else {
        this.errorMessages = [];
      }
    }
    
  
    constructor(private modalCtrl: ModalController) {}
  
    closeModal() {
      this.modalCtrl.dismiss();
    }
}
