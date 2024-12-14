import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CrearUsuarioPage } from './crear-usuario.page';
import { FirebaseService } from 'src/app/service/firebase.service';


describe('CrearUsuarioPage', () => {
  let component: CrearUsuarioPage;
  let fixture: ComponentFixture<CrearUsuarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp({
          apiKey: 'your-api-key',
          authDomain: 'your-auth-domain',
          projectId: 'your-project-id',
          storageBucket: 'your-storage-bucket',
          messagingSenderId: 'your-messaging-sender-id',
          appId: 'your-app-id',
        }),
        AngularFireAuthModule,
      ],
      declarations: [
        CrearUsuarioPage, // Declara el componente
      ],
      providers: [
        FirebaseService, // Servicio necesario
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta los cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado
  });
});
