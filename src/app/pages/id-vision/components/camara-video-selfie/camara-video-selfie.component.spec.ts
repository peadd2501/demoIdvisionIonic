import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CamaraVideoSelfieComponent } from './camara-video-selfie.component';

describe('CamaraVideoSelfieComponent', () => {
  let component: CamaraVideoSelfieComponent;
  let fixture: ComponentFixture<CamaraVideoSelfieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CamaraVideoSelfieComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamaraVideoSelfieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
