import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { VerViajesPage } from './ver-viajes.page';
import { ApiService } from 'src/app/service/api.service';

describe('VerViajesPage', () => {
  let component: VerViajesPage;
  let fixture: ComponentFixture<VerViajesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),       // Inicializa componentes de Ionic
        HttpClientTestingModule,     // Simula HttpClient
        RouterTestingModule,         // Simula rutas y navegación
      ],
      declarations: [
        VerViajesPage,               // Declara la página
      ],
      providers: [
        ApiService,                  // Proveedor necesario para la página
        {
          provide: ActivatedRoute,   // Mock explícito para ActivatedRoute
          useValue: {
            snapshot: { params: { id: '123' } }, // Simula parámetros estáticos
            paramMap: of({ get: (key: string) => '123' }), // Simula parámetros dinámicos como un observable
            queryParams: of({ search: 'test-query' }), // Simula parámetros de consulta
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();         // Detecta cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que la página se creó correctamente
  });
});
