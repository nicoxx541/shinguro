import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginPage } from './login.page';
import { FirebaseService } from 'src/app/service/firebase.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

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
        LoginPage,                     // Declara la página que estás probando
      ],
      providers: [
        FirebaseService,               // Proveedor necesario para la página
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();           // Detecta cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();    // Verifica que la página se creó correctamente
  });
});
