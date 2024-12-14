import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Simula HttpClient en el entorno de pruebas
      ],
      providers: [
        ApiService, // Registra ApiService como proveedor
      ],
    });
    service = TestBed.inject(ApiService); // Inyecta ApiService
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se creó correctamente
  });
});
