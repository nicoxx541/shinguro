import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),       // Inicializa Ionic
      ],
      declarations: [
        PhotoComponent,              // Declara el componente
      ],
      providers: [
        {
          provide: 'CameraService', // Simula el servicio relacionado con la cámara o funcionalidad no implementada
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
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
