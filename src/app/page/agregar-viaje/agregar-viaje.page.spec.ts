import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AgregarViajePage } from './agregar-viaje.page';
import { of } from 'rxjs';

describe('AgregarViajePage', () => {
  let component: AgregarViajePage;
  let fixture: ComponentFixture<AgregarViajePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),       // Inicializa componentes de Ionic
        RouterTestingModule,         // Simula rutas
        HttpClientTestingModule,     // Simula solicitudes HTTP
      ],
      declarations: [
        AgregarViajePage,            // Declara la página
      ],
      providers: [
        {
          provide: ActivatedRoute,   // Mock para ActivatedRoute
          useValue: {
            paramMap: of({ get: (key: string) => '123' }), // Simula parámetros dinámicos
            queryParams: of({ search: 'test-query' }), // Simula query params
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();         // Detecta cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que la página se crea correctamente
  });
});
