import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaExpedientesComponent } from './busqueda-expedientes.component';

describe('BusquedaExpedientesComponent', () => {
  let component: BusquedaExpedientesComponent;
  let fixture: ComponentFixture<BusquedaExpedientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaExpedientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
