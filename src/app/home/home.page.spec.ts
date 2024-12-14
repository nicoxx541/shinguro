import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../service/api.service';


describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Simula las solicitudes HTTP
      ],
      providers: [
        ApiService, // Servicio que se está probando
      ],
    });
    service = TestBed.inject(ApiService); // Inyecta el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
