import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),    
      ],
      declarations: [
        PhotoComponent,           
      ],
      providers: [
        {
          provide: 'CameraService',
          useValue: {
            takePhoto: jasmine.createSpy('takePhoto').and.returnValue(Promise.resolve({ path: 'mock-photo-path.jpg' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
