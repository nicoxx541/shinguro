import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas para HttpClient
import { AgregarVehiculoPage } from './agregar-vehiculo.page';
import { of } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

describe('AgregarVehiculoPage', () => {
  let component: AgregarVehiculoPage;
  let fixture: ComponentFixture<AgregarVehiculoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule, // Agregado para simular HttpClient
      ],
      declarations: [
        AgregarVehiculoPage,
      ],
      providers: [
        ApiService, // Registra ApiService como proveedor
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } },
            paramMap: of({ get: (key: string) => '123' }),
            queryParams: of({ search: 'test-query' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
