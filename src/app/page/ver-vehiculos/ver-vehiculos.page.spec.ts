import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { VerVehiculosPage } from './ver-vehiculos.page';
import { of } from 'rxjs';

describe('VerVehiculosPage', () => {
  let component: VerVehiculosPage;
  let fixture: ComponentFixture<VerVehiculosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),       // Inicializa Ionic
        RouterTestingModule,         // Simula rutas
        HttpClientTestingModule,     // Simula HttpClient
      ],
      declarations: [
        VerVehiculosPage,            // Declara la página
      ],
      providers: [
        {
          provide: ActivatedRoute,   // Mock explícito para ActivatedRoute
          useValue: {
            snapshot: { params: { id: '123' } }, // Simula parámetros estáticos de la ruta
            paramMap: of({ get: (key: string) => '123' }), // Simula parámetros dinámicos (observable)
            queryParams: of({ search: 'test-query' }), // Simula parámetros de consulta si es necesario
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerVehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();         // Detecta cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se creó correctamente
  });
});
