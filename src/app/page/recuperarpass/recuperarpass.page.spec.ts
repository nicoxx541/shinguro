import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RecuperarpassPage } from './recuperarpass.page';
import { FirebaseService } from 'src/app/service/firebase.service';

describe('RecuperarpassPage', () => {
  let component: RecuperarpassPage;
  let fixture: ComponentFixture<RecuperarpassPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),         // Inicializa Ionic
        AngularFireModule.initializeApp({
          apiKey: 'your-api-key',
          authDomain: 'your-auth-domain',
          projectId: 'your-project-id',
          storageBucket: 'your-storage-bucket',
          messagingSenderId: 'your-messaging-sender-id',
          appId: 'your-app-id',
        }),                            // Configuración de Firebase
        AngularFireAuthModule,         // Módulo de autenticación de Firebase
      ],
      declarations: [
        RecuperarpassPage,             // Declara la página que estás probando
      ],
      providers: [
        FirebaseService,               // Proveedor necesario para la página
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();           // Detecta cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();    // Verifica que el componente se creó correctamente
  });
});
