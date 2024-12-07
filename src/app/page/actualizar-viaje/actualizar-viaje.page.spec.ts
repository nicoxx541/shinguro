import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarViajePage } from './actualizar-viaje.page';

describe('ActualizarViajePage', () => {
  let component: ActualizarViajePage;
  let fixture: ComponentFixture<ActualizarViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
