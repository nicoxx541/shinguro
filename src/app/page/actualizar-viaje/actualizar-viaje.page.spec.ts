import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ActualizarViajePage } from './actualizar-viaje.page';
import { of } from 'rxjs';

describe('ActualizarViajePage', () => {
  let component: ActualizarViajePage;
  let fixture: ComponentFixture<ActualizarViajePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),       // Inicializa Ionic
        RouterTestingModule,         // Simula las rutas
        HttpClientTestingModule,     // Simula HttpClient
      ],
      declarations: [
        ActualizarViajePage,         // Declara la página que se está probando
      ],
      providers: [
        {
          provide: ActivatedRoute,   // Mock explícito para ActivatedRoute
          useValue: {
            snapshot: { params: { id: '123' } }, // Simula parámetros de la ruta (snapshot.params)
            paramMap: of({ get: (key: string) => '123' }), // Simula parámetros observables (paramMap)
            queryParams: of({ search: 'test-query' }), // Simula queryParams si se usa
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();         // Detecta los cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se creó correctamente
  });
});
