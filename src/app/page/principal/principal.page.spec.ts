import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrincipalPage } from './principal.page';
import { FirebaseService } from 'src/app/service/firebase.service';
import { ApiService } from 'src/app/service/api.service'; // Ruta del ApiService
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PrincipalPage', () => {
  let component: PrincipalPage;
  let fixture: ComponentFixture<PrincipalPage>;

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
        HttpClientTestingModule,       // Simula HttpClient
      ],
      declarations: [
        PrincipalPage,                 // Declara la página
      ],
      providers: [
        FirebaseService,               // Proveedor necesario para Firebase
        ApiService,                    // Proveedor necesario para ApiService
        {
          provide: ActivatedRoute,     // Mock de ActivatedRoute
          useValue: {
            snapshot: { params: { id: '123' } }, // Simula parámetros estáticos
            paramMap: of({ get: (key: string) => '123' }), // Simula parámetros dinámicos como un observable
            queryParams: of({ search: 'test-query' }), // Simula parámetros de consulta
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();           // Detecta cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();    // Verifica que el componente se creó correctamente
  });
});
